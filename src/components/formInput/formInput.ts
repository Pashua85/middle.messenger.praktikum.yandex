import { Block } from '../../core';
import { EInputType } from '../../enums';
import { FormInputRules } from '../../types';
import { Input } from '../input';
import template from './formInput.hbs';
import rowTemplate from './rowInput.hbs';
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
  componentType: EInputType;
  disabled?: boolean;
  id: string;
}

export class FormInput extends Block<FormInputProps, Input> {
  private _value: number | string = '';

  private inputClass = 'form-input';

  private inputInvalidClass = 'form-input_invalid';

  private containerClass = 'form-input__container';

  constructor(props: FormInputProps) {
    const isRegular = props.componentType === EInputType.REGULAR;
    const inputClass = isRegular ? 'form-input' : 'row-input__input';
    const invalidInputClass = isRegular ? 'form-input_invalid' : 'row-input__input_invalid';
    const containerClass = isRegular ? 'form-input__container' : 'row-input';

    const children = {
      input: new Input({
        type: props.type,
        name: props.name,
        placeholder: props.placeholder,
        classNames: [inputClass],
        disabled: props.disabled,
        value: props.value,
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
        classNames: props.classNames ? [...props.classNames, containerClass] : [containerClass],
      },
      children,
    );

    this.inputClass = inputClass;
    this.inputInvalidClass = invalidInputClass;
    this.containerClass = containerClass;
  }

  public get value(): number | string {
    return this._value;
  }

  public render(): DocumentFragment {
    const templateToRender = this.props.componentType === EInputType.REGULAR ? template : rowTemplate;
    return this.compile(templateToRender, { ...this.props });
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
        this.children.input.setProps({ classNames: [this.inputClass, this.inputInvalidClass] });
      } else {
        this.children.input.setProps({ classNames: [this.inputClass] });
      }
    }

    if (oldProps.disabled !== newProps.disabled) {
      if (newProps.disabled) {
        this.children.input.setProps({ disabled: true });
      } else {
        this.children.input.setProps({ disabled: false });
      }
    }

    if (oldProps.value !== newProps.value) {
      this._value = newProps.value || '';
      this.children.input.setProps({ value: newProps.value });
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
