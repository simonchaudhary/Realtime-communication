import { createRoot } from "react-dom/client";
import App from "./App";
var root = createRoot(document.getElementById("root"));
console.log(/*#__PURE__*/ React.createElement(App, null));
console.log(App);
root.render(/*#__PURE__*/ React.createElement(App, null));
