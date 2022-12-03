import { Block } from './core';
import { EPage } from './enums';
import template from './app.hbs';
import { AppPage } from './types/appPage';
import { SignInPage } from './pages/signInPage';
import { SignUpPage } from './pages/signUpPage';

interface AppProps {
  page: EPage;
}

export class App extends Block<AppProps, AppPage> {
  constructor(props: AppProps) {
    const children = {
      [EPage.SIGN_IN]: new SignInPage({ classNames: ['sign-in-page'] }),
      [EPage.SIGN_UP]: new SignUpPage({ classNames: ['sign-up-page'] }),
    };

    super('div', props, children);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { page: this.props.page });
  }
}
