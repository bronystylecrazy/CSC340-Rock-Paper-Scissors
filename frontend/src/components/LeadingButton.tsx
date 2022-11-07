import { A } from "@solidjs/router";
import Box from "@suid/material/Box";
import Typography from "@suid/material/Typography";
import { FaSolidArrowLeft } from "solid-icons/fa";
import { Component } from "solid-js";

const LeadingButton: Component<{ backToPath: string; path: string }> = (
  props
) => {
  return (
    <Box
      sx={{
        // position: "fixed",
        width: "100%",
        height: "60px",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <A href={props.path} style={{ "text-decoration": "none" }}>
        <Box
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "start",
            color: "white",
          }}
        >
          <FaSolidArrowLeft size="24" />
          <Box mx={0.5} />
          <Typography>{props.backToPath}</Typography>
        </Box>
      </A>
    </Box>
  );
};

export default LeadingButton;
