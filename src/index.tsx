import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { hydrateRoot } from "react-dom/client";
import App from "./App";
const container = document.getElementById("root");
hydrateRoot(container!, <App />);
