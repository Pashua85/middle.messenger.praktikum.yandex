import { EContextMenu } from '../../enums';
import { IState, withStore } from '../../store/store';
import { ContextMenu } from '../contextMenu';
import { CustomButton } from '../customButton';
import { Form } from '../form';
import { MenuOption } from '../menuOption';
import { MessageInput } from '../messageInput';
import template from './messageForm.hbs';
import MessagesController from '../../controllers/messagesController';
import './messageForm.scss';

interface MessageFormProps {
  classNames?: string[];
  selectedChat?: number;
}

export class MessageFormBase extends Form<MessageFormProps, MessageInput | ContextMenu | CustomButton, MessageInput> {
  private isValid = false;

  constructor(props: MessageFormProps) {
    const messageInput = new MessageInput({ onChange: (isValid) => this.handleChange(isValid) });

    const children = {
      contextMenu: new ContextMenu(
        { type: EContextMenu.MESSAGE_FORM, open: false },
        {
          option1: new MenuOption({
            label: 'Фото и видео',
            events: {
              click: () => console.log('photo click'),
            },
          }),
          option2: new MenuOption({
            label: 'Файл',
            events: {
              click: () => console.log('file click'),
            },
          }),
          option3: new MenuOption({
            label: 'Локация',
            events: {
              click: () => console.log('location click'),
            },
          }),
        },
      ),
      messageInput,
      button: new CustomButton({
        label: '',
        type: 'submit',
        classNames: ['message-form__button'],
        events: {},
        disabled: true,
      }),
    };

    super(
      {
        ...props,
        classNames: ['message-form'],
      },
      children,
      [messageInput],
    );
  }

  public render() {
    return this.compile(template, { ...this.props });
  }

  protected handleSubmit(formValues: Record<string, string>): void {
    if (this.props.selectedChat && formValues.message) {
      console.log({ formValues, selectedChat: this.props.selectedChat });
      MessagesController.sendMessage(this.props.selectedChat, formValues.message);
    }
  }

  private handleChange(isValid: boolean) {
    if (this.isValid !== isValid) {
      this.isValid = isValid;
      if (this.isValid) {
        this.children.button.setProps({ disabled: false });
      } else {
        this.children.button.setProps({ disabled: true });
      }
    }
  }
}

const mapStateToProps = (state: IState) => {
  return {
    selectedChat: state.selectedChat,
  };
};

export const MessageForm = withStore(mapStateToProps)(MessageFormBase);
