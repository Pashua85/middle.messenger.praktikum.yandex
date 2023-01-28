import { Block } from '../../core';
import { CustomButton } from '../customButton';
import { UserInput } from '../userInput';
import template from './userForm.hbs';
import './userForm.scss';

interface UserFormProps {
  classNames?: string[];
}

export class UserForm extends Block<UserFormProps, CustomButton | UserInput> {
  constructor(props: UserFormProps) {
    const classNames = ['user-form'];

    const children = {
      button: new CustomButton({
        label: 'Добавить',
        events: {},
      }),
      userInput: new UserInput({}),
    };

    super('div', { ...props, classNames }, children);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
