import { EventBus } from '..';
import { nanoid } from 'nanoid';
import { BlockChildren, BlockInterface, SimpleObject } from '../../types';

type ValueOf<T> = T[keyof T];

export abstract class Block<
  TProps extends SimpleObject = SimpleObject,
  TChildren extends BlockInterface = BlockInterface,
> {
  private static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id = nanoid();

  public props: TProps;

  protected eventBus: () => EventBus;

  protected children: BlockChildren<TChildren> = {};

  private _meta: { tagName: string; props: TProps };

  private _element: HTMLElement | null = null;

  constructor(tagName = 'div', props: TProps, children: BlockChildren<TChildren> = {}) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    this.children = children;

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  public get element() {
    return this._element;
  }

  // TODO решить проблему с типизацией метода
  public setProps = (nextProps: SimpleObject) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props as TProps, nextProps);
  };

  public compile(
    template: (context: Record<string, unknown>) => string,
    context: Record<string, unknown>,
  ): DocumentFragment {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([key, component]) => {
      contextAndStubs[key] = `<div data-id="${component.id}"></div>`;
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    Object.entries(this.children).forEach(([key, component]) => {
      const stub = temp.content.querySelector(`[data-id='${component.id}']`);

      if (!stub) {
        return;
      }

      const content = component.getContent();

      if (content) {
        stub.replaceWith(content);
      }
    });

    return temp.content;
  }

  public getContent(): HTMLElement | null {
    return this.element;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  protected addChildren(children: BlockChildren<TChildren>) {
    Object.entries(children).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      }
    });
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected init() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected componentDidMount() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(_oldProps: unknown, _newProps: unknown) {
    return true;
  }

  // private _getChildrenAndProps(childrenAndProps: TProps & BlockChildren<TChildren>) {
  //   const props: TProps = {} as TProps;
  //   const children: BlockChildren<TChildren> = {} as BlockChildren<TChildren>;

  //   Object.entries(childrenAndProps).forEach(([key, value]) => {
  //     if (value instanceof Block) {
  //       children[key] = value;
  //     } else {
  //       props[key as keyof TProps] = value;
  //     }
  //   });

  //   return { props, children };
  // }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _addEvents() {
    const { events } = this.props as { events?: Record<string, EventListenerOrEventListenerObject> };

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.addEventListener(eventName, events[eventName]);
      });
    }
  }

  private _removeEvents() {
    const { events } = this.props as { events?: Record<string, EventListenerOrEventListenerObject> };

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.removeEventListener(eventName, events[eventName]);
      });
    }
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
    const classNames = this._meta.props['classNames' as keyof TProps];

    if (Array.isArray(classNames)) {
      this._element.classList.add(...classNames);
    }
  }

  private _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  private dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: unknown, newProps: unknown) {
    const newClassNames = (newProps as TProps).classNames;
    const oldClassNames = (oldProps as TProps).classNames;

    if (Array.isArray(newClassNames) && newClassNames !== oldClassNames) {
      if (Array.isArray(oldClassNames)) {
        this._element?.classList.remove(...oldClassNames);
      }
      this._element?.classList.add(...newClassNames);
    }

    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _render() {
    const block = this.render();

    this._removeEvents();
    if (this._element && this._meta.tagName !== 'input') {
      this._element.innerHTML = '';
    }

    if (block) {
      this._element?.append(block);
    }

    this._addEvents();
  }

  private _makePropsProxy(props: TProps): TProps {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value: unknown = target[prop as keyof TProps];
        return typeof value === 'function' ? value.bind(this) : value;
      },
      set(target, prop: string, value: ValueOf<TProps>) {
        const oldTarget = { ...target };
        target[prop as keyof TProps] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }
}
