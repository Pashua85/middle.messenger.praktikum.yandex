import API, { ChatsAPI } from '../core/api/ChatAPI';
import store from '../store/store';
import MessagesController from '../controllers/messagesController';

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  public async create(title: string) {
    await this.api.create(title);

    this.fetchChats();
  }

  public async fetchChats() {
    const chats = await this.api.read();

    const chatsWithUsers = await Promise.all(
      chats.map(async (chat) => {
        const token = await this.getToken(chat.id);

        const users = await this.api.getUsers(chat.id);

        await MessagesController.connect(chat.id, token);

        return {
          ...chat,
          users,
        };
      }),
    );

    // const chatsWithUsers = chats.map(async (chat) => {
    //   const token = await this.getToken(chat.id);

    //   const users = await this.api.getUsers(chat.id);

    //   await MessagesController.connect(chat.id, token);

    //   return {
    //     ...chat,
    //     users,
    //   };
    // });

    store.set('chats', chatsWithUsers);
  }

  public addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
  }

  public async delete(id: number) {
    await this.api.delete(id);

    this.fetchChats();
  }

  public getToken(id: number) {
    return this.api.getToken(id);
  }

  public selectChat(id: number) {
    store.set('selectedChat', id);
  }

  public resetSelectChat() {
    store.set('selectedChat', undefined);
  }
}

const controller = new ChatsController();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.chatsController = controller;

export default controller;
