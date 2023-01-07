import { Block } from '../../core';
import { EPage, EProfilePageViewMode, ERoute } from '../../enums';
import { ProfileForm, ProfileFormBase } from '../../components/profileForm/profileForm';
import template from './profilePage.hbs';
import './profilePage.scss';
import { PasswordForm } from '../../components/passwordForm';
import { CustomButton } from '../../components/customButton';
import { navigate } from '../../utils';
import { IState, withStore } from '../../store/store';

interface ProfilePageProps {
  classNames: string[];
  // navigate: (page: EPage) => void;
  viewMode: EProfilePageViewMode;
  isInViewMode: boolean;
}

export class ProfilePageBase extends Block<ProfilePageProps, ProfileFormBase | PasswordForm | CustomButton> {
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
    };

    super('div', { ...props, classNames: ['profile'] }, children);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  private changeViewMode(payload: EProfilePageViewMode): void {
    this.setProps({ viewMode: payload });
  }
}

const mapStateToProps = (state: IState) => ({ name: state.user?.first_name });

export const ProfilePage = withStore(mapStateToProps)(ProfilePageBase);
