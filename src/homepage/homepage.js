import { Button } from "../button/button";
import template from "./homepage.hbs";
import { Block } from "../block";

export class HomePage extends Block {
  constructor(props) {
    super("div", props);
  }

  render() {
    return this.compile(template, { button: this.props.button });
  }
}
