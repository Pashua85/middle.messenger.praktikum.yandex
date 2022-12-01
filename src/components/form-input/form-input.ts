import { Block } from '../../core';
import template from './form-input.hbs';
import './form-input.scss';

interface FormInputProps {
  label: string;
  events: Record<string, () => void>;
  classNames?: string[];
  type: string;
  name: string;
  placeholder?: string;
  valid: boolean;
}

export class FormInput extends Block<FormInputProps> {
  constructor(props: FormInputProps) {
    super('div', {
      ...props,
      classNames: props.classNames ? [...props.classNames, 'form-input__container'] : ['form-input__container'],
    });
  }

  public render() {
    return this.compile(template, { ...this.props });
  }
}
