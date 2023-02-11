import { EventBus } from '../core';
import { IMessage, IUser } from '../interfaces';
import { AnyType, ChatWithUsers, SimpleObject } from '../types';
import { set } from '../utils';
import { EStoreEvent } from '../enums';

export interface IState {
  user: IUser;
  chats: ChatWithUsers[];
  messages: Record<number, IMessage[]>;
  selectedChat?: number;
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
