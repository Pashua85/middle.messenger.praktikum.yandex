import { Block } from '../../core';
import { EPage } from '../../enums';
import template from './chatsPage.hbs';
import './chatsPage.scss';
import { Chat } from '../../components/chat/chat';

interface ChatsPageProps {
  classNames: string[];
  navigate: (page: EPage) => void;
}

export class ChatsPage extends Block<ChatsPageProps, Chat> {
  constructor(props: ChatsPageProps) {
    const children = {
      chat: new Chat({ classNames: ['chat'], title: 'Виктор' }),
    };

    super('div', props, children);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
