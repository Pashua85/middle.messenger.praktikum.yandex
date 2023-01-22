import { Block } from '../../core';
import { ChatsItem } from '../chatsItem/chatsItem';
import template from './chatList.hbs';
import ChatsController from '../../controllers/chatsController';
import { IState, withStore } from '../../store/store';
import './chatList.scss';
import { ChatWithUsers } from '../../types';
import { RESOURCES } from '../../constants';

interface ChatListProps {
  isLoaded: boolean;
  classNames?: string[];
  chats?: ChatWithUsers[];
}

export class ChatListBase extends Block<ChatListProps, ChatsItem[]> {
  constructor(props: ChatListProps) {
    super('div', { ...props, classNames: ['chat-list'] });
  }

  protected init() {
    if (this.props.chats) {
      this.setChildren({ chatListItems: this.createChatListItems(this.props.chats) });
    }
  }

  protected componentDidUpdate(oldProps: ChatListProps, newProps: ChatListProps): boolean {
    if (oldProps?.chats?.length !== newProps?.chats?.length && newProps.chats) {
      this.setChildren({ chatListItems: this.createChatListItems(newProps.chats) });

      return true;
    }

    if (oldProps?.chats?.length === newProps?.chats?.length && oldProps?.isLoaded) {
      return false;
    }

    return true;
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  private createChatListItems(chats: ChatWithUsers[]): ChatsItem[] {
    return chats.map((item) => {
      let time = '';
      if (item.last_message) {
        const date = new Date(item.last_message.time);
        time = `${date.getHours()}:${date.getMinutes()}`;
      }

      return new ChatsItem({
        title: item.title,
        lastMessage: item.last_message?.content ?? '',
        avatar: item.avatar ? `${RESOURCES}/${item.avatar}` : 'https://via.placeholder.com/47',
        time,
        events: {
          click: () => {
            ChatsController.selectChat(item.id);
          },
        },
      });
    });
  }
}

const mapStateToProps = (state: IState) => {
  return { chats: state.chats };
};
export const ChatList = withStore(mapStateToProps)(ChatListBase);
