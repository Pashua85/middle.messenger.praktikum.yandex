import { AnyType } from './blockInterface';

export type Indexed<T = AnyType> = {
  [key in string]: T;
};
