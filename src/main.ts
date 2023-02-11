/* eslint-disable indent */
import './styles';

import { Block } from './core';
import Router from './core/router/router';
import { ERoute } from './enums';
import { SignInPage } from './pages/signInPage';
import { SignUpPage } from './pages/signUpPage/signUpPage';
import { ChatsPage } from './pages/chatsPage';
import { ProfilePage } from './pages/profilePage';
import { ErrorPage } from './pages/errorPage';
import AuthController from './controllers/authController';
import { navigate } from './utils';

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(ERoute.Index, SignInPage as unknown as typeof Block)
    .use(ERoute.Register, SignUpPage as unknown as typeof Block)
    .use(ERoute.Profile, ProfilePage as unknown as typeof Block, {
      isInProfileMode: true,
      isInViewMode: true,
    })
    .use(ERoute.Error, ErrorPage as unknown as typeof Block, { errorNumber: 505, errorMessage: 'Что-то пошло не так' })
    .use(ERoute.Chats, ChatsPage as unknown as typeof Block)
    .start();

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case ERoute.Index:
    case ERoute.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      navigate(ERoute.Chats);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      navigate(ERoute.Index);
    }
  }
});
