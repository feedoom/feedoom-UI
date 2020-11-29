import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "./button";

const defaultButton = () => (
  <Button onClick={action("clicked")}>default button</Button>
);

const buttonWithSize = () => (
  <>
    <Button size="lg">large button</Button>
    <Button size="sm">small button</Button>
  </>
);

const buttonWithType = () => (
  <>
    <Button btnType="primary">primary button</Button>
    <Button btnType="danger">danger button</Button>
    <Button btnType="link" href="https://www.baidu.com">
      link button
    </Button>
  </>
);

storiesOf("Button Component", module)
  .addParameters({
    info: {
      inline: true,
      text: `
        按钮元素
        ~~~js
        import {Button} from feedoom-ui
        ~~~
        `,
    },
  })
  .add("默认 Button", defaultButton)
  .add("不同尺寸的 Button", buttonWithSize)
  .add("不同类型的 Button", buttonWithType);
