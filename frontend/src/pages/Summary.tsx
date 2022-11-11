import scissorsIcon from "../assets/scissors.png";
import paperIcon from "../assets/paper.png";
import rockIcon from "../assets/rock.png";
import Box from "@suid/material/Box";
import Grid from "@suid/material/Grid";
import { For, createSignal, createEffect } from "solid-js";
import Typography from "@suid/material/Typography";
import Button from "@suid/material/Button";
import { useNavigate, useLocation } from "@solidjs/router";
import { GameResults, GameResultsState } from "@/types/game";

const Summary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as GameResultsState;

  const [gameResult, setGameResult] = createSignal<GameResults>({
    nameWon: "Default",
    results: [],
    rounds: 0,
  });

  createEffect(() => {
    if (state.gameResult != null) {
      setGameResult(state.gameResult);
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "80%",
            height: "80%",
            backgroundColor: "#D9D9D9",
            borderRadius: 2,
          }}
        >
          <Grid
            container
            pt={2}
            pb={2}
            px={2}
            backgroundColor="#C2C8D8"
            sx={{
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <Grid item xs={2}></Grid>
            <For each={gameResult()?.results}>
              {(item) => (
                <Grid item xs={gameResult().results.length > 5 ? 1 : 2}>
                  <Typography variant="h5" fontWeight={500} textAlign="center">
                    Round {item.round}
                  </Typography>
                </Grid>
              )}
            </For>
          </Grid>
          <Box
            sx={{
              height: "93%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <Grid container px={2}>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    border: "2px solid",
                    borderColor:
                      gameResult()?.nameWon == "Player 1"
                        ? "#1CB462"
                        : "#FF9B9B",
                    backgroundColor:
                      gameResult()?.nameWon == "Player 1"
                        ? "rgba(28, 180, 98, 0.4)"
                        : "rgba(255, 155, 155, 0.4)",
                  }}
                >
                  Player 1
                </Typography>
              </Grid>
              <For each={gameResult()?.results}>
                {(item) => (
                  <Grid item xs={gameResult().results.length > 5 ? 1 : 2}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        my={2}
                        fontSize={24}
                        px={2}
                        py={0.5}
                        borderRadius={1}
                        backgroundColor={
                          item.firstPlayer.result == "win"
                            ? "#1CB462"
                            : "#FF9B9B"
                        }
                      >
                        {item.firstPlayer.result}
                      </Typography>
                      <Box
                        width="120px"
                        height="120px"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={
                            item.firstPlayer.label == "rock"
                              ? rockIcon
                              : item.firstPlayer.label == "paper"
                              ? paperIcon
                              : scissorsIcon
                          }
                          alt=""
                          width="100%"
                          height="100%"
                          style={{
                            "object-fit": "contain",
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                )}
              </For>
            </Grid>
            <Grid container px={2}>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    border: "2px solid",
                    borderColor:
                      gameResult()?.nameWon == "Player 2"
                        ? "#1CB462"
                        : "#FF9B9B",
                    backgroundColor:
                      gameResult()?.nameWon == "Player 2"
                        ? "rgba(28, 180, 98, 0.4)"
                        : "rgba(255, 155, 155, 0.4)",
                  }}
                >
                  Player 2
                </Typography>
              </Grid>
              <For each={gameResult()?.results}>
                {(item) => (
                  <Grid item xs={gameResult().results.length > 5 ? 1 : 2}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        my={2}
                        fontSize={24}
                        px={2}
                        py={0.5}
                        borderRadius={1}
                        backgroundColor={
                          item.secondPlayer.result == "win"
                            ? "#1CB462"
                            : "#FF9B9B"
                        }
                      >
                        {item.secondPlayer.result}
                      </Typography>
                      <Box
                        width="120px"
                        height="120px"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={
                            item.secondPlayer.label == "rock"
                              ? rockIcon
                              : item.secondPlayer.label == "paper"
                              ? paperIcon
                              : scissorsIcon
                          }
                          alt=""
                          width="100%"
                          height="100%"
                          style={{
                            "object-fit": "contain",
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                )}
              </For>
            </Grid>
          </Box>
        </Box>
        <Button
          onClick={() => {
            navigate("/", { replace: true });
          }}
          color="info"
          variant="contained"
        >
          <Typography variant="h6">Back to home</Typography>
        </Button>
      </Box>
    </>
  );
};
export default Summary;
