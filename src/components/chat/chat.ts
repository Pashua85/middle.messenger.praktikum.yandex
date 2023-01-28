import { Block } from '../../core';
import template from './chat.hbs';
import './chat.scss';
import { ContextMenu } from '../contextMenu';
import { EContextMenu } from '../../enums';
import { MenuOption } from '../menuOption';
import { MessageForm } from '../messageForm';
import { IState, withStore } from '../../store/store';
import { IMessage } from '../../interfaces';
import { ChatDateBlock } from '../chatDateBlock';
import { RESOURCES } from '../../constants';
import { Avatar } from '../avatar';
import ModalController from '../../controllers/modalController';
import { FileForm } from '../fileForm';
import { UserForm } from '../userForm';

interface ChatProps {
  classNames: string[];
  title?: string;
  selectedChat?: number;
  messages: IMessage[];
  userId: number;
  avatar?: string;
}

export class ChatBase extends Block<ChatProps, ContextMenu | typeof MessageForm | typeof ChatDateBlock> {
  constructor(props: ChatProps) {
    const children = {
      contextMenu: new ContextMenu(
        { type: EContextMenu.HEADER, open: false },
        {
          option1: new MenuOption({
            label: 'Добавить пользователя',
            events: {
              click: () => this.openAddUserForm(),
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

  protected componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
    if (
      (oldProps?.selectedChat !== newProps?.selectedChat && newProps.messages) ||
      oldProps?.messages?.length !== newProps?.messages?.length
    ) {
      this.setChildren({
        ...this.children,
        chatDateBlocks: this.formDateBlocks(newProps.messages),
      });
    }

    if (oldProps?.avatar !== newProps?.avatar) {
      this.setChildren({
        ...this.children,
        avatar: new Avatar({
          classNames: ['chat__avatar'],
          avatar: newProps?.avatar,
          events: {
            click: () => this.openAvatarModal(),
          },
        }),
      });
    }

    return true;
  }

  private formDateBlocks(messages: IMessage[]): ChatDateBlock[] {
    const blocksToCreate = messages.reduce((acc, message) => {
      const dateObject = new Date(message.time);
      const dateStringWithYear = dateObject.toLocaleDateString('ru-RU', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      const dateString = dateObject.toLocaleDateString('ru-RU', {
        month: 'long',
        day: 'numeric',
      });

      if (!acc[dateStringWithYear]) {
        acc[dateStringWithYear] = {
          date: dateString,
          messages: [message],
        };
        return acc;
      }

      acc[dateStringWithYear].messages.push(message);

      return acc;
    }, {} as Record<string, { date: string; messages: IMessage[] }>);

    return Object.values(blocksToCreate).map(
      (item) => new ChatDateBlock({ date: item.date, messages: item.messages, userId: this.props.userId }),
    );
  }

  private openAvatarModal() {
    ModalController.open(
      new FileForm({
        onSubmit: (data: FormData) => {
          this.changeAvatar(data);
        },
      }),
    );
  }

  private openAddUserForm() {
    ModalController.open(new UserForm({}), this.handleCloseModal.bind(this));
  }

  private async changeAvatar(data: FormData) {
    // await UserController.changeAvatar(data);
  }

  private handleCloseModal() {
    console.log('handleClose');
    const { contextMenu } = this.children;
    if (ContextMenu.isContextMenu(contextMenu)) {
      contextMenu.close();
    }
  }
}

const mapStateToProps = (state: IState) => {
  if (!state.selectedChat) {
    return {
      selectedChat: state.selectedChat,
      userId: state.user?.id,
      messages: [],
    };
  }

  const chat = state.chats.find((item) => item.id === state.selectedChat);

  const title = chat?.title;
  const avatar = chat?.avatar ? `${RESOURCES}/${chat.avatar}` : undefined;

  const messages = state.messages[state.selectedChat] ?? [];
  return {
    selectedChat: state.selectedChat,
    title,
    userId: state.user?.id,
    messages,
    avatar,
  };
};

export const Chat = withStore(mapStateToProps)(ChatBase);
