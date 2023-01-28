import { Block } from '../../core';
import { IState, withStore } from '../../store/store';
import { CustomButton } from '../customButton';
import { UserInput } from '../userInput';
import ChatsController from '../../controllers/chatsController';
import ModalController from '../../controllers/modalController';
import template from './addUserForm.hbs';
import './addUserForm.scss';

interface AddUserFormProps {
  classNames?: string[];
  errorMessage?: string;
  events?: Record<string, (event: Event) => void>;
  selectedChat?: number;
}

class AddUserFormBase extends Block<AddUserFormProps, CustomButton | UserInput> {
  constructor(props: AddUserFormProps) {
    const classNames = ['user-form'];

    const children = {
      button: new CustomButton({
        label: 'Добавить',
        events: { click: () => this.handleSubmit() },
      }),
      userInput: new UserInput({ onChange: () => this.clearError() }),
    };

    super('div', { ...props, events: { click: (e) => this.handleClick(e) }, classNames }, children);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  private async handleSubmit() {
    if (UserInput.isUserInput(this.children.userInput)) {
      const userId = this.children.userInput.selectedId;

      if (!userId) {
        this.setProps({ errorMessage: 'Укажите пользователя' });
        return;
      }

      if (this.props.selectedChat) {
        ChatsController.addUserToChat(this.props.selectedChat, userId);
        ModalController.close();
      }
    }
  }

  private clearError() {
    this.setProps({ errorMessage: '' });
    return;
  }

  private handleClick(e: Event) {
    if (UserInput.isUserInput(this.children.userInput)) {
      this.children.userInput.handleOutsideClick(e);
    }
  }
}

const mapStateToProps = (state: IState) => ({
  selectedChat: state.selectedChat,
});

export const AddUserForm = withStore(mapStateToProps)(AddUserFormBase);
