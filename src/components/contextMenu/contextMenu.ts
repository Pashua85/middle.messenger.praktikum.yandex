import { Block } from '../../core';
import { EContextMenu } from '../../enums';
import { BlockChildren } from '../../types';
import { CustomButton } from '../customButton';
import { MenuOption } from '../menuOption';
import headerTemplate from './headerContextMenu.hbs';
import messageTemplate from './messageContextMenu.hbs';
import './contextMenu.scss';

interface ContextMenuProps {
  type: EContextMenu;
  classNames?: string[];
}

export class ContextMenu extends Block<ContextMenuProps> {
  constructor(props: ContextMenuProps, options: BlockChildren<MenuOption>) {
    const children = {
      button: new CustomButton({
        label: '',
        classNames:
          props.type === EContextMenu.HEADER
            ? ['context-menu__button', 'context-menu__button_header']
            : ['context-menu__button', 'context-menu__button_message'],
        events: {
          click: () => this.handleClick(),
        },
      }),
      ...options,
    };

    super(
      'div',
      {
        ...props,
        classNames: props.type === EContextMenu.HEADER ? ['header-menu'] : ['message-menu'],
      },
      children,
    );
  }

  public render() {
    const template = this.props.type === EContextMenu.HEADER ? headerTemplate : messageTemplate;
    return this.compile(template, { ...this.props });
  }

  private handleClick() {
    console.log('click');
  }
}
