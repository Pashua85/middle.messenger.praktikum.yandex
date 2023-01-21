import { Block } from '../../core';
import template from './chat.hbs';
import './chat.scss';
import { ContextMenu } from '../contextMenu';
import { EContextMenu } from '../../enums';
import { MenuOption } from '../menuOption';
import { MessageForm } from '../messageForm';
import { IState, withStore } from '../../store/store';
import { IMessage } from '../../interfaces';
import { ChatDateBlock } from '../chatDateBlock';

interface ChatProps {
  classNames: string[];
  title: string;
  selectedChat?: number;
  messages: IMessage[];
  userId: number;
}

export class ChatBase extends Block<ChatProps, ContextMenu | typeof MessageForm | typeof ChatDateBlock> {
  constructor(props: ChatProps) {
    const children = {
      contextMenu: new ContextMenu(
        { type: EContextMenu.HEADER, open: false },
        {
          option1: new MenuOption({
            label: 'Добавить пользователя',
            events: {
              click: () => console.log('option click!'),
            },
          }),
          option2: new MenuOption({
            label: 'Удалить пользователя',
            events: {
              click: () => console.log('option click!'),
            },
          }),
        },
      ),
      messageForm: new MessageForm({}),
    };

    super('div', props, children);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  protected componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
    if (
      (oldProps?.selectedChat !== newProps?.selectedChat && newProps.messages) ||
      oldProps?.messages?.length !== newProps?.messages?.length
    ) {
      this.addChildren({ chatDateBlocks: this.formDateBlocks(newProps.messages) });
    }

    return true;
  }

  private formDateBlocks(messages: IMessage[]): ChatDateBlock[] {
    const blocksToCreate: Record<string, { date: string; messages: IMessage[] }> = {};

    messages.forEach((item) => {
      const dateObject = new Date(item.time);
      const dateStringWithYear = dateObject.toLocaleDateString('ru-RU', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      const dateString = dateObject.toLocaleDateString('ru-RU', {
        month: 'long',
        day: 'numeric',
      });

      if (!blocksToCreate[dateStringWithYear]) {
        blocksToCreate[dateStringWithYear] = {
          date: dateString,
          messages: [item],
        };
        return;
      }

      blocksToCreate[dateStringWithYear].messages.push(item);
    });

    return Object.values(blocksToCreate).map((item) => new ChatDateBlock({ date: item.date, messages: item.messages }));
  }
}

const mapStateToProps = (state: IState) => {
  if (!state.selectedChat) {
    return {
      selectedChat: state.selectedChat,
      userId: state.user?.id,
      messages: [],
    };
  }

  const title = state.chats.find((item) => item.id === state.selectedChat)?.title;
  const messages = state.messages[state.selectedChat] ?? [];
  return {
    selectedChat: state.selectedChat,
    title,
    userId: state.user?.id,
    messages,
  };
};

export const Chat = withStore(mapStateToProps)(ChatBase);
