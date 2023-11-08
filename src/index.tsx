import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { defaults } from "react-chartjs-2";

defaults.font.family = "ESKlarheitGrotesk";
ReactDOM.render(<App />, document.getElementById("root"));
