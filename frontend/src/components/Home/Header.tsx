import Box from "@suid/material/Box";
import BoxProps from "@suid/material/Box/BoxProps";
import Button from "@suid/material/Button";
import { HiSolidCog } from "solid-icons/hi";
import { HiSolidVolumeUp } from "solid-icons/hi";
import { HiSolidQuestionMarkCircle } from "solid-icons/hi";
import {
  createSignal,
  splitProps,
  Component,
  mergeProps,
  createEffect,
} from "solid-js";
import { JSXElement } from "solid-js";
import Spacer from "../customs/Spacer";

/** Define props' type for `ExampleLanding` component. */
export type HomeHeaderProps = {
  children?: JSXElement;
  title?: string;
  setCredit: (value: boolean) => void;
} & BoxProps;

/**
 * https://solid-icons.vercel.app/
 */
const HomeHeader: Component<HomeHeaderProps> = (props) => {
  /** Define default value for each prop. */
  props = mergeProps({ title: "Example Landing" }, props);

  /** Split props for Box's and `ExampleLanding`'s. **/
  const [headerProps, rest] = splitProps(props, ["title", "children"]);

  function handleSearch() {
    open(
      "https://www.canva.com/design/DAFSZCgsbk0/lWPtrZdKTkrBlTZOoB9Ljg/view?utm_content=DAFSZCgsbk0&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink",
      "_blank"
    );
  }

  return (
    <Box
      sx={{
        position: "fixed",
        left: ".5rem",
        right: ".5rem",
        top: ".5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: ".5rem",
      }}
      {...rest}
    >
      <Button
        variant="contained"
        color="info"
        class="animate__animated animate__bounceInDown"
        sx={{ animationDelay: ".25s" }}
        onClick={handleSearch}
      >
        <HiSolidQuestionMarkCircle size="32" />
      </Button>
      <Spacer />
      {/* <Button
        variant="contained"
        color="success"
        sx={{ background: "#666", "&:hover": { background: "#555" } }}
      >
        <HiSolidVolumeUp size="32" />
      </Button> */}
      <Button
        variant="contained"
        class="animate__animated animate__bounceInDown"
        sx={{
          background: "#666",
          "&:hover": { background: "#555" },
          animationDelay: ".25s",
        }}
        onClick={() => props.setCredit(true)}
      >
        <HiSolidCog size="32" />
      </Button>
    </Box>
  );
};

export default HomeHeader;
