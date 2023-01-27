import { Block } from '../../core';
import { CustomButton } from '../customButton';
import ModalController from '../../controllers/modalController';
import './fileForm.scss';
import template from './fileForm.hbs';
import { Input } from '../input';

interface FileFormProps {
  classNames?: string[];
  onSubmit: (data: FormData) => void;
  events?: Record<string, (e: SubmitEvent) => void>;
  errorMessage?: string;
}

export class FileForm extends Block<FileFormProps, CustomButton | Input> {
  constructor(props: FileFormProps) {
    const children = {
      button: new CustomButton({
        label: 'Применить',
        events: {},
        type: 'submit',
      }),
      input: new Input({
        name: 'avatar',
        type: 'file',
        events: {
          change: (e) => this.handleChange(e),
        },
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

    if (!form || this.props.errorMessage) return;

    // const fileName = (form[0] as HTMLInputElement).files?.[0].name;

    // if (fileName?.includes(' ')) {
    //   this.setProps({ errorMessage: 'Название файла не может содержать пробелы' });
    //   return;
    // }

    const formData = new FormData(form);

    this.props.onSubmit(formData);
    ModalController.close();
  }

  private handleChange(e: InputEvent) {
    const fileName = (e.target as HTMLInputElement)?.files?.[0].name;

    if (fileName?.includes(' ')) {
      this.setProps({ errorMessage: 'Название файла не может содержать пробелы' });
      this.children.button.setProps({ disabled: true });
      return;
    }

    this.setProps({ errorMessage: '' });
    this.children.button.setProps({ disabled: false });
  }
}
