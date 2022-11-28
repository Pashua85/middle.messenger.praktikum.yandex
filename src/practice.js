import { Button } from "./button/button";
import { HomePage } from "./homepage/homepage";

function render(query, block) {
  const root = document.querySelector(query);
  root?.appendChild(block.getContent());
  return root;
}

const button = new Button({
  label: "hey, click me!",
  events: {
    click: () => console.log("click!"),
  },
});

const page = new HomePage({ button });

// app — это class дива в корне DOM
render(".app", page);
