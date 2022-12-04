import { Block } from './core';
import { EPage, EProfilePageViewMode } from './enums';
import template from './app.hbs';
import { AppPage } from './types/appPage';
import { SignInPage } from './pages/signInPage';
import { SignUpPage } from './pages/signUpPage';
import { ChatsPage } from './pages/chatsPage';
import { ProfilePage } from './pages/profilePage/profilePage';

interface AppProps {
  page: EPage;
}

export class App extends Block<AppProps, AppPage> {
  constructor(props: AppProps) {
    const children = {
      [EPage.SIGN_IN]: new SignInPage({ classNames: ['sign-in-page'], navigate: (page) => this.navigateToPage(page) }),
      [EPage.SIGN_UP]: new SignUpPage({ classNames: ['sign-up-page'], navigate: (page) => this.navigateToPage(page) }),
      [EPage.CHATS]: new ChatsPage({ classNames: ['chats'], navigate: (page) => this.navigateToPage(page) }),
      [EPage.PROFILE]: new ProfilePage({
        classNames: ['profile'],
        navigate: (page) => this.navigateToPage(page),
        viewMode: EProfilePageViewMode.PROFILE,
      }),
    };

    super('div', props, children);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { page: this.props.page });
  }

  private navigateToPage(page: EPage): void {
    this.setProps({ page });
  }
}
