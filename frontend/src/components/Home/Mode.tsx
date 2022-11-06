import Card from "@/components/customs/Card";
import Chip from "@suid/material/Chip";
import Typography from "@suid/material/Typography";
import { mergeProps } from "solid-js";
import { Component } from "solid-js";

export type ModeCardProps = {
  title?: string;
  description?: string;
  architecture?: string;
  maxWidth?: string;
};

const ModeCard: Component<ModeCardProps> = (props) => {
  props = mergeProps(
    {
      title: "{title}",
      description: "{description}",
      architecture: "Local Machine",
      maxWidth: "100%",
    },
    props
  );

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: props.maxWidth,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: ".5rem",
        paddingTop: "3rem",
        paddingBottom: "3rem",
        cursor: "pointer",
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 800 }}>
        {props.title}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          textAlign: "center",
          fontFamily: "Poppins",
          maxWidth: "80%",
        }}
        color="#999"
      >
        {props.description}
      </Typography>
      <Chip
        label={props.architecture}
        sx={{
          marginTop: "1rem",
          fontWeight: "bold",
          padding: "1.5rem",
          borderRadius: "10000px",
          fontSize: "1rem",
        }}
      />
    </Card>
  );
};

export default ModeCard;
