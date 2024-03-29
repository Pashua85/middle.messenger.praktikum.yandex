import { Block } from '../../core';
import { BlockChildren, BlockInterface, SimpleObject } from '../../types';

export abstract class Form<
  TProps extends SimpleObject = SimpleObject,
  TChildren extends BlockInterface = BlockInterface,
  TFields extends BlockInterface & { validate: () => boolean; value: number | string } = BlockInterface & {
    validate: () => true;
    value: '';
  },
> extends Block<TProps, TChildren> {
  constructor(props: TProps, children: BlockChildren<TChildren> = {}, private fields: TFields[]) {
    super(
      'form',
      {
        ...props,
        events: {
          ...props.events,
          submit: (e: SubmitEvent) => {
            e.preventDefault();
            this._handleSubmit();
          },
        },
      },
      children,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  protected handleSubmit(_formValues: Record<string, string>): void {}

  protected enableForm(): void {
    this.fields.forEach((item) => (item as Block).setProps({ disabled: false }));
  }

  protected disableForm(): void {
    this.fields.forEach((item) => (item as Block).setProps({ disabled: true }));
  }

  private _handleSubmit(): void {
    if (this.validateForm()) {
      this.handleSubmit(this.getFormValues());
    }
  }

  private validateForm(): boolean {
    let isValid = true;
    for (const field of this.fields) {
      if (!field.validate()) {
        isValid = false;
      }
    }
    return isValid;
  }

  private getFormValues(): Record<string, string> {
    const result: Record<string, string> = {};

    this.fields.forEach((item) => {
      result[(item as Block).props.name] = String(item.value);
    });

    return result;
  }
}
