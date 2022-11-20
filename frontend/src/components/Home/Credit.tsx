import Box from "@suid/material/Box";
import Button from "@suid/material/Button";
import { Component, Show } from "solid-js";

export type CreditProps = {
  show: boolean;
  setCredit: (value: boolean) => void;
};

const Credit: Component<CreditProps> = (props) => {
  return (
    <Show when={props.show}>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.7)",
          zIndex: 3000,
        }}
        onClick={() => props.setCredit(false)}
      />
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 3001,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            background: "white",
            padding: 4,
            borderRadius: 4,
          }}
          class="roll-in-left animate__animated animate__faster"
        >
          <Box sx={{ fontSize: "2rem", fontWeight: "bold" }}>
            Creator of HolyRPS
          </Box>
          <Box sx={{ fontSize: "1rem", fontWeight: "bold" }}>DEVELOPERS</Box>
          <Box sx={{ fontSize: "1rem", fontWeight: 400 }}>
            Jirasin Jarethammajit - Dataset/Programmer
          </Box>
          <Box sx={{ fontSize: "1rem", fontWeight: 400 }}>
            Apisit Maneerat - Dataset/Tester/Programmer
          </Box>
          <Box sx={{ fontSize: "1rem", fontWeight: 400 }}>
            Kasemtan Tevasirchokchai - Dataset/Data Optimizer/Programmer
          </Box>
          <Box sx={{ fontSize: "1rem", fontWeight: 400 }}>
            Sirawit Pratoomsuwan - UX/UI Developer/Programmer
          </Box>
          <Box sx={{ fontSize: "1rem", fontWeight: "bold" }}>TOOLS</Box>
          <Box sx={{ fontSize: "1rem", fontWeight: 400 }}>
            Pytorch/YOLOv5 - Object Detection
          </Box>
          <Box sx={{ fontSize: "1rem", fontWeight: 400 }}>
            SolidJS - Frontend
          </Box>
          <Box sx={{ fontSize: "1rem", fontWeight: 400 }}>
            SUID - UI Library
          </Box>
          <Box sx={{ fontSize: "1rem", fontWeight: "bold" }}>MORE</Box>
          <Box sx={{ fontSize: "1rem", fontWeight: 400 }}>
            Contribute HolyRPS on
            <a
              style={{ "margin-left": "4px" }}
              href="https://github.com/bronystylecrazy/CSC340-Rock-Paper-Scissors"
            >
              Github
            </a>{" "}
            !
          </Box>
          <Button
            variant="contained"
            size="large"
            sx={{ borderRadius: "10000px", marginTop: "1rem" }}
            onClick={() => props.setCredit(false)}
          >
            Thanks, I got it now!
          </Button>
        </Box>
      </Box>
    </Show>
  );
};

export default Credit;
