import './styles';

import './helpers.js';
import { Block } from './core';
import Router from './core/router/router';
import { EProfilePageViewMode, ERoute } from './enums';
import { SignInPage } from './pages/signInPage';
import { SignUpPage } from './pages/signUpPage/signUpPage';
import { ChatsPage } from './pages/chatsPage';
import { ProfilePage } from './pages/profilePage';
import { ErrorPage } from './pages/errorPage';

window.addEventListener('DOMContentLoaded', () => {
  Router.use(ERoute.Index, SignInPage as unknown as typeof Block)
    .use(ERoute.Register, SignUpPage as unknown as typeof Block)
    .use(ERoute.Profile, ProfilePage as unknown as typeof Block, { viewMode: EProfilePageViewMode.PROFILE })
    .use(ERoute.Error, ErrorPage as unknown as typeof Block, { errorNumber: 505, errorMessage: 'Что-то пошло не так' })
    .use(ERoute.Chats, ChatsPage as unknown as typeof Block)
    .start();
});
