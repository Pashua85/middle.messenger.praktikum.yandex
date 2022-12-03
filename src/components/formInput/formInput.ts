import { Block } from '../../core';
import { FormInputRules } from '../../types';
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
  value?: string;
  rules?: FormInputRules;
}

export class FormInput extends Block<FormInputProps, Input> {
  private _value: number | string = '';

  constructor(props: FormInputProps) {
    const children = {
      input: new Input({
        type: props.type,
        name: props.name,
        placeholder: props.placeholder,
        classNames: ['form-input'],
        events: {
          blur: () => {
            this.handleBlur();
          },
          input: (e: Event) => {
            this.handleChange(e);
          },
        },
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

  public get value(): number | string {
    return this._value;
  }

  public render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  public validate(): boolean {
    if (this.props.rules) {
      if (typeof this._value === 'string') {
        for (const [errorMessage, validateFunction] of Object.entries(this.props.rules)) {
          const test = validateFunction(this._value);
          if (!test) {
            this.setProps({ errorMessage });
            return false;
          }
        }
      }
    }

    this.setProps({ errorMessage: '' });
    return true;
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

  private handleBlur(): void {
    this.validate();
  }

  private handleChange(e: Event): void {
    this._value = (e.target as HTMLInputElement).value;

    // TODO сделать отчистку ошибки при начале ввода
  }
}
