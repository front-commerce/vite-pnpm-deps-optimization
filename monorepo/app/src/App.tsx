import HelloWorld from "@test-pkg/acme-world";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import config from "~/config";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app-container">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
      </div>
      <h3>Alias Config From Root</h3>
      <pre>{JSON.stringify(config, null, 2)}</pre>
      <HelloWorld />
    </>
  );
}

export default App;
