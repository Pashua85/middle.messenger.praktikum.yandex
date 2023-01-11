import { LOGIN_RULES, PASSWORD_RULES } from '../../constants';
import { EInputType, EPage, ERoute } from '../../enums';
import { navigate } from '../../utils';
import { CustomButton } from '../customButton';
import { Form } from '../form';
import { FormInput } from '../formInput';
import { TextLink } from '../textLink';
import template from './signInForm.hbs';
import AuthController from '../../controllers/authController';
import './signInForm.scss';
import { ISigninData } from '../../interfaces';

interface SignInFormProps {
  classNames: string[];
}

export class SingInForm extends Form<SignInFormProps, FormInput | CustomButton | TextLink, FormInput> {
  constructor(props: SignInFormProps) {
    const loginInput = new FormInput({
      label: 'Логин',
      name: 'login',
      type: 'text',
      id: 'login',
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

    const children = {
      loginInput,
      passwordInput,
      button: new CustomButton({
        label: 'Авторизоваться',
        events: {
          click: () => console.log('Авторизоваться!'),
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

    super(props, children, [loginInput, passwordInput]);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {});
  }

  protected handleSubmit(formValues: Record<string, string>): void {
    if (formValues.login && formValues.password) {
      AuthController.signin({ login: formValues.login, password: formValues.password });
    }
  }

  private handleLinkClick(e: Event) {
    e.preventDefault();
    // this.props.navigate(EPage.SIGN_UP);
    navigate(ERoute.Register);
  }
}
