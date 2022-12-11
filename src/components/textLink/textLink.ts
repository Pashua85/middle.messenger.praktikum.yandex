import { Block } from '../../core';
import template from './textLink.hbs';

interface TextLinkProps {
  classNames?: string[];
  events?: Record<string, (e: Event) => void>;
  text: string;
}

export class TextLink extends Block<TextLinkProps, never> {
  constructor(props: TextLinkProps) {
    super('a', {
      ...props,
    });
  }

  public render() {
    return this.compile(template, { ...this.props });
  }

  protected init(): void {
    if (this.element) {
      this.element.setAttribute('href', '#');
    }
  }
}
