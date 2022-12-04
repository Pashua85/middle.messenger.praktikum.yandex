import { PASSWORD_RULES } from '../../constants';
import { EInputType } from '../../enums';
import { CustomButton } from '../customButton';
import { Form } from '../form';
import { FormInput } from '../formInput';
import template from './passwordForm.hbs';
import './passwordForm.scss';

interface PasswordFormProps {
  classNames?: string[];
  returnToProfile: () => void;
}

export class PasswordForm extends Form<PasswordFormProps, FormInput | CustomButton, FormInput> {
  constructor(props: PasswordFormProps) {
    const passwordInput = new FormInput({
      label: 'Пароль',
      name: 'password',
      id: 'password',
      type: 'password',
      rules: PASSWORD_RULES,
      componentType: EInputType.ROW,
    });
    const oldPasswordInput = new FormInput({
      label: 'Старый пароль',
      name: 'old_password',
      id: 'old_password',
      type: 'password',
      rules: PASSWORD_RULES,
      componentType: EInputType.ROW,
    });
    const passwordRepeatInput = new FormInput({
      label: 'Пароль (еще раз)',
      name: 'password-repeat',
      id: 'password-repeat',
      type: 'password',
      componentType: EInputType.ROW,
      rules: {
        ...PASSWORD_RULES,
        ['Пароли не совпадают']: (value) => (this.children.passwordInput as FormInput).value === value,
      },
    });

    const children = {
      passwordInput,
      oldPasswordInput,
      passwordRepeatInput,
      button: new CustomButton({
        label: 'Сохранить',
        events: {},
        type: 'submit',
      }),
    };

    super({ ...props, classNames: ['password-form'] }, children, [
      passwordInput,
      oldPasswordInput,
      passwordRepeatInput,
    ]);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  protected handleSubmit(formValues: Record<string, string | number>): void {
    console.log({ formValues });
    this.props.returnToProfile();
  }
}
