import { Block } from '../../core';
import template from './input.hbs';

interface InputProps {
  classNames?: string[];
  events?: Record<string, (event: Event | FocusEvent) => void>;
  type: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
}

export class Input extends Block<InputProps, never> {
  constructor(props: InputProps) {
    super('input', {
      ...props,
    });
  }

  public render() {
    return this.compile(template, { ...this.props });
  }

  protected componentDidUpdate(oldProps: InputProps, newProps: InputProps): boolean {
    if (oldProps.disabled !== newProps.disabled && this.element) {
      if (newProps.disabled) {
        this.element.setAttribute('disabled', 'true');
      } else {
        this.element.removeAttribute('disabled');
      }
    }
    return true;
  }

  protected init(): void {
    if (this.element) {
      this.element.setAttribute('type', this.props.type);
      this.element.setAttribute('name', this.props.name);
      this.element.setAttribute('placeholder', this.props.placeholder || '');
      if (this.props.disabled) {
        this.element.setAttribute('disabled', 'true');
      }
    }
  }
}
