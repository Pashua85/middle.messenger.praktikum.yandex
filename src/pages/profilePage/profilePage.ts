import { Block } from '../../core';
import { EPage, EProfilePageViewMode } from '../../enums';
import { ProfileForm } from '../../components/profileForm/profileForm';
import template from './profilePage.hbs';
import './profilePage.scss';
import { PasswordForm } from '../../components/passwordForm';

interface ProfilePageProps {
  classNames: string[];
  navigate: (page: EPage) => void;
  viewMode: EProfilePageViewMode;
}

export class ProfilePage extends Block<ProfilePageProps, ProfileForm | PasswordForm> {
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
