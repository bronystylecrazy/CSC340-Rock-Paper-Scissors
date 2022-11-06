import Box from "@suid/material/Box";
import { createSignal, onCleanup } from "solid-js";
import Card from "../components/customs/Card";
import Typography from "@suid/material/Typography";
import Chip from "@suid/material/Chip";
import Container from "@suid/material/Container";
import ModeCard from "@/components/Home/Mode";
import Grid from "@suid/material/Grid";
import HomeHeader from "@/components/Home/Header";

export default function Home() {
  const [title, setTitle] = createSignal("HolyRPS");
  const timer = setInterval(() => {
    // setCount((count) => count + 1);
  }, 10);

  onCleanup(() => {
    clearInterval(timer);
  });

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
            <h5 class="logo" data-shadow={title()}>
              {title}
            </h5>
            <h2>
              Welcome,{" "}
              <b style={{ color: "yellowgreen" }}>Sirait Pratoomsuwan</b>
            </h2>
          </Grid>
          <Grid item xs={12} md={6}>
            <ModeCard
              title="CLASSIC"
              description="Allows you to enjoy with your friend in your local machine."
              architecture="Local Machine"
              maxWidth="450px"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            justifyContent="flex-end"
            sx={{ display: "flex" }}
          >
            <ModeCard
              title="RANKED"
              description="Allows you to enjoy with your friend in across the internet."
              architecture="Internet"
              maxWidth="450px"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
