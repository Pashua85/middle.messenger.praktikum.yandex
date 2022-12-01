import { Block } from '../../core';
import template from './input.hbs';

interface InputProps {
  classNames?: string[];
  events?: Record<string, (event: unknown) => void>;
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
}
