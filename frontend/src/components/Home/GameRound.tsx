import { Component, mergeProps } from "solid-js";
import Box from "@suid/material/Box";
import BoxProps from "@suid/material/Box/BoxProps";

export type GameProps = {
  round?: number;
  isSelected?: boolean;
} & BoxProps;

const GameRound: Component<GameProps> = (props) => {
  props = mergeProps({ round: 1, isSelected: false }, props);
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "100000px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: props.isSelected ? "primary" : "white",
        border: props.isSelected ? "5px solid white" : "5px solid transparent",
        background: props.isSelected
          ? `linear-gradient(to right,  #00dbde  0%, #fc00ff  100%)`
          : "",
        color: !props.isSelected ? "#333" : "white",
        padding: "1rem",
        width: "50px",
        height: "50px",
        cursor: "pointer",
      }}
      {...props}
    >
      <b style={{ position: "absolute" }}>{props.round}</b>
    </Box>
  );
};

export default GameRound;
