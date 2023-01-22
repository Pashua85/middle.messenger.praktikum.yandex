import { Block } from '../../core';
import { EProfilePageViewMode, ERoute } from '../../enums';
import { ProfileForm } from '../../components/profileForm/profileForm';
import template from './profilePage.hbs';
import './profilePage.scss';
import { PasswordForm } from '../../components/passwordForm';
import { CustomButton } from '../../components/customButton';
import { navigate } from '../../utils';
import { IState, withStore } from '../../store/store';
import { RESOURCES } from '../../constants';
import { Avatar } from '../../components/avatar';
import ModalController from '../../controllers/modalController';
import UserController from '../../controllers/userController';
import { FileForm } from '../../components/fileForm';

interface ProfilePageProps {
  classNames: string[];
  viewMode: EProfilePageViewMode;
  isInViewMode: boolean;
  avatar?: string;
}

export class ProfilePageBase extends Block<
  ProfilePageProps,
  typeof ProfileForm | PasswordForm | CustomButton | Avatar
> {
  constructor(props: ProfilePageProps) {
    const children = {
      profileForm: new ProfileForm({
        isInViewMode: props.isInViewMode,
        onOpenPasswordForm: () => this.changeViewMode(EProfilePageViewMode.PASSWORD),
      }),
      passwordForm: new PasswordForm({
        returnToProfile: () => this.changeViewMode(EProfilePageViewMode.PROFILE),
      }),
      backButton: new CustomButton({
        label: '',
        classNames: ['profile__back'],
        events: {
          click: () => navigate(ERoute.Chats),
        },
        type: 'submit',
      }),
      avatar: new Avatar({
        classNames: ['profile__avatar'],
        avatar: props.avatar,
        events: {
          click: () => this.openAvatarModal(),
        },
      }),
    };

    super('div', { ...props, classNames: ['profile'] }, children);
  }

  protected componentDidUpdate(oldProps: ProfilePageProps, newProps: ProfilePageProps): boolean {
    if (oldProps?.avatar !== newProps?.avatar) {
      this.children.avatar.setProps({ avatar: newProps.avatar });
    }

    return true;
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  private changeViewMode(payload: EProfilePageViewMode): void {
    this.setProps({ viewMode: payload });
  }

  private openAvatarModal(): void {
    ModalController.open(
      new FileForm({
        onSubmit: (data: FormData) => {
          this.changeAvatar(data);
        },
      }),
    );
  }

  private async changeAvatar(data: FormData) {
    await UserController.changeAvatar(data);
  }
}

const mapStateToProps = (state: IState) => ({
  name: state.user?.first_name,
  avatar: state.user?.avatar ? `${RESOURCES}/${state.user?.avatar}` : undefined,
  avatarText: state.user?.avatar ? 'Поменять аватар' : 'Pfvtyb',
});

export const ProfilePage = withStore(mapStateToProps)(ProfilePageBase);
