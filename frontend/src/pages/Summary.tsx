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
                    backgroundColor: "rgba(0,0,0,0.1)",
                  }}
                >
                  Player 1
                </Typography>
              </Grid>
              <For each={round}>
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
                          player1Stat == "win" ? "#1CB462" : "#FA4141"
                        }
                      >
                        Win
                      </Typography>
                      <img src={rockIcon} alt="" width="120px" />
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
                    backgroundColor: "rgba(0,0,0,0.1)",
                  }}
                >
                  Player 2
                </Typography>
              </Grid>
              <For each={round}>
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
                          player1Stat == "win" ? "#1CB462" : "#FA4141"
                        }
                      >
                        Win
                      </Typography>
                      <img src={rockIcon} alt="" width="120px" />
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
