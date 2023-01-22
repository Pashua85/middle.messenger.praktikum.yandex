import { Block } from '../../core';
import { CustomButton } from '../customButton';
import ModalController from '../../controllers/modalController';
import './fileForm.scss';
import { Form } from '../form';
import template from './fileForm.hbs';

interface FileFormProps {
  classNames?: string[];
  onSubmit: (data: FormData) => void;
  events?: Record<string, (e: SubmitEvent) => void>;
}

export class FileForm extends Block<FileFormProps, CustomButton> {
  constructor(props: FileFormProps) {
    // const passwordInput = new FormInput({
    //   label: 'Пароль',
    //   name: 'password',
    //   id: 'password',
    //   type: 'password',
    //   rules: PASSWORD_RULES,
    //   componentType: EInputType.ROW,
    // });
    // const oldPasswordInput = new FormInput({
    //   label: 'Старый пароль',
    //   name: 'old_password',
    //   id: 'old_password',
    //   type: 'password',
    //   rules: PASSWORD_RULES,
    //   componentType: EInputType.ROW,
    // });
    // const passwordRepeatInput = new FormInput({
    //   label: 'Пароль (еще раз)',
    //   name: 'password-repeat',
    //   id: 'password-repeat',
    //   type: 'password',
    //   componentType: EInputType.ROW,
    //   rules: {
    //     ...PASSWORD_RULES,
    //     ['Пароли не совпадают']: (value) => (this.children.passwordInput as FormInput).value === value,
    //   },
    // });

    const children = {
      // passwordInput,
      // oldPasswordInput,
      // passwordRepeatInput,
      button: new CustomButton({
        label: 'Применить',
        events: {},
        type: 'submit',
      }),
    };

    super(
      'form',
      {
        ...props,
        classNames: ['file-form'],
        events: {
          submit: (e: SubmitEvent) => {
            e.preventDefault();
            this.handleSubmit(e);
          },
        },
      },
      children,
    );
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  protected handleSubmit(event: SubmitEvent): void {
    const form = event.target as HTMLFormElement;

    if (!form) return;

    const formData = new FormData(form);

    this.props.onSubmit(formData);
    ModalController.close();
  }
}
