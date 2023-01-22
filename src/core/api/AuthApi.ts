import { ISigninData, ISignupData } from '../../interfaces';
import BaseAPI from './BaseAPI';

export class AuthAPIBase extends BaseAPI {
  public create = undefined;
  public update = undefined;
  public delete = undefined;

  constructor() {
    super('/auth');
  }

  public signin(data: ISigninData) {
    return this.http.post('/signin', data);
  }

  public signup(data: ISignupData) {
    return this.http.post('/signup', data);
  }

  public read() {
    return this.http.get('/user');
  }

  public logout() {
    return this.http.post('/logout');
  }
}

export const AuthAPI = new AuthAPIBase();
