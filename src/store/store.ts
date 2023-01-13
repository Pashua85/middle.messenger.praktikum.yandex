import { Block, EventBus } from '../core';
import { IChatInfo, IMessage, IUser } from '../interfaces';
import { AnyType, BlockInterface, SimpleObject } from '../types';
import { set } from '../utils';
import { WithRouterBlock } from '../types';
import { EStoreEvent } from '../enums';
import { ProfilePageBase } from '../pages/profilePage';

export interface IState {
  user: IUser;
  chats: IChatInfo[];
  messages: Record<number, IMessage[]>;
  // selectedChat?: number;
}

export class Store extends EventBus {
  private state: IState = {} as IState;

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(EStoreEvent.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.store = store;

export function withStore<SP>(mapStateToProps: (state: IState) => SP) {
  // TODO убрать any
  return function wrap<P>(Component: AnyType) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());
        super({ ...(props as P), ...previousState });

        store.on(EStoreEvent.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps } as SimpleObject);
        });
      }
    } as unknown as typeof Component;
  };
}

export default store;
