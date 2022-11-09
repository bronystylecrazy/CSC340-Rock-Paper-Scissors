import LeadingButton from "@/components/LeadingButton";
import Box from "@suid/material/Box";
import Container from "@suid/material/Container";
import Typography from "@suid/material/Typography";
import CircleIcon from "@suid/icons-material/Circle";
import CircleOutlinedIcon from "@suid/icons-material/CircleOutlined";
import Checkbox from "@suid/material/Checkbox";
import { createEffect, createSignal, For } from "solid-js";
import { Label } from "@/types/label";

const LocalGame = () => {
  const constraints = {
    width: { min: 640, ideal: 1280 },
    height: { min: 400, ideal: 720 },
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <LeadingButton backToPath="Home" path="/" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0",
          px: "9rem",
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
            zIndex: 1,
            mt: 2,
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
                    color: "#959292",
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
      </Container>
    </Box>
  );
};

export default LocalGame;
