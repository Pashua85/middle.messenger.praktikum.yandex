import { Block } from '../../core';
import { Input } from '../input';
import template from './formInput.hbs';
import './formInput.scss';

interface FormInputProps {
  label: string;
  classNames?: string[];
  type: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
}

export class FormInput extends Block<FormInputProps, Input> {
  constructor(props: FormInputProps) {
    const children = {
      input: new Input({
        type: props.type,
        name: props.name,
        placeholder: props.placeholder,
        classNames: ['form-input'],
      }),
    };

    super(
      'div',
      {
        ...props,
        classNames: props.classNames ? [...props.classNames, 'form-input__container'] : ['form-input__container'],
      },
      children,
    );
  }

  public render() {
    return this.compile(template, { ...this.props });
  }

  protected componentDidUpdate(oldProps: FormInputProps, newProps: FormInputProps): boolean {
    if (oldProps.errorMessage !== newProps.errorMessage) {
      if (newProps.errorMessage) {
        this.children.input.setProps({ classNames: ['form-input', 'form-input_invalid'] });
      } else {
        this.children.input.setProps({ classNames: ['form-input'] });
      }
    }

    return true;
  }
}
