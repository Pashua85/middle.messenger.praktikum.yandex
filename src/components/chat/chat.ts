import { Block } from '../../core';
import template from './chat.hbs';
import './chat.scss';
import { ContextMenu } from '../contextMenu';
import { EContextMenu } from '../../enums';
import { MenuOption } from '../menuOption';
import { MessageForm } from '../messageForm';
import { IState, withStore } from '../../store/store';
import { IMessage } from '../../interfaces';

interface ChatProps {
  classNames: string[];
  title: string;
  selectedChat?: number;
  messages: IMessage[];
  userId: number;
}

export class ChatBase extends Block<ChatProps, ContextMenu | typeof MessageForm> {
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
    console.log({ oldPropsChat: oldProps, newPropsChat: newProps });

    return true;
  }
}

const mapStateToProps = (state: IState) => {
  console.log({ state });
  return {
    selectedChat: state.selectedChat,
  };
};

export const Chat = withStore(mapStateToProps)(ChatBase);
