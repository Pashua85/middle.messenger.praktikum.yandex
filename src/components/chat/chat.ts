import { Block } from '../../core';
import template from './chat.hbs';
import './chat.scss';
import { ContextMenu } from '../contextMenu';
import { EContextMenu } from '../../enums';
import { MenuOption } from '../menuOption';

interface ChatProps {
  classNames: string[];
  title: string;
  // navigate: (page: EPage) => void;
}

export class Chat extends Block<ChatProps, ContextMenu> {
  constructor(props: ChatProps) {
    const children = {
      contextMenu: new ContextMenu(
        { type: EContextMenu.HEADER },
        {
          option1: new MenuOption({
            label: 'some option',
            events: {
              click: () => console.log('option click!'),
            },
          }),
        },
      ),
    };

    super('div', props, children);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
