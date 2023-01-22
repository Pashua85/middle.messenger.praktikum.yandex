import { Block } from '../../core';
import { IMessage } from '../../interfaces';
import { IState, withStore } from '../../store/store';
import template from './chatMessage.hbs';

interface ChatMessageProps {
  classNames?: string[];
  time: string;
  text: string;
  isOwn: boolean;
}

export class ChatMessage extends Block<ChatMessageProps, never> {
  constructor(props: ChatMessageProps) {
    const classNames = ['chat-message'];

    if (props.isOwn) {
      classNames.push('chat-message_own');
    }

    super('div', { ...props, classNames });
  }

  protected componentDidMount(): void {
    console.log({ props: this.props });
  }

  protected componentDidUpdate(oldProps: ChatMessageProps, newProps: ChatMessageProps): boolean {
    console.log({ oldProps, newProps });

    return true;
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}