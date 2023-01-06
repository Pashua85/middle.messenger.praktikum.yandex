import './styles';

import './helpers.js';
import { Block } from './core';
import Router from './core/router/router';
import { App } from './app';
import { EPage, EProfilePageViewMode } from './enums';
import { SignInPage } from './pages/signInPage';
import { SignUpPage } from './pages/signUpPage/signUpPage';
import { ChatsPage } from './pages/chatsPage';
import { ProfilePage } from './pages/profilePage';
import { ErrorPage } from './pages/errorPage';

// function render(query: string, block: Block) {
//   const root = document.querySelector(query);
//   const content = block?.getContent();

//   if (root && content) {
//     root.appendChild(content);
//   }
//   return root;
// }

// const app = new App({ page: EPage.SIGN_IN });

// render('.app', app);

enum Routes {
  Index = '/',
  Register = '/register',
  Profile = '/profile',
  Chats = '/chats',
  Error = '/error',
}

window.addEventListener('DOMContentLoaded', () => {
  Router.use(Routes.Index, SignInPage as unknown as typeof Block)
    .use(Routes.Register, SignUpPage as unknown as typeof Block)
    .use(Routes.Profile, ProfilePage as unknown as typeof Block, { viewMode: EProfilePageViewMode.PROFILE })
    .use(Routes.Error, ErrorPage as unknown as typeof Block, { errorNumber: 505, errorMessage: 'Что-то пошло не так' })
    .use(Routes.Chats, ChatsPage as unknown as typeof Block)
    .start();
});
