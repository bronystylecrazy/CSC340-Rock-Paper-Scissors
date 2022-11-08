import LeadingButton from "@/components/LeadingButton";
import Box from "@suid/material/Box";
import Container from "@suid/material/Container";
import Typography from "@suid/material/Typography";
import CircleIcon from "@suid/icons-material/Circle";
import CircleOutlinedIcon from "@suid/icons-material/CircleOutlined";
import Checkbox from "@suid/material/Checkbox";
import { createEffect } from "solid-js";

const LocalGame = () => {
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
