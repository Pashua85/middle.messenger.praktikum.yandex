import { Block } from '../../core';
import template from './customButton.hbs';
import './customButton.scss';

interface CustomButtonProps {
  label: string;
  events: Record<string, () => void>;
  classNames?: string[];
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
}
