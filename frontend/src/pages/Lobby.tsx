import LeadingButton from "@/components/LeadingButton";
import Box from "@suid/material/Box";
import Container from "@suid/material/Container";
import Typography from "@suid/material/Typography";
import { createSignal } from "solid-js";

export default function Lobby() {
  const [timer, setTimer] = createSignal(2);
  const [isFirstPlayerReady, setIsFirstPlayerReady] = createSignal(false);
  const [isSecondPlayerReady, setIsSecondPlayerReady] = createSignal(true);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <LeadingButton backToPath="Home" path="/" />
      <Box sx={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <Typography sx={{ fontWeight: "bold", color: "#FE7575" }} variant="h5">
          Game will start in {timer()} second{timer() > 1 ? "s" : ""}
        </Typography>
      </Box>
      <Container
        sx={{
          width: "100%",
          height: "calc(100vh - 200px)",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Typography sx={{ fontWeight: "bolder" }} variant="h6">
            Show your scissors gesture in front of your camera
          </Typography>
          <Box sx={{ height: "85%", width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  height: "100%",
                  borderLeftStyle: "dotted",
                  width: "1px",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6">
                Player 1 :{" "}
                <span
                  style={{
                    color: isFirstPlayerReady() ? "green" : "red",
                    "font-weight": "bolder",
                  }}
                >
                  {isFirstPlayerReady() ? "Ready" : "Not Ready"}
                </span>
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                Player 2 :{" "}
                <span
                  style={{
                    color: isSecondPlayerReady() ? "green" : "red",
                    "font-weight": "bolder",
                  }}
                >
                  {isSecondPlayerReady() ? "Ready" : "Not Ready"}
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
