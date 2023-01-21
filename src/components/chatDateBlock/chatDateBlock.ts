import { Block } from '../../core';
import template from './chatDateBlock.hbs';
import { IMessage } from '../../interfaces';

interface ChatDateBlockProps {
  classNames?: string[];
  date: string;
  messages: IMessage[];
}

export class ChatDateBlock extends Block<ChatDateBlockProps, never> {
  constructor(props: ChatDateBlockProps) {
    super('div', { ...props, classNames: ['date-block'] });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
