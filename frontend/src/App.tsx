import { Routes, Route, Router, hashIntegration } from "@solidjs/router";
import Home from "./pages/Home";
import Example from "@/pages/Example";
import Lobby from "./pages/Lobby";
import LocalGame from "./pages/LocalGame";

export default function App() {
  return (
    <>
      <div class="bg"></div>
      <div class="overlay"></div>
      <Router source={hashIntegration()}>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/example" element={<Example title="Example Page" />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game/local" element={<LocalGame />} />
        </Routes>
      </Router>
    </>
  );
}
