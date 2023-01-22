import { UserAPI, UserAPIBase } from '../core/api/UserApi';
import { IPasswordData, IUserData } from '../interfaces';
import store from '../store/store';

export class UserController {
  private readonly api: UserAPIBase;

  constructor() {
    this.api = UserAPI;
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
