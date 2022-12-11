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
  open: boolean;
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
          click: () => this.toggleMenu(),
        },
      }),
      ...options,
    };

    super(
      'div',
      {
        ...props,
        classNames:
          props.type === EContextMenu.HEADER
            ? ['context-menu', 'context-menu_header']
            : ['context-menu', 'context-menu_message'],
      },
      children,
    );
  }

  public render() {
    const template = this.props.type === EContextMenu.HEADER ? headerTemplate : messageTemplate;
    return this.compile(template, { ...this.props });
  }

  protected componentDidUpdate(oldProps: ContextMenuProps, newProps: ContextMenuProps): boolean {
    if (oldProps.open !== newProps.open) {
      if (newProps.open) {
        this.setProps({ classNames: ['context-menu', 'context-menu_open'] });
      } else {
        this.setProps({ classNames: ['context-menu'] });
      }
    }

    return true;
  }

  private toggleMenu(): void {
    this.setProps({ open: !this.props.open });
  }
}
