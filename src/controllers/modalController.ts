import { Modal } from '../components/modal';
import { Block } from '../core';

export class ModalController {
  private appElement: Element | null = null;
  private modal: Modal | null = null;
  private onClose: null | undefined | (() => void) = null;

  constructor(private readonly appQuery: string, private readonly modalQuery: string) {
    this.appElement = document.querySelector(this.appQuery);

    document.addEventListener('keydown', (e: Event) => {
      this.handleKeydown(e as KeyboardEvent);
    });
  }

  public open(component: Block, onClose?: () => void) {
    this.close();
    this.onClose = onClose;

    this.modal = new Modal({});
    this.modal.setContent(component);

    const content = this.modal.getContent();

    if (this.appElement && content) {
      this.appElement.appendChild(content);
    }
  }

  public close() {
    this.modal = null;
    const oldModal = this.appElement?.querySelector(this.modalQuery);

    if (oldModal) {
      this.appElement?.removeChild(oldModal);
    }

    this.onClose?.();
  }

  private handleKeydown(e: KeyboardEvent) {
    if (!this.modal) return;

    if (e.key === 'Escape') {
      this.close();
    }
  }
}

export default new ModalController('.app', '.modal');
