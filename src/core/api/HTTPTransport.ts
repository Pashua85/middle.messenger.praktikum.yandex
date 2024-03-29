type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Options = {
  method: Method;
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
};

export default class HTTPTransport {
  public static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response>(path = '/', options: Partial<Options> = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: 'GET',
      ...options,
    });
  }

  public post<Response = void>(path: string, options: Partial<Options> = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  }

  public put<Response = void>(path: string, options: Partial<Options> = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  }

  public patch<Response = void>(path: string, options: Partial<Options> = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  }

  public delete<Response>(path: string, options: Partial<Options> = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  }

  private request<Response>(url: string, options: Options = { method: 'GET' }): Promise<Response> {
    return new Promise((resolve, reject) => {
      const { data, headers, timeout, method } = options;
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.withCredentials = true;
      xhr.responseType = 'json';

      xhr.onload = () => {
        if (xhr.status !== 200) {
          reject(xhr.response);
        } else {
          resolve(xhr.response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      if (timeout) xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      if (method === 'GET' && !data) {
        xhr.send();
      } else {
        if (data instanceof FormData) {
          xhr.send(data);
        } else {
          xhr.send(JSON.stringify(data));
        }
      }
    });
  }
}
