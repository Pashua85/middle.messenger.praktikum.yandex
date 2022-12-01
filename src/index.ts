import './styles';

import { MockPage } from './pages/mockPage/mockPage';
import { CustomButton } from './components/custom-button/custom-button';
import { FormInput } from './components/form-input/form-input';

function render(query: any, block: any) {
  const root = document.querySelector(query);

  root?.appendChild(block?.getContent());
  return root;
}

const button1 = new CustomButton({
  label: 'button1',
  events: {
    click: () => console.log('click1!'),
  },
});

const button2 = new CustomButton({
  label: 'button 2',
  events: {
    click: () => console.log('click2!'),
  },
});

const mock = new MockPage({ button1, button2 });

// app — это class дива в корне DOM
render('.app', mock);
