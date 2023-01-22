import { EventListeners } from '../../types';

export class EventBus {
  private listeners: EventListeners = {};

  public on(event: string, callback: (...args: unknown[]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  public off(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  public emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      // throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event]?.forEach(function (listener) {
      // TODO решить ошибку с рест оператором
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      listener(...args);
    });
  }
}
