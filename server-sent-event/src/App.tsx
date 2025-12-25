import SSE from "./components/SSE";
import "./index.css";

export function App() {
  return (
    <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
      <h1>Server Sent Event</h1>
      <SSE />
    </div>
  );
}

export default App;
