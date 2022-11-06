import { Routes, Route, Router, hashIntegration } from "@solidjs/router";
import Home from "./pages/Home";
import Example from "@/pages/Example";

export default function App() {
  return (
    <>
      <div class="bg"></div>
      <div class="overlay"></div>
      <Router source={hashIntegration()}>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/example" element={<Example title="Example Page" />} />
        </Routes>
      </Router>
    </>
  );
}
