import { Block } from '../../core';
import { TextLink } from '../../components/textLink';
import template from './errorPage.hbs';
import './errorPage.scss';

interface ErrorPageProps {
  classNames?: string[];
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
