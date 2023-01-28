import { Block } from '../../core';
import template from './avatar.hbs';
import './avatar.scss';

interface AvatarProps {
  classNames: string[];
  events?: Record<string, (event: PointerEvent) => void>;
  avatar?: string;
}

export class Avatar extends Block<AvatarProps, never> {
  constructor(props: AvatarProps) {
    super('div', { ...props, classNames: [...props.classNames, 'avatar'] });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
