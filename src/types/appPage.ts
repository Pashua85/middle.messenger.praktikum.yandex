import { ChatsPage } from '../pages/chatsPage';
import { SignInPage } from '../pages/signInPage';
import { SignUpPage } from '../pages/signUpPage';
import { ProfilePage } from '../pages/profilePage';
import { ErrorPage } from '../pages/errorPage';

export type AppPage = SignInPage | SignUpPage | ChatsPage | ProfilePage | ErrorPage;
