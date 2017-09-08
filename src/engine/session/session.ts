import { EventEmitter } from 'events';
import { Socket } from 'net';
import { generateUuid, CODEC_TYPE, SOCKET_EVENT, UnionKeyToValue } from '../../util/util';
import { IMessageParser, IParserErrorEvent, MessageParser, PARSER_EVENT } from '../transmission/message-parser';
import { IMessageSender, ISenderErrorEvent, MessageSender, SENDER_EVENT } from '../transmission/message-sender';

export type SessionEvent = 'open' | 'renewed' | 'error' | 'closed' | 'message_received';
export const SESSION_EVENT: UnionKeyToValue<SessionEvent> = {
    closed          : 'closed',
    error           : 'error',
    message_received: 'message_received',
    open            : 'open',
    renewed         : 'renewed',
};

export enum SessionSide {
    INITIATOR,
    ACCEPTOR,
}

export interface ISession {
    id: string;
    incomingSequenceNumber: number;
    outgoingSequenceNumber: number;
    side: SessionSide;

    renew(): boolean;

    close(): boolean;
}

/**
 * The Session class mostly coordinates activities between the parser and sender.  If the parser notices something
 * fishy in the incoming data, the Session is what actually instructs the sender to request resends, etc.  Parser
 * and Sender simply emit events and the Session decides how to handle/coordinate.
 */
export class Session extends EventEmitter implements ISession {

    private _id: string                     = null;
    private _incomingSequenceNumber: number = null;
    private _outgoingSequenceNumber: number = null;
    private _side: SessionSide              = null;
    private _messageParser: IMessageParser  = null;
    private _messageSender: IMessageSender  = null;
    private _socket: Socket                 = null;

    constructor(socket: Socket, side: SessionSide) {
        super();

        this._id                     = generateUuid();
        this._incomingSequenceNumber = 0;
        this._outgoingSequenceNumber = 0;
        this._side                   = side;

        this._socket = socket;
        this._socket.setEncoding(CODEC_TYPE.ascii);

        this._prepareParser();
        this._prepareSender();
    }

    public get id(): string { return this._id; }

    public get incomingSequenceNumber(): number { return this._incomingSequenceNumber; }

    public get outgoingSequenceNumber(): number { return this._outgoingSequenceNumber; }

    public get side(): SessionSide { return this._side; }

    public renew(): boolean {
        return true;
    }

    public close(): boolean {
        return true;
    }

    /**
     * Setup handling of sender events
     *
     * @private
     */
    private _prepareSender(): void {
        this._messageSender = new MessageSender(this._socket);
        this._messageSender.on(SENDER_EVENT.empty, (data: ISenderErrorEvent) => { return; });
        this._messageSender.on(SENDER_EVENT.error, (data: ISenderErrorEvent) => { return; });
        this._messageSender.on(SENDER_EVENT.initializing, (data: ISenderErrorEvent) => { return; });
        this._messageSender.on(SENDER_EVENT.data, (data: ISenderErrorEvent) => { return; });
        this._messageSender.on(SENDER_EVENT.open, (data: ISenderErrorEvent) => { return; });
        this._messageSender.on(SENDER_EVENT.shutdown_complete, (data: ISenderErrorEvent) => { return; });
        this._messageSender.on(SENDER_EVENT.shutdown_request, (data: ISenderErrorEvent) => { return; });
        this._messageSender.on(SENDER_EVENT.timeout, (data: ISenderErrorEvent) => { return; });
    }

    /**
     * Setup handling of parser events
     *
     * @private
     */
    private _prepareParser(): void {
        this._messageParser = new MessageParser(this._socket);
        this._messageParser.on(PARSER_EVENT.empty, (data: IParserErrorEvent) => { return; });
        this._messageParser.on(PARSER_EVENT.error, (data: IParserErrorEvent) => { return; });
        this._messageParser.on(PARSER_EVENT.initializing, (data: IParserErrorEvent) => { return; });
        this._messageParser.on(PARSER_EVENT.data, (data: IParserErrorEvent) => { return; });
        this._messageParser.on(PARSER_EVENT.open, (data: IParserErrorEvent) => { return; });
        this._messageParser.on(PARSER_EVENT.shutdown_complete, (data: IParserErrorEvent) => { return; });
        this._messageParser.on(PARSER_EVENT.shutdown_request, (data: IParserErrorEvent) => { return; });
        this._messageParser.on(PARSER_EVENT.timeout, (data: IParserErrorEvent) => { return; });
    }
}
