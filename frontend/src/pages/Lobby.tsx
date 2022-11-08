import LeadingButton from "@/components/LeadingButton";
import Box from "@suid/material/Box";
import Button from "@suid/material/Button";
import Container from "@suid/material/Container";
import Typography from "@suid/material/Typography";
import { createSignal, createEffect } from "solid-js";
import { A } from "@solidjs/router";

export default function Lobby() {
  const constraints = {
    width: { min: 640, ideal: 1280 },
    height: { min: 400, ideal: 720 },
    aspectRatio: { ideal: 1.7777777778 },
  };

  const openCamera = async () => {
    var video: HTMLVideoElement = document.getElementById(
        "video"
      ) as HTMLVideoElement,
      vendorURL = window.URL || window.webkitURL;
    try {
      navigator.mediaDevices
        .getUserMedia({
          video: constraints,
          audio: {
            sampleSize: 16,
            channelCount: 2,
          },
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
      <LeadingButton backToPath="Home" path="/" />
      <Box sx={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <Typography sx={{ fontWeight: "bold", color: "#FA4141" }} variant="h5">
          <A href="/game/local">
            Game will start in {timer()} second{timer() > 1 ? "s" : ""}
          </A>
        </Typography>
      </Box>
      <Container
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <video
          id="video"
          autoplay
          style={{
            width: "100%",
            height: "100%",
          }}
        ></video>
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
