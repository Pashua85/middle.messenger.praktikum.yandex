import { Block } from '../../core';
import template from './input.hbs';

interface InputProps {
  classNames?: string[];
  events?: Record<string, (event: unknown) => void>;
  type: string;
  name: string;
  placeholder?: string;
}

export class Input extends Block<InputProps, never> {
  constructor(props: InputProps) {
    super('input', {
      ...props,
    });
  }

  public render() {
    console.log('render input', { props: { ...this.props } });
    return this.compile(template, { ...this.props });
  }

  protected init(): void {
    if (this.element) {
      this.element.setAttribute('type', this.props.type);
      this.element.setAttribute('name', this.props.name);
      this.element.setAttribute('placeholder', this.props.placeholder || '');
    }
  }
}
