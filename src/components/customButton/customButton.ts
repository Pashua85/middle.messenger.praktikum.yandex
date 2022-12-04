import { Block } from '../../core';
import template from './customButton.hbs';
import './customButton.scss';

interface CustomButtonProps {
  label: string;
  events: Record<string, () => void>;
  classNames?: string[];
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export class CustomButton extends Block<CustomButtonProps, never> {
  constructor(props: CustomButtonProps) {
    super('button', {
      ...props,
      classNames: props.classNames ? [...props.classNames, 'custom-button'] : ['custom-button'],
    });
  }

  public render() {
    return this.compile(template, { ...this.props });
  }

  protected init() {
    if (this.element) {
      this.element.setAttribute('type', this.props.type || 'button');

      if (this.props.disabled) {
        this.element.setAttribute('disabled', 'true');
      }
    }
  }

  protected componentDidUpdate(oldProps: CustomButtonProps, newProps: CustomButtonProps): boolean {
    if (this.element && oldProps.disabled !== newProps.disabled) {
      if (newProps.disabled) {
        this.element.setAttribute('disabled', 'true');
      } else {
        this.element.removeAttribute('disabled');
      }
    }
    return true;
  }
}
