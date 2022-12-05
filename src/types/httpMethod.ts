import { IRequestOptions } from '../interfaces';

export type HttpMethod = (url: string, options?: IRequestOptions) => Promise<XMLHttpRequest>;
