import React, { forwardRef, ReactNode, CSSProperties } from "react";
import { Card } from "antd";
import cx from "classnames";

export const CenteredContainer = forwardRef((props, ref) => {
  return (
    <Card
      innerRef={ref}
      // className={cx(["w-100 overflow-hidden flex-shrink-0", props.tooManyItems ? "my-3" : "my-auto", props.className])}
      style={props.style}
    >
      {props.children}
    </Card>
  );
});
