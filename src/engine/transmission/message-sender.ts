import { EventEmitter } from 'events';
import { Socket } from 'net';
import { IBaseMessage } from '../../messaging/messages/base-message';
import { IQueue, Queue } from '../../util/queue';
import { IEventEmitter, UnionKeyToValue } from '../../util/util';

export interface IMessageSender extends IEventEmitter {
    shutdown(): boolean;
}

export const DEFAULT_TIMEOUT: number = 60000;

export enum SenderMode {
}

export enum SenderState {
}

export enum SenderError {
}

// Define the event type strings
export type SenderEventType =
    'timeout'
    | 'data'
    | 'shutdown_request'
    | 'shutdown_complete'
    | 'initializing'
    | 'open'
    | 'error'
    | 'empty';

export const SENDER_EVENT: UnionKeyToValue<SenderEventType> = {
    data             : 'data',
    empty            : 'empty',
    error            : 'error',
    initializing     : 'initializing',
    open             : 'open',
    shutdown_complete: 'shutdown_complete',
    shutdown_request : 'shutdown_request',
    timeout          : 'timeout',
};

export interface ISenderErrorEvent {
    errorCode: SenderError;
    message?: string;
}

export class MessageSender extends EventEmitter implements IMessageSender {

    private _messageQueue: IQueue<IBaseMessage> = null;
    private _isEmpty: boolean                   = null;
    private _timeout: number                    = null;
    private _activeTimer: NodeJS.Timer          = null;

    private _mode: SenderMode   = null;
    private _state: SenderState = null;

    constructor(socket: Socket, timeout: number = DEFAULT_TIMEOUT) {
        super();

        this._messageQueue = new Queue();
        this._isEmpty      = true;
        this._timeout      = timeout;
        this._activeTimer  = setTimeout(() => this.emit(SENDER_EVENT.timeout), this._timeout);

        this.on(SENDER_EVENT.data, () => this._processBuffer);
        this.on(SENDER_EVENT.timeout, () => this._requestSessionClosure);
    }

    public appendToBuffer(addition: IBaseMessage): void {

        if (this._isEmpty) this._resetTimer();

        this._messageQueue.enqueue(addition);
        this.emit(SENDER_EVENT.data);
        this._isEmpty = false;
    }

    public shutdown(): boolean {
        this._messageQueue.close();
        this._disableTimer();
        this.emit(SENDER_EVENT.shutdown_complete);

        return true;
    }

    private _processBuffer(): void {
        return;
    }

    private _requestSessionClosure(): void {
        this.emit(SENDER_EVENT.shutdown_request);
    }

    private _resetTimer(): void {
        this._disableTimer();
        this._enableTimer();
    }

    private _disableTimer(): void {
        clearTimeout(this._activeTimer);
    }

    private _enableTimer(): void {
        this._activeTimer = setTimeout(() => this.emit(SENDER_EVENT.timeout), this._timeout);
    }

    private _emitError(data: ISenderErrorEvent = null): void {
        this.emit(SENDER_EVENT.error, data);
    }

}
