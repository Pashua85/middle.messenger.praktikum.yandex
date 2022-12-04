import signUpTemplate from './pages/signUpPage/signUpPage.hbs';
import signInTemplate from './pages/signInPage/signInPage.hbs';
import profileTemplate from './pages/profilePage/profilePage.hbs';
import chatsTemplate from './pages/chatsPage/chatsPage.hbs';
import errorTemplate from './pages/errorPage/errorPage.hbs';
import { listenNavigateEvents } from './listenNavigateEvents';

const templates = {
  signUp: signUpTemplate,
  signIn: signInTemplate,
  profile: profileTemplate,
  chats: chatsTemplate,
  error: errorTemplate,
};

export const renderPage = (page = 'main', data = {}) => {
  const template = templates[page];

  if (template) {
    const html = template(data);
    const root = document.querySelector('#app');

    root.innerHTML = html;

    listenNavigateEvents();
  }
};
