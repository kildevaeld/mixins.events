import { IEventEmitter, Event, Constructor } from './types';
/**
 * Makes target, Base, an EventEmitter
 *
 * @export
 * @param {T} Base
 * @template
 * @returns {(Constructor<IEventEmitter> & T)}
 */
export declare function EventEmitter<T extends Constructor<{}>>(Base: T): Constructor<IEventEmitter> & T;
export declare namespace EventEmitter {
    /**
     * If true EventEmitter will call throwError, when when no listeners for the "error" event
     */
    var throwOnError: boolean;
    function throwError(error: Error): void;
    function executeListenerFunction(func: Event[], args?: any[]): void;
}
