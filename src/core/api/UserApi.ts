import { IPasswordData, IUser, IUserData } from '../../interfaces';
import BaseAPI from './BaseApi';

export class UserAPIBase extends BaseAPI {
  public create = undefined;
  public update = undefined;
  public delete = undefined;

  constructor() {
    super('/user');
  }

  public changeProfile(data: IUserData): Promise<IUser> {
    return this.http.put('/profile', data);
  }

  public changeAvatar(file: FormData) {
    return this.http.put('/profile/avatar', file);
  }

  public changePassword(data: IPasswordData) {
    return this.http.put('/profile/password', data);
  }

  public read(id: number) {
    return this.http.get(`/user/${id}`);
  }
}

export const UserAPI = new UserAPIBase();
