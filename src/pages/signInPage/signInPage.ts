import { SingInForm } from '../../components/signInForm';
import { Block } from '../../core';
import { EPage } from '../../enums';
import template from './signInPage.hbs';
import './signInPage.scss';

interface SingInPageProps {
  classNames: string[];
  navigate: (page: EPage) => void;
}

export class SignInPage extends Block<SingInPageProps, SingInForm> {
  constructor(props: SingInPageProps) {
    const children = {
      signInForm: new SingInForm({ classNames: ['sign-in-form'], navigate: props.navigate }),
    };

    super('div', props, children);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
