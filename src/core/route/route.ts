import { SimpleObject } from '../../types';
import { Block } from '../block';

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  const content = block?.getContent();

  if (root && content) {
    root.appendChild(content);
  }
  return root;
}

export class Route {
  private block: Block | null = null;

  constructor(
    private pathname: string,
    private readonly BlockClass: typeof Block,
    private blockProps: SimpleObject,
    private readonly query: string,
  ) {}

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  public leave() {
    this.block = null;
  }

  public render() {
    if (!this.block) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.block = new this.BlockClass(this.blockProps);
      if (this.block) {
        render(this.query, this.block);
      }

      return;
    }
  }

  public match(pathname: string) {
    return pathname === this.pathname;
  }
}
