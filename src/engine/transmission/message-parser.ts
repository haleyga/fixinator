import { EventEmitter } from 'events';
import { Socket } from 'net';
import { MessageType } from '../../messaging/fields/message-type/message-type';
import { IBaseMessage } from '../../messaging/messages/base-message';
import { IEventEmitter, SOCKET_EVENT, STANDARD_DELIMITER, UnionKeyToValue } from '../../util/util';
import { BUILDER_EVENT, IBaseMessageBuilder } from '../builders/base-message-builder';
import { MessageBuilderFactory } from '../builders/message-builder-factory';

export interface IMessageParser extends IEventEmitter {
    shutdown(): boolean;
}

export const DEFAULT_TIMEOUT: number = 60000;

export enum ParserMode {
    NORMAL         = 0,
    RAW_DATA_FIELD = 1,
}

export enum ParserState {
    AWAITING_MESSAGE_START  = 0,
    AWAITING_MESSAGE_LENGTH = 1,
    AWAITING_MESSAGE_TYPE   = 2,
    AWAITING_MESSAGE_END    = 4,
    CLOSED                  = 5,
    ERROR                   = 6,
}

export enum ParserError {
    BAD_TOKEN_ORDER   = 0,
    UNKNOWN_STATE     = 1,
    BAD_RAW_DATA_READ = 2,
    SOCKET_ERROR      = 3,
}

// Define the event type strings
export type ParserEventType = 'timeout' | 'data' | 'shutdown_request' | 'shutdown_complete' | 'initializing'
    | 'open' | 'error' | 'empty' | 'new_message';

export const PARSER_EVENT: UnionKeyToValue<ParserEventType> = {
    data             : 'data',
    empty            : 'empty',
    error            : 'error',
    initializing     : 'initializing',
    new_message      : 'new_message',
    open             : 'open',
    shutdown_complete: 'shutdown_complete',
    shutdown_request : 'shutdown_request',
    timeout          : 'timeout',
};

export interface IParserErrorEvent {
    errorCode: ParserError;
    message?: string;
}

export interface INewMessageEvent {
    type: MessageType;
    message: IBaseMessage;
}

/**
 * Field validation should mostly reside in the message builders.  The parser should investigate individual packets
 * for basic information only:
 *
 *  - Recognize when a new message is beginning
 *  - Recognize the end of a message
 *  - Recognize message types and get the correct builder
 *  - Keep track of expected message length (and reads)
 *  - Keep track of expected raw data length (and reads)
 *  - Forward all input to the current builder
 *
 * Since the spec dictates that messages arrive sequentially (i.e. correct order, no incomplete messages, no
 * interleaved messages, etc.) we can safely maintain a single builder at a time.
 *
 * This class can emit the following events:
 *  - empty
 *  - error
 *  - initializing
 *  - new_data
 *  - open
 *  - shutdown_complete
 *  - shutdown_request
 *  - timeout
 */
export class MessageParser extends EventEmitter implements IMessageParser {

    private _socket: Socket = null;

    private _rawBuffer: string                  = null;
    private _isEmpty: boolean                   = null;
    private _timeout: number                    = null;
    private _activeTimer: NodeJS.Timer          = null;
    private _activeBuilder: IBaseMessageBuilder = null;

    private _mode: ParserMode   = null;
    private _state: ParserState = null;

    private _expectedRawDataLength: number = null;
    private _actualRawBytesRead: number    = null;

    private _cachedHeaderFields: string[] = null;

    constructor(socket: Socket, timeout: number = DEFAULT_TIMEOUT) {
        super();

        this.emit(PARSER_EVENT.initializing);

        this._socket = socket;
        this._socket.on(SOCKET_EVENT.data, (data) => { this._appendToBuffer(data); });
        this._socket.on(SOCKET_EVENT.close, (data) => this.shutdown);
        this._socket.on(SOCKET_EVENT.error, (error) => {
            // LOGME
            const message = `${this.constructor.name} => socket error: ${error}`;
            this._emitError({ errorCode: ParserError.SOCKET_ERROR, message });
        });

        this._rawBuffer   = '';
        this._isEmpty     = true;
        this._timeout     = timeout;
        this._activeTimer = setTimeout(() => this.emit(PARSER_EVENT.timeout), this._timeout);
        MessageBuilderFactory.initialize();

        this._state = ParserState.AWAITING_MESSAGE_START;
        this._mode  = ParserMode.NORMAL;

        this._expectedRawDataLength = 0;
        this._actualRawBytesRead    = 0;

        this._cachedHeaderFields = [];

        this.on(PARSER_EVENT.data, () => this._processBuffer);
        this.on(PARSER_EVENT.timeout, this._requestSessionClosure);

        this.emit(PARSER_EVENT.open);
    }

    public shutdown(): boolean {
        this._rawBuffer = null;
        this._disableTimer();
        this._state = ParserState.CLOSED;

        this.emit(PARSER_EVENT.shutdown_complete);

        return true;
    }

    private _appendToBuffer(addition: Buffer): void {
        this._resetTimer();
        this._rawBuffer += addition.toString();
        if (this._isEmpty) this.emit(PARSER_EVENT.data);
        this._isEmpty = false;
    }

    /**
     * Mostly, just parse strings nestled between STANDARD_DELIMITER characters.  The only special case is when the
     * active message builder detects an upcoming raw data field.  The builder will return a length to the parse.  The
     * parser will essentially change modes to read from the buffer based on bytes, rather than looking for a
     * delimiter.  The spec dictates that raw data fields may contain the STANDARD_DELIMITER as actual data.  Thus,
     * it necessitates a special case during parsing.
     *
     * The sequence of tags for every message is:
     *
     *  - BeginString field (tag 8)
     *  - BodyLength field (tag 9)
     *  - MsgType field (tag 35)
     *  - ...Other message fields...
     *  - CheckSum field (tag 10)
     *
     * The three beginning fields are required, and must be in order.  Subsequent fields may come in any order (with
     * the exception that raw data fields must be preceded by a length field).  Finally, the checksum is used to
     * close a message stream.
     *
     * Thus, the ParserState transition matrix should look like this:
     *
     *  State                       Expected Next State         Other Valid States
     *  ----------------------------------------------------------------------------------------------------------------
     *  AWAITING_MESSAGE_START      AWAITING_MESSAGE_LENGTH     CLOSED or ERROR
     *  AWAITING_MESSAGE_LENGTH     AWAITING_MESSAGE_TYPE       CLOSED or ERROR
     *  AWAITING_MESSAGE_TYPE       AWAITING_MESSAGE_END        CLOSED or ERROR
     *  AWAITING_MESSAGE_END        AWAITING_MESSAGE_START      CLOSED or ERROR
     *  CLOSED                      AWAITING_MESSAGE_START      ERROR
     *  ERROR                       AWAITING_MESSAGE_START      CLOSED
     *
     * Only two modes exist: NORMAL and RAW_DATA_FIELD.  RAW_DATA_FIELD mode can only be turned on and off while the
     * parser is in NORMAL mode with state AWAITING_MESSAGE_END.
     *
     * @private
     */
    private _processBuffer(): void {

        // The #_processBuffer method is triggered by an event, so it could potentially be called multiple times.
        // This just short-circuits the loop if the buffer is actually empty.
        if (this._isEmpty) return;

        let tokenStart: number = 0;

        // Main parsing loop.
        while (!this._isEmpty) {

            // How to grab the end of the token changes depending on parsing mode.  If in NORMAL mode, just grab the
            // next token based on the index of the next STANDARD_DELIMITER.  If in RAW_DATA_FIELD mode, calculate
            // the expected ending based on the expected field length and how much data has already been read.
            const tokenEnd = this._mode === ParserMode.NORMAL
                ? this._rawBuffer.indexOf(STANDARD_DELIMITER, tokenStart)
                : tokenStart + this._expectedRawDataLength - this._actualRawBytesRead;

            // Ensure we found an end.  If data exists in the buffer, but the buffer is not terminated with the
            // STANDARD_DELIMITER, then an incomplete field exists.  Leave this portion of the buffer intact and
            // wait for more data.
            if (tokenEnd === -1) {
                break;
            }

            // #substring is non-inclusive which is what we want (i.e. don't include the STANDARD_DELIMITER)
            const token: string = this._rawBuffer.substring(tokenStart, tokenEnd);

            if (this._mode === ParserMode.NORMAL) {
                let expectedRawDataLength: number = -1;

                // tslint:disable:no-magic-numbers
                switch (this._state) {

                    // The initial state.  The first field of a message should be the 'BeginString' field.  Push the
                    // first received token into the cache.  If the cache already has data, fields were received out
                    // of order.
                    case ParserState.AWAITING_MESSAGE_START:
                        if (this._cachedHeaderFields.length !== 0) {
                            const message = `expected token ${token} be tag BeginString with no cached fields`;
                            this._emitError({ errorCode: ParserError.BAD_TOKEN_ORDER, message });
                        }

                        this._cachedHeaderFields.push(token);
                        this._state = ParserState.AWAITING_MESSAGE_LENGTH;

                        break;

                    // Following the 'BeginString' field, the parser expects the 'BodyLength' field.  Ensure only a
                    // single token is in the cache ('BeginString').
                    case ParserState.AWAITING_MESSAGE_LENGTH:
                        if (this._cachedHeaderFields.length !== 1) {
                            const message = `expected token ${token} be tag BodyLength with one cached field`;
                            this._emitError({ errorCode: ParserError.BAD_TOKEN_ORDER, message });
                        }

                        this._cachedHeaderFields.push(token);
                        this._state = ParserState.AWAITING_MESSAGE_TYPE;

                        break;

                    // The third field is expected to be 'MsgType'.  The cache must contain two tokens
                    // ('BeginString' and 'BodyLength').  Progress the parser state, and instantiate the appropriate
                    // message builder (determined by the factory method MessageBuilderFactory#getBuilder).
                    // Finally, clear the stack and wait for the end of the message (the standard footer).
                    case ParserState.AWAITING_MESSAGE_TYPE:
                        if (this._cachedHeaderFields.length !== 2) {
                            const message = `expected token ${token} be tag MsgType with two cached fields`;
                            this._emitError({ errorCode: ParserError.BAD_TOKEN_ORDER, message });
                        }

                        this._cachedHeaderFields.push(token);
                        this._state = ParserState.AWAITING_MESSAGE_END;
                        this._prepareBuilder();

                        // Clear the cache.
                        this._cachedHeaderFields = [];

                        break;

                    // The first three fields help define the message type and length.  Now, simply parse all incoming
                    // fields.
                    case ParserState.AWAITING_MESSAGE_END:
                        // Let the message builder validate other things from here.
                        expectedRawDataLength = this._activeBuilder.parseField(token);

                        // This is the point at which the parser decides to shuttle raw data to the message builder.
                        if (expectedRawDataLength !== -1) {
                            this._mode                  = ParserMode.RAW_DATA_FIELD;
                            this._expectedRawDataLength = expectedRawDataLength;
                        }

                        break;

                    // An unknown state should throw an error.  This should likely emit an event requesting a resend.
                    default:
                        this._state = ParserState.ERROR;
                        this._emitError({ errorCode: ParserError.UNKNOWN_STATE });
                }
                // tslint:enable:no-magic-numbers
            }

            // RAW_DATA_FIELD mode
            else {
                this._actualRawBytesRead += token.length;

                // If #pushRawData returns true, it indicates that the builder believes all raw data has been read
                // for the currently open field (this is based on the previous field that defined the length of the
                // raw data).  The parser should switch back to its normal state (i.e. parsing on STANDARD_DELIMITER).
                if (this._activeBuilder.pushRawData(token)) {

                    // Ensure the parser agrees with the builder.
                    if (this._actualRawBytesRead !== this._expectedRawDataLength) {
                        const message = `parser/builder sync issue, inconsistent raw data read`;
                        this._emitError({ errorCode: ParserError.BAD_RAW_DATA_READ, message });
                    }

                    // Now just reset the special raw data mechanisms.
                    this._mode                  = ParserMode.NORMAL;
                    this._actualRawBytesRead    = 0;
                    this._expectedRawDataLength = 0;
                }
            }

            // Now reset the start to one character AFTER the end of the token.
            tokenStart = tokenEnd + 1;

            // If the next starting point is past the end of the buffer, we've consumed everything.
            if (tokenStart > this._rawBuffer.length) {
                this._isEmpty = true;
                this.emit(PARSER_EVENT.empty);
            }
        }

        // Remove the portion of the buffer that has already been processed.
        this._rawBuffer = this._rawBuffer.slice(tokenStart);
    }

    private _prepareBuilder(): void {
        if (this._activeBuilder) this._activeBuilder.removeAllListeners();
        this._activeBuilder = MessageBuilderFactory.getBuilder(this._cachedHeaderFields);
        this._activeBuilder.on(BUILDER_EVENT.trailer_received, () => {
            this._state = ParserState.AWAITING_MESSAGE_START;
        });

        this._activeBuilder.on(BUILDER_EVENT.message_complete, (data: INewMessageEvent) => {
            this.emit(PARSER_EVENT.new_message, data);
        });
    }

    private _requestSessionClosure(): void {
        this.emit(PARSER_EVENT.shutdown_request);
    }

    private _resetTimer(): void {
        this._disableTimer();
        this._enableTimer();
    }

    private _disableTimer(): void {
        clearTimeout(this._activeTimer);
    }

    private _enableTimer(): void {
        this._activeTimer = setTimeout(() => this.emit(PARSER_EVENT.timeout), this._timeout);
    }

    private _emitError(data: IParserErrorEvent = null): void {
        this.emit(PARSER_EVENT.error, data);
    }
}
