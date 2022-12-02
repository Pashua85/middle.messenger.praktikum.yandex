import { CustomButton } from '../../components/customButton';
import { FormInput } from '../../components/formInput';
import { SingInForm } from '../../components/signInForm';
import { TextLink } from '../../components/textLink';
import { Block } from '../../core';
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

    super('div', props, children);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
