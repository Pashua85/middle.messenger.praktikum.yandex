import { Block } from '../../core';
import template from './chatDateBlock.hbs';
import { IMessage } from '../../interfaces';
import './chatDateBlock.scss';
import { ChatList } from '../chatList';
import { ChatMessage } from '../chatMessage';

interface ChatDateBlockProps {
  classNames?: string[];
  date: string;
  messages: IMessage[];
  userId: number;
}

export class ChatDateBlock extends Block<ChatDateBlockProps, ChatMessage[]> {
  constructor(props: ChatDateBlockProps) {
    const children: Record<string, ChatMessage[]> = {
      chatMessages: props.messages.map((item) => {
        const date = new Date(item.time);
        return new ChatMessage({
          text: item.content,
          time: `${date.getHours()}:${date.getMinutes()}`,
          isOwn: item.user_id === props.userId,
        });
      }),
    };

    super('div', { ...props, classNames: ['date-block'] }, children);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
