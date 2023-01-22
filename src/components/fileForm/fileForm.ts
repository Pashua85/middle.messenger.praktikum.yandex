import { Block } from '../../core';
import { CustomButton } from '../customButton';
import ModalController from '../../controllers/modalController';
import './fileForm.scss';
import template from './fileForm.hbs';

interface FileFormProps {
  classNames?: string[];
  onSubmit: (data: FormData) => void;
  events?: Record<string, (e: SubmitEvent) => void>;
}

export class FileForm extends Block<FileFormProps, CustomButton> {
  constructor(props: FileFormProps) {
    const children = {
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
