import { EMAIL_RULES, LOGIN_RULES, NAME_RULES, PHONES_RULES } from '../../constants';
import { EInputType, ERoute } from '../../enums';
import { IUser } from '../../interfaces';
import { IState, withStore } from '../../store/store';
import { navigate } from '../../utils';
import { CustomButton } from '../customButton';
import { Form } from '../form';
import { FormInput } from '../formInput';
import { TextLink } from '../textLink';
import template from './profileForm.hbs';
import UserController from '../../controllers/userController';
import './profileForm.scss';
import { IUserData } from '../../interfaces/userData.interface';
import AuthController from '../../controllers/authController';

interface ProfileFormProps {
  classNames?: string[];
  isInViewMode: boolean;
  onOpenPasswordForm: () => void;
  user?: IUser;
}

export class ProfileFormBase extends Form<ProfileFormProps, FormInput | CustomButton | TextLink, FormInput> {
  constructor(props: ProfileFormProps) {
    const emailInput = new FormInput({
      label: 'Почта',
      name: 'email',
      id: 'email',
      type: 'text',
      rules: EMAIL_RULES,
      componentType: EInputType.ROW,
      disabled: props.isInViewMode,
      value: props.user?.email,
    });
    const firstNameInput = new FormInput({
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      id: 'first_name',
      rules: NAME_RULES,
      componentType: EInputType.ROW,
      disabled: props.isInViewMode,
      value: props.user?.first_name,
    });
    const secondNameInput = new FormInput({
      label: 'Фамилия',
      name: 'second_name',
      id: 'second_name',
      type: 'text',
      rules: NAME_RULES,
      componentType: EInputType.ROW,
      disabled: props.isInViewMode,
      value: props.user?.second_name,
    });
    const loginInput = new FormInput({
      label: 'Логин',
      name: 'login',
      id: 'login',
      type: 'text',
      rules: LOGIN_RULES,
      componentType: EInputType.ROW,
      disabled: props.isInViewMode,
      value: props.user?.login,
    });
    const displayNameInput = new FormInput({
      label: 'Имя в чате',
      name: 'display_name',
      id: 'display_name',
      type: 'text',
      // TODO сделать отдельные правила
      rules: NAME_RULES,
      componentType: EInputType.ROW,
      disabled: props.isInViewMode,
      value: props.user?.display_name || '',
    });
    const phoneInput = new FormInput({
      label: 'Телефон',
      name: 'phone',
      id: 'phone',
      type: 'text',
      rules: PHONES_RULES,
      componentType: EInputType.ROW,
      disabled: props.isInViewMode,
      value: props.user?.phone,
    });

    const children = {
      emailInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      displayNameInput,
      loginInput,
      button: new CustomButton({
        label: 'Сохранить',
        events: {},
        type: 'submit',
      }),
      dataLink: new TextLink({
        classNames: ['profile-form__link', 'profile-form__link_data'],
        text: 'Изменить данные',
        events: {
          click: (e: Event) => {
            e.preventDefault();
            this.setProps({ isInViewMode: false });
          },
        },
      }),
      passwordLink: new TextLink({
        classNames: ['profile-form__link', 'profile-form__link_password'],
        text: 'Изменить пароль',
        events: {
          click: (e: Event) => {
            e.preventDefault();
            this.props.onOpenPasswordForm();
          },
        },
      }),
      exitLink: new TextLink({
        classNames: ['profile-form__link', 'profile-form__link_exit'],
        text: 'Выйти',
        events: {
          click: (e: Event) => {
            e.preventDefault();
            AuthController.logout();
            navigate(ERoute.Index);
          },
        },
      }),
    };

    super({ ...props, classNames: ['profile-form'] }, children, [
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      displayNameInput,
      phoneInput,
    ]);
  }

  protected componentDidUpdate(oldProps: ProfileFormProps, newProps: ProfileFormProps): boolean {
    if (oldProps.isInViewMode !== newProps.isInViewMode) {
      if (newProps.isInViewMode) {
        this.disableForm();
      } else {
        this.enableForm();
      }
    }

    if (oldProps.user !== newProps.user) {
      this.updateValuesFromProps(newProps);
    }
    return true;
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  protected handleSubmit(formValues: Record<string, string | number>): void {
    UserController.changeProfile(formValues as unknown as IUserData);
    this.setProps({ isInViewMode: true });
  }

  private updateValuesFromProps(props: ProfileFormProps) {
    this.children.emailInput.setProps({ value: props.user?.email });
    this.children.firstNameInput.setProps({ value: props.user?.first_name });
    this.children.secondNameInput.setProps({ value: props.user?.second_name });
    this.children.loginInput.setProps({ value: props.user?.login });
    this.children.displayNameInput.setProps({ value: props.user?.display_name || '' });
    this.children.phoneInput.setProps({ value: props.user?.phone });
  }
}

const mapStateToProps = (state: IState) => ({ user: state.user });

export const ProfileForm = withStore(mapStateToProps)(ProfileFormBase);
