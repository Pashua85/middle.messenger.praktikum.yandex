import { Modal } from '../components/modal';

export class ModalController {
  private appElement: Element | null = null;
  private modal: Modal | null = null;

  constructor(private readonly appQuery: string, private readonly modalQuery: string) {
    this.appElement = document.querySelector(this.appQuery);

    document.addEventListener('keydown', (e: Event) => {
      this.handleKeydown(e as KeyboardEvent);
    });
  }

  public open() {
    this.close();

    this.modal = new Modal({});

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
  }

  private handleKeydown(e: KeyboardEvent) {
    if (!this.modal) return;

    if (e.key === 'Escape') {
      this.close();
    }
  }
}

export default new ModalController('.app', '.modal');
