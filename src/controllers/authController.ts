import { ERoute } from '../enums';
import { AuthAPI, AuthAPIBase } from '../core/api/AuthApi';
import { ISigninData, ISignupData } from '../interfaces';
import { navigate } from '../utils';
import store from '../store/store';

export class AuthController {
  private readonly api: AuthAPIBase;

  constructor() {
    this.api = AuthAPI;
  }

  public async signin(data: ISigninData) {
    try {
      await this.api.signin(data);
      await this.fetchUser();

      navigate(ERoute.Profile);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  public async signup(data: ISignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      navigate(ERoute.Profile);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  public async logout() {
    try {
      await this.api.logout();

      navigate(ERoute.Index);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  public async fetchUser() {
    const user = await this.api.read();

    store.set('user', user);
  }
}

export default new AuthController();
