import { Block } from '../../core';
import { IUser } from '../../interfaces';
import { IState, withStore } from '../../store/store';
import ChatController from '../../controllers/chatsController';
import ModalController from '../../controllers/modalController';
import { CustomButton } from '../customButton';
import template from './deleteUserForm.hbs';
import './deleteUserForm.scss';

interface DeleteUserFormProps {
  classNames?: string[];
  errorMessage?: string;
  events?: Record<string, (event: Event | SubmitEvent) => void>;
  selectedChat?: number;
  users?: IUser[];
}

class DeleteUserFormBase extends Block<DeleteUserFormProps, CustomButton> {
  constructor(props: DeleteUserFormProps) {
    const classNames = ['delete-user-form'];

    const children = {
      button: new CustomButton({
        label: 'Удалить',
        events: {},
        type: 'submit',
      }),
    };

    super(
      'form',
      {
        ...props,
        events: {
          submit: (e) => this.handleSubmit(e),
        },
        classNames,
      },
      children,
    );
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  private async handleSubmit(e: Event) {
    e.preventDefault();
    const selectValue = Number(((e.target as HTMLFormElement)[0] as HTMLSelectElement).value);

    if (isNaN(selectValue) || !this.props.selectedChat) {
      return;
    }

    ChatController.deleteUserFromChat(this.props.selectedChat, selectValue);
    ModalController.close();
  }
}

const mapStateToProps = (state: IState) => {
  const { selectedChat } = state;

  if (!selectedChat) {
    return {
      selectedChat: state.selectedChat,
      users: [],
    };
  }

  const chat = state.chats.find((item) => item.id === state.selectedChat);

  return {
    selectedChat: state.selectedChat,
    users: chat?.users,
  };
};

export const DeleteUserForm = withStore(mapStateToProps)(DeleteUserFormBase);
