import API, { AuthAPI } from '../core/api/AuthAPI';
import { ERoute } from '../enums';
import { ISigninData, ISignupData } from '../interfaces';
import { navigate } from '../utils';
import store from '../store/store';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
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
    } catch (e: any) {
      console.error(e.message);
    }
  }

  public async fetchUser() {
    const user = await this.api.read();

    store.set('user', user);
  }
}

export default new AuthController();