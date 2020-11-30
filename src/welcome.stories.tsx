import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Welcome page", module).add(
  "welcome",
  () => {
    return (
      <>
        <h1>欢迎来到 feedoom-UI 组件库</h1>
        <p>
          这是一套用 typescript 和 react hook
          编写的一套学习组件库，从零到一学习组件开发
        </p>
        <h3>安装试试</h3>
        <code>npm install feedoom-ui --save</code>
      </>
    );
  },
  { info: { disable: true } }
);
