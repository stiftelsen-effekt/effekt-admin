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
} from "chart.js";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
Chart.register(Tooltip);
Chart.register(PointElement);
Chart.register(LineElement);

ReactDOM.render(<App />, document.getElementById("root"));
