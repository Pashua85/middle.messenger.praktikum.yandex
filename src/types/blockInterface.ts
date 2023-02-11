import { Block } from '../core';

export type SimpleObject = Record<string | number, AnyType>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;

export type BlockInterface<TProps extends SimpleObject = SimpleObject> = Block<TProps> | Block<TProps>[];
