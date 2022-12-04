import { Block } from '../../core';
import template from './menuOption.hbs';
import './menuOption.scss';

interface MenuOptionProps {
  label: string;
  events: Record<string, () => void>;
  classNames?: string[];
}

export class MenuOption extends Block<MenuOptionProps, never> {
  constructor(props: MenuOptionProps) {
    super('button', {
      ...props,
      classNames: props.classNames ? [...props.classNames, 'menu-option'] : ['menu-option'],
    });
  }

  public render() {
    return this.compile(template, { ...this.props });
  }

  protected init() {
    if (this.element) {
      this.element.setAttribute('type', 'button');
    }
  }
}
