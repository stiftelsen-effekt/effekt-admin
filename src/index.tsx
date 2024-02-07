import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Chart,
  Tooltip,
  PointElement,
  LineElement,
  LineController,
} from "chart.js";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
Chart.register(Tooltip);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(LineController);

ReactDOM.render(<App />, document.getElementById("root"));
