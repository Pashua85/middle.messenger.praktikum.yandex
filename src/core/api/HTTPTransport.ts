// import { ERequestMethod } from '../../enums';
// import { IRequestOptions } from '../../interfaces';
// import { HttpMethod } from '../../types';
// import { queryStringify } from '../../utils';

// export class HTTPTransport {
//   private static API_URL = 'https://ya-praktikum.tech/api/v2';
//   protected endpoint: string;

//   constructor(endpoint: string) {
//     this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
//   }

//   public get: HttpMethod = (url, options = {}) => {
//     return this.request({
//       url: url + queryStringify(options.data),
//       method: ERequestMethod.GET,
//       options,
//     });
//   };

//   public post: HttpMethod = (url, options = {}) => {
//     return this.request({
//       url,
//       method: ERequestMethod.POTS,
//       options,
//     });
//   };

//   public put: HttpMethod = (url, options = {}) => {
//     return this.request({
//       url,
//       method: ERequestMethod.PUT,
//       options,
//     });
//   };

//   public delete: HttpMethod = (url, options = {}) => {
//     return this.request({
//       url,
//       method: ERequestMethod.DELETE,
//       options,
//     });
//   };

//   private request({
//     url,
//     method,
//     options,
//   }: {
//     url: string;
//     method: ERequestMethod;
//     options: IRequestOptions;
//   }): Promise<XMLHttpRequest> {
//     return new Promise((resolve, reject) => {
//       const { data, headers, timeout } = options;
//       const xhr = new XMLHttpRequest();
//       xhr.open(method, url);

//       xhr.onload = () => {
//         if (xhr.status !== 200) {
//           reject(xhr);
//         } else {
//           resolve(xhr);
//         }
//       };

//       xhr.onabort = reject;
//       xhr.onerror = reject;
//       xhr.ontimeout = reject;

//       if (headers) {
//         Object.keys(headers).forEach((key) => {
//           xhr.setRequestHeader(key, headers[key]);
//         });
//       }

//       if (timeout) {
//         xhr.timeout = timeout;
//       }

//       if (method !== ERequestMethod.GET && data) {
//         xhr.send(data);
//       }
//       if (method === ERequestMethod.GET) {
//         xhr.send();
//       }
//     });
//   }
// }

export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete',
}

type Options = {
  method: Method;
  data?: any;
};

export default class HTTPTransport {
  public static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response>(path = '/'): Promise<Response> {
    return this.request<Response>(this.endpoint + path);
  }

  public post<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Post,
      data,
    });
  }

  public put<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Put,
      data,
    });
  }

  public patch<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Patch,
      data,
    });
  }

  public delete<Response>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Delete,
      data,
    });
  }

  private request<Response>(url: string, options: Options = { method: Method.Get }): Promise<Response> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      // eslint-disable-next-line prefer-promise-reject-errors
      xhr.onabort = () => reject({ reason: 'abort' });
      // eslint-disable-next-line prefer-promise-reject-errors
      xhr.onerror = () => reject({ reason: 'network error' });
      // eslint-disable-next-line prefer-promise-reject-errors
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      if (options.method !== 'Put') {
        xhr.setRequestHeader('Content-Type', 'application/json');
      } else {
        console.log({ options });
        xhr.setRequestHeader('Content-Type', 'multipart/form-data');
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Method.Get || !data) {
        xhr.send();
      } else {
        if (options.method === 'Put') {
          xhr.send(data);
        } else {
          xhr.send(JSON.stringify(data));
        }
      }
    });
  }
}
