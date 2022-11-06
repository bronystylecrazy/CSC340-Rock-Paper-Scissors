import Box from "@suid/material/Box";
import BoxProps from "@suid/material/Box/BoxProps";
import { Component, mergeProps, splitProps } from "solid-js";

export type CardProps = {} & BoxProps;

const Card: Component<CardProps> = (props) => {
  props = mergeProps({}, props);
  const [cardProps, rest] = splitProps(props, []);

  return (
    <Box
      {...rest}
      sx={{
        background: "rgba(255,255,255)",
        borderRadius: "1rem",
        padding: "1.5rem",
        boxSizing: "border-box",
        ...rest.sx,
      }}
    >
      {props.children}
    </Box>
  );
};

export default Card;
