import { EventEmitter } from 'events';
import { Socket } from 'net';
import { IEventEmitter } from '../../util/util';
import { ISession, Session, SessionSide } from './session';

export type SessionMap = { [uuid: string]: ISession };

export interface ISessionManager extends IEventEmitter {
    allSessions: SessionMap;

    getSessionById(id: string): ISession;

    createSession(socket: Socket, side: SessionSide): ISession;

    renewSession(uuid: string): boolean;

    closeSession(uuid: string): boolean;
}

export class SessionManager extends EventEmitter implements ISessionManager {

    private _allSessions: SessionMap = null;

    constructor() {
        super();

        this._allSessions = {};
    }

    // Getters

    public get allSessions(): SessionMap { return this._allSessions; }

    // Public members

    public getSessionById(id: string): ISession {
        // TODO: log invalid key here
        return this._allSessions.hasOwnProperty(id) ? this._allSessions[id] : null;
    }

    // TODO: log new session
    public createSession(socket: Socket, side: SessionSide): ISession {
        const session = new Session(socket, side);
        this._allSessions[session.id] = session;

        return session;
    }

    public renewSession(uuid: string): boolean {
        return true;
    }

    public closeSession(uuid: string): boolean {
        const session = this._allSessions[uuid];

        if (!session) {
            // TODO: log invalid key here
            return session.close();
        }

        this._allSessions = null;
    }

}
