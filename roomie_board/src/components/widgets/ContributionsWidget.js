import Widget from "./Widget";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import "./ContributionsWidget.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ContributionsWidget({ tasks, groceries, users }) {
  const taskCounts = {};
  const groceryCounts = {};

  users.forEach((u) => {
    taskCounts[u.id] = 0;
    groceryCounts[u.id] = 0;
  });

  tasks.forEach((t) => {
    if (t.completedById) {
      taskCounts[t.completedById]++;
    }
  });

  groceries.forEach((g) => {
    if (g.boughtById) {
      groceryCounts[g.boughtById]++;
    }
  });
  const datasets = users.map((u) => ({
    label: u.name,
    backgroundColor: u.color,
    data: [taskCounts[u.id], groceryCounts[u.id]],
  }));

  const data = {
    labels: ["Tasks", "Groceries"],
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
    scales: {
        x: {
            stacked: true,
            ticks: { font: { size: 14 } },
            barThickness: 20,  
            maxBarThickness: 20,   },
        y: {
        stacked: true,
        beginAtZero: true, },
    },
  };

  return (
    <Widget title="Roommate Contributions" className="contrib-widget">
      <div className="contrib-chart-container">
        <Bar data={data} options={options} />
      </div>
    </Widget>
  );
}