import { Block } from '../../core';
import { Input } from '../input';
import './userInput.scss';
import template from './userInput.hbs';
import UserController from '../../controllers/userController';
import { IUser } from '../../interfaces';
import { UserOption } from '../userOption';

interface UserInputProps {
  classNames?: string[];
  showOptions?: boolean;
  errorMessage?: string;
}

export class UserInput extends Block<UserInputProps, Input | UserOption[]> {
  private searchedValue = '';

  private _selectedId: number | null = null;

  constructor(props: UserInputProps) {
    const classNames = ['user-input'];

    const children = {
      input: new Input({
        classNames: ['user-input__field'],
        type: 'text',
        name: 'user',
        events: {
          input: (e: InputEvent) => {
            this.handleChange(e);
          },
          blur: () => {
            this.handleBlur();
          },
        },
      }),
    };

    super('div', { ...props, classNames }, children);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  private async handleChange(e: InputEvent) {
    const value = (e.target as HTMLInputElement).value;

    if (value && this.searchedValue !== value) {
      const users = await UserController.searchUser(value);
      this.searchedValue = value;
      this._selectedId = null;

      if (Array.isArray(users) && users.length) {
        this.setProps({ showOptions: true });
        this.setChildren({
          ...this.children,
          userOptions: this.createOptions(users),
        });
        if (Input.isInput(this.children.input)) {
          this.children.input.setProps({
            classNames: ['user-input__field'],
          });
        }

        setTimeout(() => {
          (this.children.input as Block).element?.focus();
        }, 20);

        return;
      }

      this.setProps({ showOptions: false });
      (this.children.input as Block).element?.focus();
    }
  }

  private handleSelect(selectedId: number, selectedLogin: string) {
    if (Input.isInput(this.children.input)) {
      this.children.input.setProps({
        value: selectedLogin,
        classNames: ['user-input__field', 'user-input__field_selected'],
      });
    }

    this._selectedId = selectedId;
    this.setProps({ showOptions: false });
  }

  private createOptions(users: IUser[]): UserOption[] {
    return users.map(
      (item) =>
        new UserOption({
          label: item.login,
          value: item.id,
          events: {
            click: (e) => {
              // чтобы модальное окно не закрылось по клику
              e.stopPropagation();
              this.handleSelect(item.id, item.login);
            },
          },
        }),
    );
  }

  private handleBlur() {
    if (!this._selectedId) {
    }
  }
}
