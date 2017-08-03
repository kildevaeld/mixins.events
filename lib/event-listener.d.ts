import { IEventListener, Constructor } from './types';
export declare function EventListener<T extends Constructor<{}>>(Base: T): Constructor<IEventListener> & T;
