import { SingUpForm } from '../../components/signUpForm';
import { Block } from '../../core';
import template from './signUpPage.hbs';
import './signUpPage.scss';

interface SingUpPageProps {
  classNames: string[];
}

export class SignUpPage extends Block<SingUpPageProps, SingUpForm> {
  constructor(props: SingUpPageProps) {
    const children = {
      signUpForm: new SingUpForm({ classNames: ['sign-up-form'] }),
    };

    super('div', { ...props, classNames: ['sign-up-page'] }, children);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
