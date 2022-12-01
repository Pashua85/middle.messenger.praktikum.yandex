import './styles';

import { MockPage } from './pages/mockPage/mockPage';
import { CustomButton } from './components/custom-button/custom-button';
import { FormInput } from './components/form-input/form-input';
import './helpers.js';

function render(query: any, block: any) {
  const root = document.querySelector(query);

  root?.appendChild(block?.getContent());
  return root;
}

const mock = new MockPage({} as never);

// app — это class дива в корне DOM
render('.app', mock);
