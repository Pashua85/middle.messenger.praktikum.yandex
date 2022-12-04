import { ChatsPage } from '../pages/chatsPage';
import { SignInPage } from '../pages/signInPage';
import { SignUpPage } from '../pages/signUpPage';
import { ProfilePage } from '../pages/profilePage/profilePage';

export type AppPage = SignInPage | SignUpPage | ChatsPage | ProfilePage;
