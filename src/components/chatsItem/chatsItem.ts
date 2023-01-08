import { Block } from '../../core';
import template from './chatsItem.hbs';
import './chatsItem.scss';

interface ChatsItemProps {
  classNames?: string[];
}

export class ChatsItem extends Block<ChatsItemProps, never> {
  constructor(props: ChatsItemProps) {
    super('div', { ...props, classNames: ['chats-item'] });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
