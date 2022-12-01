import template from './mockPage.hbs';
import { Block } from '../../core';
import { CustomButton } from '../../components/custom-button/custom-button';

interface MockPageProps {
  button1: CustomButton;
  button2: CustomButton;
}

export class MockPage extends Block<MockPageProps, CustomButton> {
  constructor(props: MockPageProps) {
    const children = {
      button1: new CustomButton({
        label: 'button1',
        events: {
          click: () => console.log('click1!'),
        },
      }),
      button2: new CustomButton({
        label: 'button2',
        events: {
          click: () => console.log('click2!'),
        },
      }),
    };
    super('div', props, children);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
