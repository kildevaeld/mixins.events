export declare type Constructor<T> = new (...args: any[]) => T;
/**
 * An EventListener listens for events on a EventEmitter
 *
 * @export
 * @interface IEventListener
 */
export interface IEventListener {
    listenTo(obj: IEventEmitter, event: any, fn: EventHandler, ctx?: any): any;
    listenToOnce(obj: IEventEmitter, event: any, fn: EventHandler, ctx?: any): any;
    stopListening(obj?: IEventEmitter, event?: any, fn?: EventHandler): any;
}
export interface EventHandler {
    (...args: any[]): void;
}
export interface AllEventHandler {
    (event: any, ...args: any[]): void;
}
export interface Event {
    name: string;
    once: boolean;
    handler: EventHandler;
    ctx?: any;
}
/**
 *
 *
 * @export
 * @interface IEventEmitter
 */
export interface IEventEmitter {
    listeners?: Map<any, Event[]>;
    listenId?: string;
    /**
     *
     *
     * @param {'*'} event
     * @param {AllEventHandler} fn
     * @param {*} [ctx]
     * @returns {this}
     *
     * @memberof IEventEmitter
     */
    on(event: '*', fn: AllEventHandler, ctx?: any): this;
    on(event: any, fn: EventHandler, ctx?: any): this;
    /**
     *
     *
     * @param {*} event
     * @param {EventHandler} fn
     * @param {*} [ctx]
     * @returns {this}
     *
     * @memberof IEventEmitter
     */
    once(event: any, fn: EventHandler, ctx?: any): this;
    /**
     *
     *
     * @param {*} [event]
     * @param {EventHandler} [fn]
     * @param {*} [ctx]
     * @returns {this}
     *
     * @memberof IEventEmitter
     */
    off(event?: any, fn?: EventHandler, ctx?: any): this;
    /**
     *
     *
     * @param {*} event
     * @param {...any[]} args
     * @returns {this}
     *
     * @memberof IEventEmitter
     */
    trigger(event: any, ...args: any[]): this;
}
