import { ERequestMethod } from '../../enums';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function queryStringify(data: any) {
  if (!data) return '';
  const queryParams = Object.keys(data).map((item) => `${item}=${data[item]}`);
  return `?${queryParams.join('&')}`;
}

// TODO убрать any
interface IRequestOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: Record<string, any>;
  timeout?: number;
}

export class ApiClient {
  public get(url: string, options: IRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request({
      url: url + queryStringify(options.data),
      method: ERequestMethod.GET,
      options,
    });
  }
  public post(url: string, options: IRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request({
      url,
      method: ERequestMethod.POTS,
      options,
    });
  }
  public put(url: string, options: IRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request({
      url,
      method: ERequestMethod.PUT,
      options,
    });
  }
  public delete(url: string, options: IRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request({
      url,
      method: ERequestMethod.DELETE,
      options,
    });
  }

  private request({
    url,
    method,
    options,
  }: {
    url: string;
    method: ERequestMethod;
    options: IRequestOptions;
  }): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
      const { data, headers, timeout } = options;
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = () => {
        if (xhr.status !== 200) {
          reject(xhr);
        } else {
          resolve(xhr);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      if (timeout) {
        xhr.timeout = timeout;
      }

      if (method !== ERequestMethod.GET && data) {
        xhr.send(data);
      }
      if (method === ERequestMethod.GET) {
        xhr.send();
      }
    });
  }
}
