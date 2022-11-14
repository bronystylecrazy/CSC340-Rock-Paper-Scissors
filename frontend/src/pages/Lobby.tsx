import LeadingButton from "@/components/LeadingButton";
import Box from "@suid/material/Box";
import Container from "@suid/material/Container";
import Typography from "@suid/material/Typography";
import { createSignal, createEffect, For, onMount, onCleanup } from "solid-js";
import { A, useNavigate, useParams } from "@solidjs/router";
import { Label } from "@/types/label";

export default function Lobby() {
  const constraints = {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    aspectRatio: { ideal: 1.7777777778 },
  };
  const params = useParams();

  const [round, setRound] = createSignal<string>("");
  const [rec, setRec] = createSignal<Label[]>([]);
  const [timer, setTimer] = createSignal(3);
  const [isFirstPlayerReady, setIsFirstPlayerReady] = createSignal(false);
  const [isSecondPlayerReady, setIsSecondPlayerReady] = createSignal(false);
  let timerInterval: any;
  let socketInterval: any;

  const navigate = useNavigate();

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
  const socket = new WebSocket("ws://localhost:8001");

  const timerFunction = () => {
    if (timer() === 0) {
      clearInterval(timerInterval);

      navigate(`/game/${round()}`);
    } else {
      setTimer(timer() - 1);
    }
  };
  const countdownTimer = () => {
    timerInterval = setInterval(timerFunction, 1000);
  };

  const resetTimer = () => {
    setTimer(3);
    clearInterval(timerInterval);
  };

  // detect, stop
  onMount(() => {
    socket.onopen = () => {
      socket.send("detect");
      socketInterval = setInterval(() => {
        socket.send("msg");
      }, 33.33);
    };

    openCamera();
    try {
      socket.addEventListener("message", (event) => {
        setRec(JSON.parse(event.data));
      });
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  });

  onCleanup(() => {
    socket.send("close");
    clearInterval(socketInterval);
    socket.close();
  });

  createEffect(() => {
    var left: Label[] = [];
    var right: Label[] = [];

    var temp = rec();
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].x + temp[i].width <= 640) {
        right.push(temp[i]);
      } else if (temp[i].x >= 640) {
        left.push(temp[i]);
      }
    }

    if (left.length > 0) {
      var resultL = left.filter((element) => {
        if (element.label === "scissors") {
          return true;
        }
      });

      if (resultL.length > 0) setIsFirstPlayerReady(true);
      else setIsFirstPlayerReady(false);
    } else {
      setIsFirstPlayerReady(false);
    }

    if (right.length > 0) {
      var resultR = right.filter((element) => {
        if (element.label === "scissors") {
          return true;
        }
      });

      if (resultR.length > 0) setIsSecondPlayerReady(true);
      else setIsSecondPlayerReady(false);
    } else {
      setIsSecondPlayerReady(false);
    }
  }, [rec]);

  createEffect(() => {
    if (isFirstPlayerReady() && isSecondPlayerReady()) {
      countdownTimer();
    } else {
      resetTimer();
    }
  }, [isFirstPlayerReady, isSecondPlayerReady]);

  createEffect(() => {
    if (params.round == "3") {
      setRound("2");
    } else if (params.round == "5") {
      setRound("3");
    } else if (params.round == "7") {
      setRound("4");
    } else if (params.round == "9") {
      setRound("5");
    } else {
      setRound(params.round);
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <LeadingButton backToPath="Home" path="/" />
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
          transform: "scaleX(-1)",
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
                  transform: "scaleX(-1)",
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
                  transform: "scaleX(-1)",
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
                transform: "scaleX(-1)",
              }}
              variant="h6"
            >
              Show your 'SCISSORS ✌🏻' gesture in front of your camera
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
                <Box
                  sx={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    transform: "scaleX(-1)",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      width: "130px",
                      height: "130px",
                      display:
                        isFirstPlayerReady() && isSecondPlayerReady()
                          ? "flex"
                          : "none",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <Typography variant="h2" sx={{ fontWeight: 500 }}>
                      {timer() === 0 ? "✌🏻" : timer()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                transform: "scaleX(-1)",
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
