import { EventEmitter } from 'events';
import { UnionKeyToValue } from './util';

/**
 * This declares the name 'QueueEvent' as a type.
 * @example let messageQueueEvent: QueueEvent = QUEUE_EVENT.heartbeat;
 * @see QUEUE_EVENT
 */
export type QueueEvent =
    | 'queued'
    | 'closed'
    | 'empty'
    | 'opened';

/**
 * This defines the enumeration values of QueueEvent
 * @returns QueueEvent
 * @example let messageQueueEvent: QueueEvent = QUEUE_EVENT.heartbeat;
 * @see QueueEvent
 */
export const QUEUE_EVENT: UnionKeyToValue<QueueEvent> = {
    closed: 'closed',
    empty : 'empty',
    opened: 'opened',
    queued: 'queued',
};

export interface IQueue<T> {
    length: number;

    enqueue(item: T): void;

    dequeue(): T;

    resume(): void;

    suspend(): void;

    clear(): void;

    open(): void;

    close(): void;

    on(event: string | symbol, listener: Function): this;
}

export class Queue<T> extends EventEmitter implements IQueue<T> {
    private _internal: T[]              = null;
    private _openForProcessing: boolean = null;
    private _closed: boolean            = null;

    constructor(initialItems: (T | T[]) = null) {
        super();

        this._internal          = [];
        this._openForProcessing = false;
        this._closed            = false;

        // if only a single (non array) item is passed, convert to an array
        if (initialItems && !(initialItems instanceof Array)) {
            initialItems = [initialItems];
        }

        // add initial items
        if (initialItems instanceof Array) {
            initialItems.forEach((item) => this._internal.push(item));
        }
    }

    public get isOpen(): boolean {
        return this._openForProcessing;
    }

    public get length(): number {
        return this._internal.length;
    }

    public enqueue(item: T): void {
        if (this._closed) return;
        this._internal.push(item);
        if (this._openForProcessing) this.emit(QUEUE_EVENT.queued);
    }

    public dequeue(): T {
        if (!this._openForProcessing || this._closed) return null;

        const item: T = this._internal.shift();

        if (this._internal.length === 0) this.emit(QUEUE_EVENT.empty);

        return item;
    }

    public resume(): void {
        this._openForProcessing = true;
        this.emit(QUEUE_EVENT.opened);
    }

    public suspend(): void {
        this._openForProcessing = false;
        this.emit(QUEUE_EVENT.closed);
    }

    public open(): void {
        this._closed = false;
    }

    public close(): void {
        this.clear();
        this._closed = true;
    }

    public clear(): void {
        this._internal = [];
        this.emit(QUEUE_EVENT.empty);
    }
}
