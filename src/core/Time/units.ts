import {Opaque} from 'type-fest';

const MILLISECOND = Symbol('Millisecond');
export type Millisecond = Opaque<number, typeof MILLISECOND>;

const SECOND = Symbol('Second');
export type Second = Opaque<number, typeof SECOND>;
