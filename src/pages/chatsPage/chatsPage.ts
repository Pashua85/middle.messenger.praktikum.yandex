import { Block } from '../../core';
import { ERoute } from '../../enums';
import template from './chatsPage.hbs';
import './chatsPage.scss';
import { Chat } from '../../components/chat/chat';
import { TextLink } from '../../components/textLink/textLink';
import { navigate } from '../../utils';
import ChatsController from '../../controllers/chatsController';
import ModalController from '../../controllers/modalController';
import { IState, withStore } from '../../store/store';
import { ChatList } from '../../components/chatList';
import { CustomButton } from '../../components/customButton/customButton';
import { AddChatModal } from '../../components/addChatForm';

interface ChatsPageProps {
  classNames: string[];
}

export class ChatsPageBase extends Block<ChatsPageProps, typeof Chat | TextLink | typeof ChatList> {
  constructor(props: ChatsPageProps) {
    const children = {
      chat: new Chat({ classNames: ['chat'] }),
      profileLink: new TextLink({
        classNames: ['sidebar__link'],
        text: 'Профиль',
        events: {
          click: (e: Event) => {
            e.preventDefault();
            ChatsController.resetSelectChat();
            navigate(ERoute.Profile);
          },
        },
      }),
      chatList: new ChatList({ isLoaded: false }),
      addButton: new CustomButton({
        label: 'Создать чат',
        events: {
          click: () => this.openCreateChatModal(),
        },
        classNames: ['addChatButton'],
      }),
    };

    super('div', { ...props, classNames: ['chats'] }, children);
  }

  protected init() {
    ChatsController.fetchChats().finally(() => {
      (this.children.chatList as Block).setProps({
        isLoaded: true,
      });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {});
  }

  private openCreateChatModal() {
    ModalController.open(new AddChatModal({}));
  }
}

const mapStateToProps = (state: IState) => ({ chats: state.chats });
export const ChatsPage = withStore(mapStateToProps)(ChatsPageBase);
