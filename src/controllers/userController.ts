import { UserAPI, UserAPIBase } from '../core/api/UserApi';
import { IPasswordData, IUser, IUserData } from '../interfaces';
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
      alert(e);
    }
  }

  public async changePassword(data: IPasswordData) {
    try {
      await this.api.changePassword(data);
    } catch (e: unknown) {
      alert(e);
    }
  }

  public async changeAvatar(data: FormData) {
    try {
      const user = await this.api.changeAvatar(data);
      store.set('user', user);
    } catch (e: unknown) {
      alert(e);
    }
  }

  public async searchUser(login: string): Promise<IUser[] | null> {
    try {
      return this.api.search(login);
      console.log();
      // store.set('user', user);
    } catch (e: unknown) {
      alert(e);
      return null;
    }
  }
}

export default new UserController();
