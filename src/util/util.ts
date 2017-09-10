import * as uuid from 'uuid';

/**
 * Defines a type with string keys and string values
 */
export type StringKeyStringValue = { [s: string]: string };

/**
 * Defines a generic type with string keys and values of type T
 */
export type StringKeyObjectValue<T> = { [s: string]: T };

/**
 * Typescript hack - this facilitates a "typed strings" type.  Essentially an enum with string keys.
 */
export type UnionKeyToValue<U extends string> = { [K in U]: K; };

/**
 * This type is designed to accept a string union as a list of keys to string values.
 */
export type ConstrainedKeyToStringMap<U extends string> = { [K in U]: string; };

/**
 * This type is designed to accept a string union as a list of keys to number values.
 */
export type ConstrainedKeyToNumberMap<U extends string> = { [K in U]: number; };

/**
 * The current package version
 */
export const VERSION: string = '0.1.0';

/**
 * The user agent string
 */
export const USER_AGENT: string = `fixinator/${VERSION}`;

/**
 * Convenience type representing a uuid version.  Default is v1 (time-based), v4 (random) is also available
 * @link https://github.com/kelektiv/node-uuid
 */
export type UuidVersion = 'v1' | 'v4';
export const UUID_VERSION_ENUM: UnionKeyToValue<UuidVersion> = {
    v1: 'v1',
    v4: 'v4',
};

/**
 * Generates a random uuid string via the uuid npm package
 */
export function generateUuid(version: UuidVersion = UUID_VERSION_ENUM.v4): string {
    if (version === UUID_VERSION_ENUM.v4) return uuid.v4();

    return uuid.v1();
}

export const STANDARD_DELIMITER = String.fromCharCode(0x01);


export function padRight(content: string, padding: string, targetLength: number): string {
    while (content.length < targetLength) content += padding;

    return content;
}

export function padLeft(content: string, padding: string, targetLength: number): string {
    while (content.length < targetLength) content = padding + content;

    return content;
}

export const ASCII_UPPER_LIMIT: number = 128;

export interface IEventEmitter {
    on(event: string, listener: Function): this;

    removeAllListeners(event?: string | symbol): this;
}

export type SocketEvent = 'data' | 'close' | 'error' | 'connection';
export const SOCKET_EVENT: UnionKeyToValue<SocketEvent> = {
    close: 'close',
    connection: 'connection',
    data : 'data',
    error: 'error',
};

export type CodecType = 'ascii';
export const CODEC_TYPE: UnionKeyToValue<CodecType> = {
    ascii: 'ascii',
};
