import { Block } from '../../core';
import { EPage } from '../../enums';
import { TextLink } from '../../components/textLink';
import template from './errorPage.hbs';
import './errorPage.scss';

interface ErrorPageProps {
  classNames?: string[];
  // navigate: (page: EPage) => void;
  errorNumber: number;
  errorMessage: string;
}

export class ErrorPage extends Block<ErrorPageProps, TextLink> {
  constructor(props: ErrorPageProps) {
    console.log({ errorProps: props });

    const children = {
      backLink: new TextLink({
        text: 'Назад к чатам',
        events: {
          click: (e: Event) => {
            e.preventDefault();
            // props.navigate(EPage.CHATS);
          },
        },
        classNames: ['error-page__link'],
      }),
    };

    super('div', props, children);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
