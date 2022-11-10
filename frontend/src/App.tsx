import { Routes, Route, Router, hashIntegration } from "@solidjs/router";
import Home from "./pages/Home";
import Example from "@/pages/Example";
import Lobby from "./pages/Lobby";
import LocalGame from "./pages/LocalGame";
import Summary from "./pages/Summary";

export default function App() {
  return (
    <>
      <div class="bg"></div>
      <div class="overlay"></div>
      <Router source={hashIntegration()}>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/example" element={<Example title="Example Page" />} />
          <Route path="/lobby/:round" element={<Lobby />} />
          <Route path="/game/:round" element={<LocalGame />} />
          <Route path="summary" element={<Summary />} />
        </Routes>
      </Router>
    </>
  );
}
