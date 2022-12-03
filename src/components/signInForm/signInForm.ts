import { LOGIN_RULES, PASSWORD_RULES } from '../../constants';
import { EPage } from '../../enums';
import { CustomButton } from '../customButton';
import { Form } from '../form';
import { FormInput } from '../formInput';
import { TextLink } from '../textLink';
import template from './signInForm.hbs';
import './signInForm.scss';

interface SignInFormProps {
  classNames: string[];
  navigate: (page: EPage) => void;
}

export class SingInForm extends Form<SignInFormProps, FormInput | CustomButton | TextLink, FormInput> {
  constructor(props: SignInFormProps) {
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

  protected handleSubmit(formValues: Record<string, string | number>): void {
    console.log({ formValues });
  }

  private handleLinkClick(e: Event) {
    e.preventDefault();
    this.props.navigate(EPage.SIGN_UP);
  }
}
