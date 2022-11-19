import LeadingButton from "@/components/LeadingButton";
import Box from "@suid/material/Box";
import Typography from "@suid/material/Typography";
import { createEffect, createSignal, For, onCleanup, onMount } from "solid-js";
import { Label } from "@/types/label";
import { A, useNavigate, useParams } from "@solidjs/router";
import { FaSolidArrowRight } from "solid-icons/fa";
import { GameResults } from "@/types/game";
import { RPSCheck, RPSMessage } from "@/utils/rpsLogic";

const LocalGame = () => {
  const constraints = {
    width: { min: 640, ideal: 1280 },
    height: { min: 400, ideal: 720 },
    aspectRatio: { ideal: 1.7777777778 },
  };
  const navigate = useNavigate();
  const params = useParams();
  const [rec, setRec] = createSignal<Label[]>([]);
  const [gameFinish, setGameFinish] = createSignal(false);
  const [timer, setTimer] = createSignal<number>(7);
  const [nextRoundTimer, setNextRoundTimer] = createSignal<number>(3);
  const [firstPlayerState, setFirstPlayerState] = createSignal<string>("");
  const [currentRound, setCurrentRound] = createSignal<number>(1);
  const [currentRoundResult, setCurrentRoundResult] = createSignal<string>("");
  const [secondPlayerState, setSecondPlayerState] = createSignal<string>("");
  const [playerScore, setPlayerScore] = createSignal<{
    firstPlayer: number;
    secondPlayer: number;
  }>({
    firstPlayer: 0,
    secondPlayer: 0,
  });
  const [gameResult, setGameResult] = createSignal<GameResults>({
    rounds: parseInt(params.round),
    nameWon: "",
    results: [],
  });
  const [playerOneScoreBoard, setPlayerOneScoreBoard] = createSignal<boolean[]>(
    new Array(Number(params.round)).fill(false)
  );
  const [playerTwoScoreBoard, setPlayerTwoScoreBoard] = createSignal<boolean[]>(
    new Array(Number(params.round)).fill(false)
  );
  const [playerOneScoreCounter, setPlayerOneScoreCounter] =
    createSignal<number>(0);
  const [playerTwoScoreCounter, setPlayerTwoScoreCounter] =
    createSignal<number>(0);

  let socketInterval: any;
  let timerInterval: any;

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
  let socket = new WebSocket("ws://localhost:8001");

  onMount(() => {
    socket.onopen = () => {
      socket.send("detect");
      socketInterval = setInterval(() => {
        try {
          socket.send("msg");
          console.log("sent");
        } catch (error) {
          console.log("error in socket");
          console.log(error);

          socket = new WebSocket("ws://localhost:8001");
          console.log("reconnect", error);
        }
      }, 50);
    };
    openCamera();

    socket.addEventListener("message", (event) => {
      setRec(JSON.parse(event.data));
    });
    setPlayerScore({
      firstPlayer:
        gameResult().results.filter((item) => item.firstPlayer.result == "win")
          .length ?? 0,
      secondPlayer:
        gameResult().results.filter((item) => item.secondPlayer.result == "win")
          .length ?? 0,
    });
  });

  onCleanup(() => {
    console.log("This end now");
    socket.send("close");
    clearInterval(socketInterval);
    var video: HTMLVideoElement = document.getElementById(
        "video"
      ) as HTMLVideoElement,
      vendorURL = window.URL || window.webkitURL;
    try {
      navigator.mediaDevices
        .getUserMedia({
          video: {},
        })
        .then((stream) => {
          video.srcObject = stream;
          stream.getVideoTracks()[0].stop();
          video.src = "";
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.log(error);
    }
  });

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

  const resetTimer = () => {
    setTimer(3);
    clearInterval(timerInterval);
  };

  const updatePlayerOneScore = (index: number) => {
    var temp1 = playerOneScoreBoard();
    setPlayerOneScoreBoard(temp1.map((item, i) => (i === index ? true : item)));
  };
  const updatePlayerTwoScore = (index: number) => {
    var temp2 = playerTwoScoreBoard();
    setPlayerTwoScoreBoard(temp2.map((item, i) => (i === index ? true : item)));
  };

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
      setFirstPlayerState(left[left.length - 1].label);
    } else {
      setFirstPlayerState("");
    }

    if (right.length > 0) {
      setSecondPlayerState(right[right.length - 1].label);
    } else {
      setSecondPlayerState("");
    }
  }, [rec]);

  createEffect(() => {
    if (
      firstPlayerState() !== "" &&
      secondPlayerState() !== "" &&
      timer() === 0
    ) {
      const tFirstPlayer = firstPlayerState();
      const tSecondPlayer = secondPlayerState();
      const result = RPSCheck(tFirstPlayer, tSecondPlayer);
      setCurrentRoundResult(RPSMessage(result));
      if (result !== "tie") {
        setGameResult((prev) => {
          prev.results.push({
            round: gameResult().results.length + 1,
            firstPlayer: {
              label: tFirstPlayer,
              result: result,
            },
            secondPlayer: {
              label: tSecondPlayer,
              result:
                result === "win" ? "lose" : result === "lose" ? "win" : "tie",
            },
          });
          return prev;
        });
        setPlayerScore({
          firstPlayer:
            gameResult().results.filter(
              (item) => item.firstPlayer.result == "win"
            ).length ?? 0,
          secondPlayer:
            gameResult().results.filter(
              (item) => item.secondPlayer.result == "win"
            ).length ?? 0,
        });
        if (result === "win") {
          setPlayerOneScoreCounter(playerOneScoreCounter() + 1);
          updatePlayerOneScore(playerOneScoreCounter() - 1);
        } else {
          setPlayerTwoScoreCounter(playerTwoScoreCounter() + 1);
          updatePlayerTwoScore(playerTwoScoreCounter() - 1);
        }
        setCurrentRound(currentRound() + 1);
      }
      resetTimer();
      setGameFinish(true);
    }
  }, [timer]);

  createEffect(() => {
    countdownTimer();
  }, []);

  createEffect(() => {
    if (gameFinish()) {
      resetTimer();
      const nextRoundTimerInterval = setInterval(() => {
        if (nextRoundTimer() === 0) {
          clearInterval(nextRoundTimerInterval);
          setNextRoundTimer(3);
          console.log("1", playerScore().firstPlayer);
          console.log("2", playerScore().secondPlayer);

          if (
            playerScore().firstPlayer === parseInt(params.round) ||
            playerScore().secondPlayer === parseInt(params.round)
          ) {
            console.log("Game finished");

            setGameResult((prev) => {
              prev.nameWon =
                playerScore().firstPlayer === parseInt(params.round)
                  ? "Player 1"
                  : "Player 2";
              return prev;
            });
            navigate("/summary", {
              replace: true,
              state: {
                gameResult: gameResult(),
              },
            });
            return;
          }
          setGameFinish(false);
          countdownTimer();
        } else {
          setNextRoundTimer(nextRoundTimer() - 1);
        }
      }, 1000);
    }
  }, [gameFinish]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255,255,255,0.9)",
          width: "130px",
          height: "130px",
          display: !gameFinish() ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          position: "absolute",
          top: "50%",
          zIndex: "100",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 500 }}>
          {timer() === 0 ? "✌🏻" : timer()}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
        }}
      >
        <LeadingButton backToPath="Home" path="/" />
      </Box>
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
          Best of{" "}
          {params.round == "2"
            ? 3
            : params.round == "3"
            ? 5
            : params.round == "4"
            ? 7
            : params.round == "5"
            ? 9
            : params.round}
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
              {currentRoundResult()}
            </Typography>
            <Typography mt={3} color="white" variant="h1" fontWeight={500}>
              {playerScore().firstPlayer} : {playerScore().secondPlayer}
            </Typography>
          </Box>
        )}
        <For each={rec()}>
          {(item) => (
            <>
              <Typography
                position="absolute"
                top={item.y - 28}
                left={item.x}
                fontSize="20px"
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
                {item.label} {Number(item.confidence).toFixed(2)}
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
                display: "flex",
                flexDirection: "row-reverse",
                gap: "15px",
                justifyContent: "space-between",
                py: 1,
              }}
            >
              <For each={playerOneScoreBoard()}>
                {(item) => {
                  return (
                    <Box
                      sx={{
                        width: "20px",
                        height: "20px",
                        border: "2px solid",
                        borderColor: item ? "#38C149" : "gray",
                        borderRadius: 4,
                        backgroundColor: item ? "#38C149" : "white",
                      }}
                    ></Box>
                  );
                }}
              </For>
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
              {playerScore().firstPlayer}
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
              Round {currentRound()}
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
              {playerScore().secondPlayer}
            </Typography>
            <Box
              px={2}
              sx={{
                backgroundColor: "white",
                borderTopLeftRadius: "4px",
                borderBottomLeftRadius: "4px",
                display: "flex",
                gap: "15px",
                justifyContent: "space-between",
                py: 1,
              }}
            >
              <For each={playerTwoScoreBoard()}>
                {(item) => {
                  return (
                    <Box
                      sx={{
                        width: "20px",
                        height: "20px",
                        border: "2px solid",
                        borderColor: item ? "#38C149" : "gray",
                        borderRadius: 4,
                        backgroundColor: item ? "#38C149" : "white",
                      }}
                    ></Box>
                  );
                }}
              </For>
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
