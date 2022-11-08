import Card, { CardProps } from "@/components/customs/Card";
import { randomPick } from "@/utils/mitigate";
import Box from "@suid/material/Box";
import Chip from "@suid/material/Chip";
import Typography from "@suid/material/Typography";
import { mergeProps } from "solid-js";
import { Component } from "solid-js";
import {
  createEffect,
  createSignal,
  onCleanup,
  Show,
  JSXElement,
} from "solid-js";
import { splitProps } from "solid-js";
import BoxProps from "@suid/material/Box/BoxProps";
export type ModeCardProps = {
  title?: string;
  description?: string;
  architecture?: string;
  maxWidth?: string;
  selected?: boolean;
  exitDuration?: number;
  children?: JSXElement;
  boxProps?: BoxProps;
  onClose?: Function;
  backgroundUrl?: string;
} & CardProps;

const ModeCard: Component<ModeCardProps> = (props) => {
  const classes = [
    "tilt-in-fwd-tl",
    "tilt-in-fwd-tr",
    "tilt-in-fwd-bl",
    "tilt-in-fwd-br",
  ];

  const [chooseClass, setChooseClass] = createSignal(randomPick(classes));
  props = mergeProps(
    {
      title: "{title}",
      description: "{description}",
      architecture: "Local Machine",
      maxWidth: "100%",
      selected: false,
      exitDuration: 0,
      boxProps: {},
      onClose: () => {},
    },
    props
  );

  const [modeProps, rest] = splitProps(props, [
    "title",
    "description",
    "architecture",
    "maxWidth",
    "selected",
    "exitDuration",
    "boxProps",
    "backgroundUrl",
    "onClose",
  ]);

  const [visible, setVisible] = createSignal(modeProps.selected);

  createEffect(() => {
    if (modeProps.selected) {
      setChooseClass(randomPick(classes));
      setVisible(true);
    } else {
      const timer = setTimeout(() => {
        setVisible(false);
      }, modeProps.exitDuration);
      onCleanup(() => {
        clearTimeout(timer);
      });
    }
  });

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: modeProps.maxWidth,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: ".5rem",
        paddingTop: "3rem",
        paddingBottom: "3rem",
        position: "relative",
        backgroundImage: `url(${modeProps.backgroundUrl})`,
        backgroundSize: "cover",
        borderRadius: "1.8rem",
      }}
      {...rest}
    >
      <Typography variant="h3" sx={{ fontWeight: 800 }}>
        {modeProps.title}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          textAlign: "center",
          fontFamily: "Poppins",
          maxWidth: "80%",
        }}
        // color="#999"
      >
        {modeProps.description}
      </Typography>
      <Chip
        label={modeProps.architecture}
        sx={{
          marginTop: "1rem",
          fontWeight: "bold",
          padding: "1.5rem",
          borderRadius: "10000px",
          fontSize: "1rem",
          color: "#fff",
          backgroundColor: "rgba(0,0,0,0.9)",
        }}
      />
      {/* <Box sx={{ transform: "scale(1)" }}> */}
      <Show when={visible()}>
        <>
          <Box
            class={chooseClass()}
            {...modeProps.boxProps}
            sx={{
              position: "absolute",
              inset: 0,
              background: "#333",
              borderRadius: "1rem",
              border: "5px solid #333",
              ...modeProps.boxProps?.sx,
            }}
          >
            {props?.children}
          </Box>
        </>
      </Show>
      {/* </Box> */}
    </Card>
  );
};

export default ModeCard;
