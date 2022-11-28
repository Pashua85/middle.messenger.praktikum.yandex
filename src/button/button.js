import template from "./button.hbs";
import { Block } from "../block";

export class Button extends Block {
  constructor(props) {
    // Создаём враппер дом-элемент button
    super("button", props);
  }

  render() {
    // В проекте должен быть ваш собственный шаблонизатор
    return this.compile(template, { label: this.props.label });
  }
}
