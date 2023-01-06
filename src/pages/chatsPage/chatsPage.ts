import { Block } from '../../core';
import { EPage, ERoute } from '../../enums';
import template from './chatsPage.hbs';
import './chatsPage.scss';
import { Chat } from '../../components/chat/chat';
import { TextLink } from '../../components/textLink/textLink';
import { navigate } from '../../utils';

interface ChatsPageProps {
  classNames: string[];
  // navigate: (page: EPage) => void;
}

export class ChatsPage extends Block<ChatsPageProps, Chat | TextLink> {
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
    };

    super('div', { ...props, classNames: ['chats'] }, children);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
