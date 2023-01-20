import { Block } from '../../core';
import { ChatsItem } from '../chatsItem/chatsItem';
import template from './chatList.hbs';
import ChatsController from '../../controllers/chatsController';
import { IState, withStore } from '../../store/store';
import { IChatInfo } from '../../interfaces';
import './chatList.scss';

interface ChatListProps {
  isLoaded: boolean;
  classNames?: string[];
  chats?: IChatInfo[];
}

export class ChatListBase extends Block<ChatListProps, ChatsItem[]> {
  constructor(props: ChatListProps) {
    // const children = {
    //   chatListItems: [new ChatsItem({}), new ChatsItem({}), new ChatsItem({}), new ChatsItem({})],
    // };

    super('div', { ...props, classNames: ['chat-list'] });
  }

  protected componentDidUpdate(oldProps: ChatListProps, newProps: ChatListProps): boolean {
    console.log({ oldPropsList: oldProps, newPropsList: newProps });

    if (oldProps?.chats?.length !== newProps?.chats?.length && newProps.chats) {
      console.log('add new children');
      const chatListItems = newProps.chats.map(
        (item) =>
          new ChatsItem({
            title: item.title,
            events: {
              click: () => {
                ChatsController.selectChat(item.id);
              },
            },
          }),
      );

      this.addChildren({ chatListItems });

      return true;
    }

    if (oldProps?.chats?.length === newProps?.chats?.length && oldProps.isLoaded) {
      return false;
    }

    return true;
  }

  protected render(): DocumentFragment {
    console.log('render list', { children: this.children });
    return this.compile(template, { ...this.props });
  }

  // private createChats(props: ChatListProps) {
  //   return props.chats.map((data) => {
  //     return new Chat({
  //       ...data,
  //       events: {
  //         click: () => {
  //           ChatsController.selectChat(data.id);
  //         },
  //       },
  //     });
  //   });
  // }
}

const mapStateToProps = (state: IState) => ({ chats: state.chats });
export const ChatList = withStore(mapStateToProps)(ChatListBase);
