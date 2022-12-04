import { EMAIL_RULES, LOGIN_RULES, NAME_RULES, PASSWORD_RULES, PHONES_RULES } from '../../constants';
import { EInputType, EPage } from '../../enums';
import { CustomButton } from '../customButton';
import { Form } from '../form';
import { FormInput } from '../formInput';
import { TextLink } from '../textLink';
import template from './signUpForm.hbs';
import './signUpForm.scss';

interface SignUpFormProps {
  classNames: string[];
  navigate: (page: EPage) => void;
}

export class SingUpForm extends Form<SignUpFormProps, FormInput | CustomButton | TextLink, FormInput> {
  constructor(props: SignUpFormProps) {
    const emailInput = new FormInput({
      label: 'Почта',
      name: 'email',
      id: 'email',
      type: 'text',
      rules: EMAIL_RULES,
      componentType: EInputType.REGULAR,
    });
    const firstNameInput = new FormInput({
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      id: 'first_name',
      rules: NAME_RULES,
      componentType: EInputType.REGULAR,
    });
    const secondNameInput = new FormInput({
      label: 'Фамилия',
      name: 'second_name',
      id: 'second_name',
      type: 'text',
      rules: NAME_RULES,
      componentType: EInputType.REGULAR,
    });
    const loginInput = new FormInput({
      label: 'Логин',
      name: 'login',
      id: 'login',
      type: 'text',
      rules: LOGIN_RULES,
      componentType: EInputType.REGULAR,
    });
    const passwordInput = new FormInput({
      label: 'Пароль',
      name: 'password',
      id: 'password',
      type: 'password',
      rules: PASSWORD_RULES,
      componentType: EInputType.REGULAR,
    });
    const passwordRepeatInput = new FormInput({
      label: 'Пароль (еще раз)',
      name: 'password-repeat',
      id: 'password-repeat',
      type: 'password',
      componentType: EInputType.REGULAR,
      rules: {
        ...PASSWORD_RULES,
        ['Пароли не совпадают']: (value) => (this.children.passwordInput as FormInput).value === value,
      },
    });
    const phoneInput = new FormInput({
      label: 'Телефон',
      name: 'phone',
      id: 'phone',
      type: 'text',
      rules: PHONES_RULES,
      componentType: EInputType.REGULAR,
    });

    const children = {
      emailInput,
      firstNameInput,
      secondNameInput,
      loginInput,
      passwordInput,
      passwordRepeatInput,
      phoneInput,
      button: new CustomButton({
        label: 'Зарегистрироваться',
        events: {
          click: () => console.log('Зарегистрироваться!'),
        },
        type: 'submit',
      }),
      link: new TextLink({
        classNames: ['sign-in-form__link'],
        text: 'Войти',
        events: {
          click: (e: Event) => {
            this.handleLinkClick(e);
          },
        },
      }),
    };

    super(props, children, [
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      passwordInput,
      passwordRepeatInput,
    ]);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {});
  }

  protected handleSubmit(formValues: Record<string, string | number>): void {
    console.log({ formValues });
  }

  private handleLinkClick(e: Event) {
    e.preventDefault();
    this.props.navigate(EPage.SIGN_IN);
  }
}
