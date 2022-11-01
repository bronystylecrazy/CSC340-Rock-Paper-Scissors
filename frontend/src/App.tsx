import {
  createEffect,
  createMemo,
  createSignal,
  on,
  onCleanup,
} from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Header from "./components/Header";
import Button from "@suid/material/Button";
import TextField from "@suid/material/TextField";

function App() {
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name: name() }));
  }

  console.log("Render!");

  createEffect(
    on(name, (prev) => {
      console.log("name changed to", name());
      onCleanup(() => {
        console.log("Cleanup!");
      });
    })
  );

  let timer = setInterval(() => {
    console.log("Timer!");
  }, 1000);

  onCleanup(() => {
    console.log("Cleanup!");
    clearInterval(timer);
  });

  return (
    <div class="container">
      <Header name={name()} />
      <TextField onChange={(e) => setName(e.target.value)} />
      <Button variant="contained" onClick={greet}>
        Greet
      </Button>
    </div>
  );
}

export default App;
