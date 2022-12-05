import { ERequestMethod } from '../../enums';
import { IRequestOptions } from '../../interfaces';
import { HttpMethod } from '../../types';
import { queryStringify } from '../../utils';

export class ApiClient {
  public get: HttpMethod = (url, options = {}) => {
    return this.request({
      url: url + queryStringify(options.data),
      method: ERequestMethod.GET,
      options,
    });
  };

  public post: HttpMethod = (url, options = {}) => {
    return this.request({
      url,
      method: ERequestMethod.POTS,
      options,
    });
  };

  public put: HttpMethod = (url, options = {}) => {
    return this.request({
      url,
      method: ERequestMethod.PUT,
      options,
    });
  };

  public delete: HttpMethod = (url, options = {}) => {
    return this.request({
      url,
      method: ERequestMethod.DELETE,
      options,
    });
  };

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
