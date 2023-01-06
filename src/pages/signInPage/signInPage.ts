import { SingInForm } from '../../components/signInForm';
import { Block } from '../../core';
import { EPage } from '../../enums';
import template from './signInPage.hbs';
import './signInPage.scss';

interface SingInPageProps {
  classNames: string[];
}

export class SignInPage extends Block<SingInPageProps, SingInForm> {
  constructor(props: SingInPageProps) {
    const children = {
      signInForm: new SingInForm({ classNames: ['sign-in-form'] }),
    };

    super('div', { ...props, classNames: ['sign-in-page'] }, children);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
