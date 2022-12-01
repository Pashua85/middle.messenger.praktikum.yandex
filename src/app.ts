import { Block } from './core';

export class App extends Block<never> {
  constructor(props: never) {
    super('div', props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {});
  }

  private handleBlur(event: any): void {
    console.log({ event });
  }
}
