import { Socket } from 'net';
import { FixinatorError } from '../../errors/FixinatorError';
import { CODEC_TYPE } from '../../util/util';
import { ISession, SessionSide } from '../session/session';
import { ISessionManager } from '../session/session-manager';

// NOTE: This is the object from which the engine will initiate connections to other FIX servers.

export interface IInitiator {
    host: string;
    port: number;
}

export interface IInitiatorOptions {
    host: string;
    port: number;
    protocol?: string;
    sessionManager?: ISessionManager;
}

export class Initiator implements IInitiator {

    private _host: string          = null;
    private _port: number          = null;
    private _protocol: string      = null;
    private _tcpSocket: Socket     = null;
    private _socketIsOpen: boolean = null;

    private _sessionManager: ISessionManager = null;
    private _session: ISession               = null;

    constructor(options: IInitiatorOptions) {
        if (!options) {
            throw new FixinatorError();
        }

        this._host           = options.host;
        this._port           = options.port;
        this._protocol       = options.protocol || this._protocol;
        this._sessionManager = options.sessionManager || this._sessionManager;

        this._tcpSocket = new Socket();
        this._tcpSocket.setEncoding(CODEC_TYPE.ascii);
        this._tcpSocket.connect(this._port, this._host, () => { this._socketIsOpen = true; });

        this._session = this._sessionManager.createSession(this._tcpSocket, SessionSide.INITIATOR);
    }

    public get host(): string { return this._host; }

    public get port(): number { return this._port; }
}
