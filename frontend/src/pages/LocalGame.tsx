import LeadingButton from "@/components/LeadingButton";
import Box from "@suid/material/Box";
import Container from "@suid/material/Container";
import Typography from "@suid/material/Typography";
import CircleIcon from "@suid/icons-material/Circle";
import CircleOutlinedIcon from "@suid/icons-material/CircleOutlined";
import Checkbox from "@suid/material/Checkbox";
import { createEffect, createSignal, For, onMount } from "solid-js";
import { Label } from "@/types/label";
import Button from "@suid/material/Button";
import { A, useParams } from "@solidjs/router";
import { FaSolidArrowRight } from "solid-icons/fa";

const LocalGame = () => {
  const constraints = {
    width: { min: 640, ideal: 1280 },
    height: { min: 400, ideal: 720 },
    aspectRatio: { ideal: 1.7777777778 },
  };
  const [rec, setRec] = createSignal<Label[]>([]);
  const [gameFinish, setGameFinish] = createSignal(false);

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
  onMount(() => {
    console.log("onMount");
    openCamera();
    const socket = new WebSocket("ws://localhost:8001");
    socket.addEventListener("message", (event) => {
      setRec(JSON.parse(event.data));
    });
  });

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
        }}
      >
        <LeadingButton backToPath="Home" path="/" />
        <Box
          sx={{
            width: "100%",
            height: "60px",
            padding: "1rem",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <A href="/summary" style={{ "text-decoration": "none" }}>
            <Box
              sx={{
                display: "flex",
                height: "100%",
                alignItems: "center",
                justifyContent: "start",
                color: "white",
              }}
            >
              <Typography>Summary</Typography>
              <Box mx={0.5} />
              <FaSolidArrowRight size="16" />
            </Box>
          </A>
        </Box>
      </Box>
      <Button
        onClick={() => {
          setGameFinish(!gameFinish());
        }}
        sx={{
          position: "absolute",
        }}
      >
        Finish
      </Button>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "10px",
          marginBottom: "20px",
          px: "5rem",
        }}
      >
        <Typography sx={{ fontWeight: 500, color: "#fff" }} variant="h6">
          Player 1
        </Typography>
        <Typography sx={{ fontWeight: "bold", color: "#fff" }} variant="h5">
          Best of 3
        </Typography>
        <Typography sx={{ fontWeight: 500, color: "#fff" }} variant="h6">
          Player 2
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
            width: "1280px",
            height: "720px",
          }}
        ></video>
        {gameFinish() && (
          <Box
            sx={{
              position: "absolute",
              width: "1280px",
              height: "720px",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              transform: "scaleX(-1)",
            }}
          >
            <Typography color="white" variant="h3" fontWeight={500}>
              Player 1 Won
            </Typography>
            <Typography mt={3} color="white" variant="h1" fontWeight={500}>
              3 : 2
            </Typography>
          </Box>
        )}
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
            zIndex: 1,
            mt: 2,
            transform: "scaleX(-1)",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              px={2}
              sx={{
                backgroundColor: "white",
                borderTopLeftRadius: "4px",
                borderBottomLeftRadius: "4px",
              }}
            >
              <Checkbox
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CircleIcon />}
                sx={{
                  "&.Mui-checked": {
                    color: "#38C149",
                  },
                }}
              />
              <Checkbox
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CircleIcon />}
                sx={{
                  "&.Mui-checked": {
                    color: "#38C149",
                  },
                }}
              />
              <Checkbox
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CircleIcon />}
                sx={{
                  "&.Mui-checked": {
                    color: "#959292",
                  },
                }}
              />
            </Box>
            <Typography
              fontWeight="bold"
              variant="h5"
              color="white"
              backgroundColor="rgba(0, 0, 0, 0.85)"
              px={3}
              py={2}
              borderRadius={1}
            >
              0
            </Typography>
            <Typography
              fontWeight="bold"
              variant="h6"
              px={2}
              py={0.5}
              mx={2}
              borderRadius={1}
              color="white"
              backgroundColor="rgba(0, 0, 0, 0.3)"
            >
              Round 1
            </Typography>
            <Typography
              fontWeight="bold"
              variant="h5"
              color="white"
              backgroundColor="rgba(0, 0, 0, 0.85)"
              px={3}
              py={2}
              borderRadius={1}
            >
              0
            </Typography>
            <Box
              px={2}
              sx={{
                backgroundColor: "white",
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
              }}
            >
              <Checkbox
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CircleIcon />}
              />
              <Checkbox
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CircleIcon />}
              />
              <Checkbox
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CircleIcon />}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            height: "80%",
            borderLeftStyle: "dotted",
            mt: 12,
            width: "1px",
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default LocalGame;
