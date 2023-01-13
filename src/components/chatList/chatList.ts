import { Block } from '../../core';
import { ChatsItem } from '../chatsItem/chatsItem';
import template from './chatList.hbs';

interface ChatListProps {
  isLoaded: boolean;
  classNames?: string[];
}

export class ChatList extends Block<ChatListProps, ChatsItem[]> {
  constructor(props: ChatListProps) {
    const children = {
      chatListItems: [new ChatsItem({}), new ChatsItem({}), new ChatsItem({}), new ChatsItem({})],
    };

    super('div', { ...props, classNames: ['chat-list'] }, children);
  }

  protected render(): DocumentFragment {
    // console.log('render list', { children: this.children });
    return this.compile(template, { ...this.props });
  }
}
