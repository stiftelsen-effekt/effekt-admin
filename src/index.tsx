import React from "react";
import { createRoot } from "react-dom/client";
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

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
