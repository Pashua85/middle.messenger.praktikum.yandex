import { Block } from '../../core';
import { Input } from '../input';
import template from './messageInput.hbs';
import './messageInput.scss';

interface MessageInputProps {
  classNames?: string[];
  onChange: (isValid: boolean) => void;
  name?: 'message';
}

export class MessageInput extends Block<MessageInputProps, Input> {
  private _value: number | string = '';

  constructor(props: MessageInputProps) {
    // TODO переделать на textarea
    const children = {
      input: new Input({
        type: 'text',
        name: 'message',
        classNames: ['message-input__field'],
        events: {
          input: (e: Event) => {
            this.handleChange(e);
          },
        },
        placeholder: 'Сообщение',
      }),
    };

    super(
      'div',
      {
        ...props,
        classNames: ['message-input'],
        name: 'message',
      },
      children,
    );
  }

  public get value(): number | string {
    return this._value;
  }

  public render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  public validate(): boolean {
    return !!this._value;
  }

  private handleChange(e: Event): void {
    this._value = (e.target as HTMLInputElement).value;

    this.props.onChange(this.validate());
  }
}
