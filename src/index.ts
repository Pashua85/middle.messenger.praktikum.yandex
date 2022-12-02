import './styles';

import { MockPage } from './pages/mockPage/mockPage';
import { CustomButton } from './components/customButton/customButton';
import { FormInput } from './components/formInput/formInput';
import './helpers.js';
import { Block } from './core';
import { App } from './app';
import { EPage } from './enums';

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  const content = block?.getContent();

  if (root && content) {
    root.appendChild(content);
  }
  return root;
}

const mock = new MockPage({} as never);

const app = new App({ page: EPage.SIGN_IN });

// app — это class дива в корне DOM
render('.app', app);
