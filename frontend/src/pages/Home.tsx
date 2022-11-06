import Box from "@suid/material/Box";
import { createSignal, For, onCleanup } from "solid-js";
import Card from "../components/customs/Card";
import Typography from "@suid/material/Typography";
import Chip from "@suid/material/Chip";
import Container from "@suid/material/Container";
import ModeCard from "@/components/Home/Mode";
import Grid from "@suid/material/Grid";
import HomeHeader from "@/components/Home/Header";
import GameRound from "@/components/Home/GameRound";
import Spacer from "@/components/customs/Spacer";
import Button from "@suid/material/Button";

export default function Home() {
  const [title, setTitle] = createSignal("HolyRPS");
  const [mode, setMode] = createSignal(1); // mode, 0 = nothing, 1 = classic, 2 = ranking
  const [games, setGames] = createSignal([1, 3, 5, 7, 9]);
  const [gameRound, setGameRound] = createSignal(games()[0]);

  const timer = setInterval(() => {
    // setCount((count) => count + 1);
  }, 10);

  onCleanup(() => {
    clearInterval(timer);
  });

  function chooseClassicMode() {
    setMode(1);
  }

  function chooseRankingMode() {
    setMode(2);
  }

  return (
    <Box
      sx={{
        display: "flex",
        position: "fixed",
        inset: 0,
        alignItems: "center",
      }}
    >
      <HomeHeader />
      <Container>
        <Grid container spacing={4}>
          <Grid
            item
            md={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "white",
              gap: "2.5rem",
            }}
          >
            <h5
              class="logo animate__animated animate__bounceInDown animate_slower hoverAndBigger"
              data-shadow={title()}
            >
              {title}
            </h5>
            <h2
              class="animate__animated animate__bounceIn"
              style={{ "animation-delay": ".5s" }}
            >
              Welcome,{" "}
              <b style={{ color: "yellowgreen" }}>Sirait Pratoomsuwan</b>
            </h2>
          </Grid>
          <Grid item xs={12} md={6}>
            <ModeCard
              class="animate__animated animate__bounceInLeft"
              title="CLASSIC"
              description="Allows you to enjoy with your friend in your local machine."
              architecture="Local Machine"
              maxWidth="450px"
              onClick={chooseClassicMode}
              selected={mode() === 1}
              boxProps={{
                color: "white",
                sx: {
                  padding: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: ".5rem",
                },
              }}
              onClose={() => alert(0)}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" component="b" fontWeight={1000}>
                  GAME SETUP
                </Typography>
              </Box>
              <Typography
                variant="caption"
                component="b"
                fontWeight={500}
                align="center"
              >
                <b>Classic Mode</b> is a local battle against your friend.
                Hosted on your own computer, no internet required.
              </Typography>
              <b style={{ "margin-top": ".5rem" }}>ROUNDS</b>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  justifyContent: "center",
                }}
              >
                <For each={games()}>
                  {(item) => (
                    <GameRound
                      round={item}
                      onClick={() => setGameRound(item)}
                      isSelected={item === gameRound()}
                    />
                  )}
                </For>
              </Box>
              <Spacer />
              <Button
                sx={{ borderRadius: "1000px", fontWeight: 600 }}
                variant="contained"
              >
                {gameRound} round{gameRound() < 1 ? "" : "s"}, GO!
              </Button>
            </ModeCard>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            justifyContent="flex-end"
            sx={{ display: "flex" }}
          >
            <ModeCard
              class="animate__animated animate__bounceInRight"
              title="RANKED"
              description="Allows you to enjoy with your friend in across the internet."
              architecture="Internet"
              maxWidth="450px"
              onClick={chooseRankingMode}
              selected={mode() === 2}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
