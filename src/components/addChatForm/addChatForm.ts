import { CHAT_TITLE_RULES } from '../../constants';
import { EInputType } from '../../enums';
import { CustomButton } from '../customButton';
import { Form } from '../form';
import { FormInput } from '../formInput';
import ChatsController from '../../controllers/chatsController';
import ModalController from '../../controllers/modalController';
import template from './addChatForm.hbs';
import './addChatForm.scss';

interface AddChatFormProps {
  classNames?: string[];
}

export class AddChatModal extends Form<AddChatFormProps, FormInput | CustomButton, FormInput> {
  constructor(props: AddChatFormProps) {
    const chatNameInput = new FormInput({
      label: 'Название чата',
      name: 'title',
      type: 'text',
      id: 'login',
      rules: CHAT_TITLE_RULES,
      componentType: EInputType.REGULAR,
    });

    const children = {
      chatNameInput,
      button: new CustomButton({
        label: 'Создать чат',
        events: {},
        type: 'submit',
      }),
    };

    super({ ...props, classNames: ['add-chat-form'] }, children, [chatNameInput]);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {});
  }

  protected async handleSubmit(formValues: Record<string, string>) {
    const title = formValues.title;
    const chatId = await ChatsController.create(title);

    if (chatId) {
      ChatsController.selectChat(chatId);
    }

    ModalController.close();
  }
}
