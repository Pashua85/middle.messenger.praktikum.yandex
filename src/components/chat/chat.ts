import { Block } from '../../core';
import template from './chat.hbs';
import './chat.scss';
import { ContextMenu } from '../contextMenu';
import { EContextMenu } from '../../enums';
import { MenuOption } from '../menuOption';
import { MessageForm } from '../messageForm';

interface ChatProps {
  classNames: string[];
  title: string;
}

export class Chat extends Block<ChatProps, ContextMenu | MessageForm> {
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
}
