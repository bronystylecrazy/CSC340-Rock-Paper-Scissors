import { Component } from "solid-js";
import Box from "@suid/material/Box";
import ExampleLanding from "@/components/Example/Landing";
import Container from "@suid/material/Container";

export type ExampleProps = { title: string };

const Example: Component<ExampleProps> = (props) => {
  return (
    <Container>
      <ExampleLanding title={props.title} />
    </Container>
  );
};

export default Example;
