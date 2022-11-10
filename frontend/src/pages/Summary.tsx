import scissorsIcon from "../assets/scissors.png";
import paperIcon from "../assets/paper.png";
import rockIcon from "../assets/rock.png";
import Box from "@suid/material/Box";
import LeadingButton from "@/components/LeadingButton";
import Grid from "@suid/material/Grid";
import { For } from "solid-js";
import Typography from "@suid/material/Typography";

const Summary = () => {
  const round = [1, 2, 3, 4, 5];
  const player1Stat = "win";
  const player2Stat = "lose";
  const player1 = {
    name: "Player 1",
    round: [
      {
        result: "win",
        label: "rock",
      },
      {
        result: "win",
        label: "paper",
      },
      {
        result: "lose",
        label: "scissors",
      },
      {
        result: "lose",
        label: "paper",
      },
      {
        result: "win",
        label: "scissors",
      },
    ],
  };
  const player2 = {
    name: "Player 2",
    round: [
      {
        result: "lose",
        label: "scissors",
      },
      {
        result: "lose",
        label: "rock",
      },
      {
        result: "win",
        label: "rock",
      },
      {
        result: "win",
        label: "scissors",
      },
      {
        result: "lose",
        label: "paper",
      },
    ],
  };
  return (
    <>
      <LeadingButton backToPath="Home" path="/" />
      <Box
        sx={{
          width: "100vw",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "80%",
            height: "90%",
            backgroundColor: "#D9D9D9",
            borderRadius: 2,
          }}
        >
          <Grid
            container
            pt={2}
            pb={2}
            pr={2}
            backgroundColor="#C2C8D8"
            sx={{
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <Grid item xs={2}></Grid>
            <For each={round}>
              {(item) => (
                <Grid item xs={2}>
                  <Typography variant="h5" fontWeight={500} textAlign="center">
                    Round {item}
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
            <Grid container pr={2}>
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
                    backgroundColor:
                      player1Stat == "win" ? "#1CB462" : "#FF9B9B",
                  }}
                >
                  {player1.name}
                </Typography>
              </Grid>
              <For each={player1.round}>
                {(item) => (
                  <Grid item xs={2}>
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
                          item.result == "win" ? "#1CB462" : "#FF9B9B"
                        }
                      >
                        {item.result}
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
                            item.label == "rock"
                              ? rockIcon
                              : item.label == "paper"
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
            <Grid container pr={2}>
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
                    backgroundColor:
                      player2Stat == "win" ? "#1CB462" : "#FF9B9B",
                  }}
                >
                  {player2.name}
                </Typography>
              </Grid>
              <For each={player2.round}>
                {(item) => (
                  <Grid item xs={2}>
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
                          item.result == "win" ? "#1CB462" : "#FF9B9B"
                        }
                      >
                        {item.result}
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
                            item.label == "rock"
                              ? rockIcon
                              : item.label == "paper"
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
      </Box>
      {/* <img src={scissorsIcon} alt="" /> */}
    </>
  );
};
export default Summary;
