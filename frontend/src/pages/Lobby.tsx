import LeadingButton from "@/components/LeadingButton";
import Box from "@suid/material/Box";
import Container from "@suid/material/Container";
import Typography from "@suid/material/Typography";
import { createSignal, createEffect, For } from "solid-js";
import { A, useParams } from "@solidjs/router";
import { Label } from "@/types/label";

export default function Lobby() {
  const constraints = {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    aspectRatio: { ideal: 1.7777777778 },
  };
  const params = useParams();

  const [rec, setRec] = createSignal<Label[]>([]);
  const [timer, setTimer] = createSignal(3);
  const [isFirstPlayerReady, setIsFirstPlayerReady] = createSignal(false);
  const [isSecondPlayerReady, setIsSecondPlayerReady] = createSignal(false);
  let timerInterval: any;

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

  const timerFunction = () => {
    if (timer() === 0) {
      clearInterval(timerInterval);
    } else {
      setTimer(timer() - 1);
    }
  };
  const countdownTimer = () => {
    timerInterval = setInterval(timerFunction, 1000);
  };

  createEffect(() => {
    openCamera();
  }, []);
  createEffect(() => {
    if (rec().length > 0) {
      if (rec()[0].label == "scissors" && rec()[0].x <= 440) {
        setIsFirstPlayerReady(true);
      } else if (rec()[0].label == "scissors" && rec()[0].x > 640) {
        setIsSecondPlayerReady(true);
      }
    }
  }, [rec]);

  createEffect(() => {
    if (isFirstPlayerReady() && isSecondPlayerReady()) {
      countdownTimer();
    }
  }, [isFirstPlayerReady, isSecondPlayerReady]);

  console.log(params.round);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <LeadingButton backToPath="Home" path="/" />
      {/* <Button onClick={countdownTimer}>Press Me</Button> */}
      <A href="/game/local" style={{ color: "white", position: "absolute" }}>
        Game
      </A>

      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}
      >
        <Typography sx={{ fontWeight: "bold", color: "#FE7575" }} variant="h5">
          Game will start in {timer()} second{timer() > 1 ? "s" : ""}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <video
          id="video"
          autoplay
          style={{
            position: "relative",
            width: "1280px",
            height: "720px",
          }}
        ></video>
        <For each={rec()}>
          {(item) => (
            <>
              <Typography
                position="absolute"
                top={item.y - 25}
                left={item.x}
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
                  width: item.width,
                  height: item.height,
                  top: item.y,
                  left: item.x,
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
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white",
              }}
              variant="h6"
            >
              Show your 'SCISSORS' gesture in front of your camera
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
      </Box>
      <Typography color="white" mt={2}>
        *Hint: Place your hand horizontally*
      </Typography>
    </Box>
  );
}
