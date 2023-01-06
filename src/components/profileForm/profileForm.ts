import { EMAIL_RULES, LOGIN_RULES, NAME_RULES, PHONES_RULES } from '../../constants';
import { EInputType, ERoute } from '../../enums';
import { navigate } from '../../utils';
import { CustomButton } from '../customButton';
import { Form } from '../form';
import { FormInput } from '../formInput';
import { TextLink } from '../textLink';
import template from './profileForm.hbs';
import './profileForm.scss';

interface ProfileFormProps {
  classNames?: string[];
  isInViewMode: boolean;
  // navigate: (page: EPage) => void;
  onOpenPasswordForm: () => void;
}

export class ProfileForm extends Form<ProfileFormProps, FormInput | CustomButton | TextLink, FormInput> {
  constructor(props: ProfileFormProps) {
    const emailInput = new FormInput({
      label: 'Почта',
      name: 'email',
      id: 'email',
      type: 'text',
      rules: EMAIL_RULES,
      componentType: EInputType.ROW,
      disabled: props.isInViewMode,
    });
    const firstNameInput = new FormInput({
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      id: 'first_name',
      rules: NAME_RULES,
      componentType: EInputType.ROW,
      disabled: props.isInViewMode,
    });
    const secondNameInput = new FormInput({
      label: 'Фамилия',
      name: 'second_name',
      id: 'second_name',
      type: 'text',
      rules: NAME_RULES,
      componentType: EInputType.ROW,
      disabled: props.isInViewMode,
    });
    const loginInput = new FormInput({
      label: 'Логин',
      name: 'login',
      id: 'login',
      type: 'text',
      rules: LOGIN_RULES,
      componentType: EInputType.ROW,
      disabled: props.isInViewMode,
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
    });
    const phoneInput = new FormInput({
      label: 'Телефон',
      name: 'phone',
      id: 'phone',
      type: 'text',
      rules: PHONES_RULES,
      componentType: EInputType.ROW,
      disabled: props.isInViewMode,
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
            navigate(ERoute.Chats);
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
        console.log('enable');
        this.disableForm();
      } else {
        console.log('disable');
        this.enableForm();
      }
    }
    return true;
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  protected handleSubmit(formValues: Record<string, string | number>): void {
    console.log({ formValues });
    this.setProps({ isInViewMode: true });
  }
}
