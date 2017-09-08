import { FixinatorError } from '../errors/FixinatorError';
import { FixVersion, IFixVersion } from '../util/fix-version';
import { Acceptor, IAcceptor, IAcceptorOptions } from './networking/acceptor';
import { IInitiator } from './networking/initiator';
import { ISessionManager, SessionManager, SessionMap } from './session/session-manager';

export interface IFixEngineOptions {
    useAsInitiator: boolean;
    useAsAcceptor: boolean;
    serverOpts: IAcceptorOptions;
    targetVersion?: string | IFixVersion;
    minimumVersion?: string | IFixVersion;
    maximumVersion?: string | IFixVersion;
}

export interface IFixEngine {
    sessionManager: ISessionManager;
    allOpenSessions: SessionMap;
}

export class FixEngine implements IFixEngine {

    private _sessionManager: ISessionManager = null;

    private _targetVersion: IFixVersion  = null;
    private _minimumVersion: IFixVersion = null;
    private _maximumVersion: IFixVersion = null;

    private _acceptor: IAcceptor          = null;
    private _serverOpts: IAcceptorOptions = null;
    private _initiators: IInitiator[]     = null;

    constructor(options: IFixEngineOptions) {
        if (!options) {
            const message = `you must provide an options object`;
            throw new FixinatorError(message);
        }

        // A FixEngine instance must be used as a client or server (or both!).  Otherwise, it really doesn't make
        // much sense to have an 'engine'.  Ensure that at least one of those options is enabled.
        if (!options.useAsInitiator && !options.useAsAcceptor) {
            const message = `you must activate at least one (1) option of 'useAsInitiator', 'useAsAcceptor'`;
            throw new FixinatorError(message);
        }

        // Setup the session manager
        this._sessionManager = new SessionManager();

        // NOTE: Clients maintain server sessions, a server maintains client sessions.

        // If the engine is being used as a client, it will connect to other servers.  Thus, we need to enable
        // server sessions (i.e. an object to track state on remote servers).
        if (options.useAsInitiator) {

            this._initiators = [];
        }

        // If the engine is being used as a server, other client engine will be connecting to it.  Thus, we need to
        // enable client sessions (i.e. an object to track state with remote clients).
        if (options.useAsAcceptor) {

            this._serverOpts = options.serverOpts || this._serverOpts;

            // TODO: load from configuration?
            this._acceptor = this._serverOpts
                ? new Acceptor({
                                   host          : this._serverOpts.host,
                                   port          : this._serverOpts.port,
                                   sessionManager: this._sessionManager,
                               })
                : new Acceptor({ host: '127.0.0.1', port: 9876, sessionManager: this._sessionManager });
        }

        this._targetVersion = typeof options.targetVersion === 'string'
            ? new FixVersion(options.targetVersion)
            : options.targetVersion ? options.targetVersion : this._targetVersion;

        this._minimumVersion = typeof options.minimumVersion === 'string'
            ? new FixVersion(options.minimumVersion)
            : options.minimumVersion ? options.minimumVersion : this._minimumVersion;

        this._maximumVersion = typeof options.maximumVersion === 'string'
            ? new FixVersion(options.maximumVersion)
            : options.maximumVersion ? options.maximumVersion : this._maximumVersion;
    }

    public get sessionManager(): ISessionManager { return this._sessionManager; }

    public get allOpenSessions(): SessionMap { return this._sessionManager.allSessions; }
}
