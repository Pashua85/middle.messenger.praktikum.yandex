import { Block } from '../../core';
import { BlockInterface, SimpleObject } from '../../types';
import ModalController from '../../controllers/modalController';
import template from './modal.hbs';
import './modal.scss';

interface ModalProps {
  classNames?: string[];
  events?: Record<string, (event: Event) => void>;
}

export class Modal extends Block<ModalProps, BlockInterface<SimpleObject>> {
  constructor(props: ModalProps) {
    super('div', {
      ...props,
      classNames: ['modal'],
      events: {
        click: (e: Event) => this.handleClick(e),
      },
    });
  }

  public setContent(component: Block) {
    this.setChildren({ content: component });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  private handleClick(e: Event) {
    if (!e.target) {
      return;
    }

    const contentElement = document.querySelector('.modal__content');

    const contains = contentElement?.contains(e.target as Node);

    if (!contains) {
      ModalController.close();
    }
  }
}
