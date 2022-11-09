import LeadingButton from "@/components/LeadingButton";
import Box from "@suid/material/Box";
import Container from "@suid/material/Container";
import Typography from "@suid/material/Typography";
import { createSignal, createEffect, For } from "solid-js";
import { A } from "@solidjs/router";
import { Label } from "@/types/label";

export default function Lobby() {
  const constraints = {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    aspectRatio: { ideal: 1.7777777778 },
  };
  const [rec, setRec] = createSignal<Label[]>([]);
  const socket = new WebSocket("ws://localhost:8001");
  socket.addEventListener("message", (event) => {
    setRec(JSON.parse(event.data));
  });

  const openCamera = async () => {
    var video: HTMLVideoElement = document.getElementById(
        "video"
      ) as HTMLVideoElement,
      vendorURL = window.URL || window.webkitURL;
    try {
      navigator.mediaDevices
        .getUserMedia({
          video: constraints,
        })
        .then((stream) => {
          video.srcObject = stream;
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.log(error);
    }
  };
  createEffect(() => {
    openCamera();
  }, []);

  const [timer, setTimer] = createSignal(3);
  const [isFirstPlayerReady, setIsFirstPlayerReady] = createSignal(false);
  const [isSecondPlayerReady, setIsSecondPlayerReady] = createSignal(true);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <LeadingButton backToPath="Home" path="/" />
        <A
          href="/game/local"
          style={{ "margin-right": "24px", color: "white" }}
        >
          Game
        </A>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <Typography sx={{ fontWeight: "bold", color: "#FA4141" }} variant="h5">
          Game will start in {timer()} second{timer() > 1 ? "s" : ""}
        </Typography>
      </Box>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 !important",
        }}
      >
        <video
          id="video"
          autoplay
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        ></video>
        <For each={rec()}>
          {(item) => (
            <>
              <Typography
                position="absolute"
                top={item.y * 0.9375 - 25}
                left={item.x * 0.9375}
                backgroundColor="rgba(255,255,255,0.5)"
                px={2}
                sx={{
                  color:
                    item.label == "rock"
                      ? "#FA4141"
                      : item.label == "paper"
                      ? "#557153"
                      : item.label == "scissors"
                      ? "#8D72E1"
                      : "#000000",
                }}
              >
                {item.label}
              </Typography>
              <Box
                sx={{
                  position: "absolute",
                  width: item.width * 0.9375,
                  height: item.height * 0.9375,
                  top: item.y * 0.9375,
                  left: item.x * 0.9375,
                  border: "3px solid",
                  borderColor:
                    item.label == "rock"
                      ? "#FA4141"
                      : item.label == "paper"
                      ? "#557153"
                      : item.label == "scissors"
                      ? "#8D72E1"
                      : "#000000",
                }}
              ></Box>
            </>
          )}
        </For>
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width: "100%",
            py: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bolder",
                mb: 2,
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                backgroundColor: "rgba(0,0,0,0.1)",
              }}
              variant="h6"
            >
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "rgba(255, 255, 255)",
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                <Typography variant="h6">
                  Player 1 :{" "}
                  <span
                    style={{
                      color: isFirstPlayerReady() ? "#1CB462" : "#FA4141",
                      "font-weight": "bolder",
                    }}
                  >
                    {isFirstPlayerReady() ? "Ready" : "Not Ready"}
                  </span>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "rgba(255, 255, 255)",
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                <Typography variant="h6">
                  Player 2 :{" "}
                  <span
                    style={{
                      color: isSecondPlayerReady() ? "#1CB462" : "#FA4141",
                      "font-weight": "bolder",
                    }}
                  >
                    {isSecondPlayerReady() ? "Ready" : "Not Ready"}
                  </span>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
