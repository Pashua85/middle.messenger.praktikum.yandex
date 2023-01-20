import { Block } from '../../core';
import template from './chatsItem.hbs';
import './chatsItem.scss';

interface ChatsItemProps {
  classNames?: string[];
  events?: Record<string, (event: Event | FocusEvent) => void>;
  title: string;
}

export class ChatsItem extends Block<ChatsItemProps, never> {
  constructor(props: ChatsItemProps) {
    super('div', { ...props, classNames: ['chats-item'] });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
