import './styles';

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

const app = new App({ page: EPage.SIGN_IN });

render('.app', app);
