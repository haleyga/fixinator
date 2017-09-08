import { createServer, Server, Socket } from 'net';
import { FixinatorError } from '../../errors/FixinatorError';
import { ISessionManager } from '../session/session-manager';
import { SessionSide } from '../session/session';
import { SOCKET_EVENT } from '../../util/util';

// NOTE: This will be the entry point for clients to connect to this engine.

export interface IAcceptor {
    host: string;
    port: number;
}

export interface IAcceptorOptions {
    host: string;
    port: number;
    protocol?: string;
    sessionManager?: ISessionManager;
    autoStart?: boolean;
}

export class Acceptor implements IAcceptor {

    private _host: string     = null;
    private _port: number     = null;
    private _protocol: string = null;
    private _tcpServer: Server   = null;

    private _sessionManager: ISessionManager = null;

    constructor(options: IAcceptorOptions) {
        if (!options) {
            throw new FixinatorError();
        }

        this._host           = options.host;
        this._port           = options.port;
        this._protocol       = options.protocol || this._protocol;
        this._sessionManager = options.sessionManager || this._sessionManager;

        if (options.autoStart) this.start();
    }

    public get host(): string { return this._host; }

    public get port(): number { return this._port; }

    public start(): boolean {

        this._tcpServer = createServer();
        this._tcpServer.listen(this._port, this._host);

        // TODO: don't forget logging
        this._tcpServer.on(SOCKET_EVENT.connection, (socket) => this._setupConnection(socket));

        return true;
    }

    // TODO: don't forget logging
    private _setupConnection(socket: Socket): void {

        // TODO: This shouldn't manage data.  Create a new object and let that object manage the socket connection.
        // TODO: I recommend starting a new session here.  Let that session object handle data, close, error events.

        this._sessionManager.createSession(socket, SessionSide.ACCEPTOR);
    }
}
