import Box from "@suid/material/Box";
import BoxProps from "@suid/material/Box/BoxProps";
import {
  createSignal,
  splitProps,
  Component,
  mergeProps,
  createEffect,
} from "solid-js";
import { JSXElement } from "solid-js";

/** Define props' type for `ExampleLanding` component. */
export type ExampleLandingProps = {
  children?: JSXElement;
  title?: string;
} & BoxProps;

const ExampleLanding: Component<ExampleLandingProps> = (props) => {
  /** Define default value for each prop. */
  props = mergeProps({ title: "Example Landing" }, props);

  /** Split props for Box's and `ExampleLanding`'s. **/
  const [exampleLandingProps, rest] = splitProps(props, ["title", "children"]);

  /** Define our state names `count` */
  const [count, setCount] = createSignal(0);

  /** Watch effects of `count` */
  createEffect(() => {
    console.log(`Count is ${count()}`);
  });

  return (
    <Box {...rest}>
      <h1>{exampleLandingProps.title}</h1>
      {exampleLandingProps.children}
      <Box>
        <h4>
          Count: {count} or {count()}
        </h4>
        <p>
          <b>count</b> is called <b>Signal</b>.<br />
          It can get accessed by either <b>count</b> or <b>count()</b>.
        </p>
        <button onClick={() => setCount(count() + 1)}>Count: {count()}</button>
      </Box>
    </Box>
  );
};

export default ExampleLanding;
