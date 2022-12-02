import { CustomButton } from '../customButton';
import { Form } from '../form';
import { FormInput } from '../formInput';
import { TextLink } from '../textLink';
import template from './signInForm.hbs';
import './signInForm.scss';

interface SignInFormProps {
  classNames: string[];
}

export class SingInForm extends Form<SignInFormProps, FormInput | CustomButton | TextLink, FormInput> {
  constructor(props: SignInFormProps) {
    const loginInput = new FormInput({
      label: 'Логин',
      name: 'login',
      type: 'text',
      rules: {
        ['Обязательное поле']: new RegExp(/\S+/),
        ['Логин должен содержать от 3 до 20 символов']: new RegExp(/^(.{3,20})$/),
        ['Недопустимы пробелы']: new RegExp(/^\S*$/),
        ['Допустимы только латиница, цифры, символы "_" и "-"']: new RegExp(/^[0-9a-zA-Z\-\_]*$/),
        ['Логин не может состоять только из цифр']: new RegExp(/\D+/),
      },
    });
    const passwordInput = new FormInput({
      label: 'Пароль',
      name: 'password',
      type: 'password',
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
    console.log('link click');
  }
}
