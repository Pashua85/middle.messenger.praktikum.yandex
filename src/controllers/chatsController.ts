import API, { ChatsAPI } from '../core/api/ChatAPI';
import store from '../store/store';
import MessagesController from '../controllers/messagesController';

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  public async create(title: string): Promise<number | null> {
    let chatId = null;
    try {
      const newChat = await this.api.create(title);
      chatId = newChat.id;
    } catch (e: unknown) {
      alert(e);
    }

    this.fetchChats();

    return chatId;
  }

  public async fetchChats() {
    try {
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

      store.set('chats', chatsWithUsers);
    } catch (e: unknown) {
      alert(e);
    }
  }

  public async addUserToChat(chatId: number, userId: number) {
    try {
      await this.api.addUsers(chatId, [userId]);
    } catch (e: unknown) {
      alert(e);
    }
  }

  public async deleteUserFromChat(chatId: number, userId: number) {
    try {
      await this.api.deleteUsers(chatId, [userId]);
    } catch (e: unknown) {
      alert(e);
    }
  }

  public async changeAvatar(chatId: number, data: FormData) {
    try {
      const chat = await this.api.changeAvatar(chatId, data);

      const newChats = store.getState().chats.map((item) => {
        if (item.id !== chat.id) {
          return item;
        }
        return {
          ...item,
          avatar: chat.avatar,
        };
      });
      store.set('chats', newChats);
    } catch (e: unknown) {
      alert(e);
    }
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

export default controller;
