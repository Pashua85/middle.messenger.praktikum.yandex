import { Block } from '../../core';
import template from './userOption.hbs';
import './userOption.scss';

interface UserOptionProps {
  classNames?: string[];
  label: string;
  value: number;
  events: Record<string, (event: Event) => void>;
}

export class UserOption extends Block<UserOptionProps, never> {
  constructor(props: UserOptionProps) {
    const classNames = ['user-option'];

    super('div', { ...props, classNames });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
