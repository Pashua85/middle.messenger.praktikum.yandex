import { FormInput } from '../../components/formInput';
import { Block } from '../../core';
import template from './signInPage.hbs';
import './signInPage.scss';

interface SingInPageProps {
  classNames: string[];
}

export class SignInPage extends Block<SingInPageProps, FormInput> {
  constructor(props: SingInPageProps) {
    const children = {
      loginInput: new FormInput({
        label: 'Логин',
        name: 'login',
        type: 'text',
      }),
      passwordInput: new FormInput({
        label: 'Пароль',
        name: 'password',
        type: 'password',
      }),
    };

    super('div', props, children);

    setTimeout(() => {
      this.children.loginInput.setProps({ errorMessage: 'Some error message' });
    }, 5000);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
