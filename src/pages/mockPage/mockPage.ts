import template from './mockPage.hbs';
import { Block } from '../../core';
import { CustomButton } from '../../components/customButton/customButton';
import { Input } from '../../components/input/input';

interface MockPageProps {
  button1: CustomButton;
  button2: CustomButton;
}

export class MockPage extends Block<any, CustomButton | Input> {
  constructor(props: never) {
    const children = {
      // input: new Input({
      //   classNames: ['someInput'],
      //   events: {
      //     blur: (event) => this.handleBlur(event),
      //   },
      // }),
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
    return this.compile(template, { flag: this.props.flag });
  }
}
