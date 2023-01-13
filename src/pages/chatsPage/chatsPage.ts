import { Block } from '../../core';
import { EPage, ERoute } from '../../enums';
import template from './chatsPage.hbs';
import './chatsPage.scss';
import { Chat } from '../../components/chat/chat';
import { TextLink } from '../../components/textLink/textLink';
import { navigate } from '../../utils';
import { ChatsItem } from '../../components/chatsItem/chatsItem';
import ChatsController from '../../controllers/chatsController';
import { IState, withStore } from '../../store/store';
import { ChatList } from '../../components/chatList';

interface ChatsPageProps {
  classNames: string[];
  // navigate: (page: EPage) => void;
}

export class ChatsPageBase extends Block<ChatsPageProps, Chat | TextLink | ChatList> {
  constructor(props: ChatsPageProps) {
    const children = {
      chat: new Chat({ classNames: ['chat'], title: 'Виктор' }),
      profileLink: new TextLink({
        classNames: ['sidebar__link'],
        text: 'Профиль',
        events: {
          click: (e: Event) => {
            e.preventDefault();
            navigate(ERoute.Profile);
          },
        },
      }),
      chatList: new ChatList({ isLoaded: false }),
    };

    super('div', { ...props, classNames: ['chats'] }, children);
  }

  protected init() {
    // this.children.chatsList = new ChatsList({ isLoaded: false });

    // this.children.messenger = new Messenger({});

    ChatsController.fetchChats().finally(() => {
      // (this.children.chatsList as Block).setProps({
      //   isLoaded: true
      // })
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}

const mapStateToProps = (state: IState) => ({ chats: state.chats });
export const ChatsPage = withStore(mapStateToProps)(ChatsPageBase);
