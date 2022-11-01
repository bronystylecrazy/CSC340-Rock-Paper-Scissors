import { Component, JSXElement, mergeProps, splitProps } from "solid-js";

const Header: Component<{ name: string }> = (props) => {
  props = mergeProps(
    {
      name: "Heloooooooo",
    },
    props
  );

  const [headerProps, rest] = splitProps(props, ["name"], []);

  return <div {...rest}>{headerProps.name}</div>;
};

export default Header;
