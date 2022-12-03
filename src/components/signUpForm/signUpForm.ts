import { EMAIL_RULES, LOGIN_RULES, NAME_RULES, PASSWORD_RULES, PHONES_RULES } from '../../constants';
import { CustomButton } from '../customButton';
import { Form } from '../form';
import { FormInput } from '../formInput';
import { TextLink } from '../textLink';
import template from './signUpForm.hbs';
import './signUpForm.scss';

interface SignUpFormProps {
  classNames: string[];
}

export class SingUpForm extends Form<SignUpFormProps, FormInput | CustomButton | TextLink, FormInput> {
  constructor(props: SignUpFormProps) {
    const emailInput = new FormInput({
      label: 'Почта',
      name: 'email',
      type: 'text',
      rules: EMAIL_RULES,
    });
    const firstNameInput = new FormInput({
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      rules: NAME_RULES,
    });
    const secondNameInput = new FormInput({
      label: 'Фамилия',
      name: 'second_name',
      type: 'text',
      rules: NAME_RULES,
    });
    const loginInput = new FormInput({
      label: 'Логин',
      name: 'login',
      type: 'text',
      rules: LOGIN_RULES,
    });
    const passwordInput = new FormInput({
      label: 'Пароль',
      name: 'password',
      type: 'password',
      rules: PASSWORD_RULES,
    });
    const passwordRepeatInput = new FormInput({
      label: 'Пароль (еще раз)',
      name: 'password-repeat',
      type: 'password',
      rules: {
        ...PASSWORD_RULES,
        ['Пароли не совпадают']: (value) => (this.children.passwordInput as FormInput).value === value,
      },
    });
    const phoneInput = new FormInput({
      label: 'Телефон',
      name: 'phone',
      type: 'text',
      rules: PHONES_RULES,
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
        text: 'Нет аккаунта?',
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
    console.log('link click');
  }
}
