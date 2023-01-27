import { IChatInfo, IUser } from '../../interfaces';
import BaseAPI from './BaseApi';

export class ChatsAPI extends BaseAPI {
  public update = undefined;

  constructor() {
    super('/chats');
  }

  public create(title: string) {
    return this.http.post('/', { data: { title } });
  }

  public delete(id: number): Promise<unknown> {
    return this.http.delete('/', { data: { chatId: id } });
  }

  public read(): Promise<IChatInfo[]> {
    return this.http.get('/');
  }

  public getUsers(id: number): Promise<Array<IUser & { role: string }>> {
    return this.http.get(`/${id}/users`);
  }

  public addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put('/users', { data: { users, chatId: id } });
  }

  public async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }
}

export default new ChatsAPI();
