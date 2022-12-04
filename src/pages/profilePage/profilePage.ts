import { Block } from '../../core';
import { EPage, EProfilePageViewMode } from '../../enums';
import { ProfileForm } from '../../components/profileForm/profileForm';
import template from './profilePage.hbs';
import './profilePage.scss';
import { PasswordForm } from '../../components/passwordForm';
import { CustomButton } from '../../components/customButton';

interface ProfilePageProps {
  classNames: string[];
  navigate: (page: EPage) => void;
  viewMode: EProfilePageViewMode;
}

export class ProfilePage extends Block<ProfilePageProps, ProfileForm | PasswordForm | CustomButton> {
  constructor(props: ProfilePageProps) {
    const children = {
      profileForm: new ProfileForm({
        isInViewMode: true,
        navigate: props.navigate,
        onOpenPasswordForm: () => this.changeViewMode(EProfilePageViewMode.PASSWORD),
      }),
      passwordForm: new PasswordForm({
        returnToProfile: () => this.changeViewMode(EProfilePageViewMode.PROFILE),
      }),
      backButton: new CustomButton({
        label: '',
        classNames: ['profile__back'],
        events: {
          click: () => this.props.navigate(EPage.CHATS),
        },
        type: 'submit',
      }),
    };

    super('div', props, children);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  private changeViewMode(payload: EProfilePageViewMode): void {
    this.setProps({ viewMode: payload });
  }
}
