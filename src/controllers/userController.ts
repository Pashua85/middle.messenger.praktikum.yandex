import API, { UserAPI } from '../core/api/UserAPI';
import { IPasswordData, IUserData } from '../interfaces';
import store from '../store/store';

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  public async changeProfile(data: IUserData) {
    try {
      const user = await this.api.changeProfile(data);

      store.set('user', user);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  public async changePassword(data: IPasswordData) {
    try {
      await this.api.changePassword(data);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  public async changeAvatar(data: FormData) {
    try {
      await this.api.changeAvatar(data);
    } catch (e: unknown) {
      console.error(e);
    }
  }
}

export default new UserController();
