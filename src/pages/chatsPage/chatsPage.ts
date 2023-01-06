import { Block } from '../../core';
import { EPage } from '../../enums';
import template from './chatsPage.hbs';
import './chatsPage.scss';
import { Chat } from '../../components/chat/chat';
import { TextLink } from '../../components/textLink/textLink';

interface ChatsPageProps {
  classNames: string[];
  // navigate: (page: EPage) => void;
}

export class ChatsPage extends Block<ChatsPageProps, Chat | TextLink> {
  constructor(props: ChatsPageProps) {
    console.log({ chatProps: props });

    const children = {
      chat: new Chat({ classNames: ['chat'], title: 'Виктор' }),
      profileLink: new TextLink({
        classNames: ['sidebar__link'],
        text: 'Профиль',
        events: {
          click: (e: Event) => {
            e.preventDefault();
            // this.props.navigate(EPage.PROFILE);
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
