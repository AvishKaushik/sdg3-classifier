import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

interface LanguageChartProps {
  data: { [key: string]: number }; // Dynamic language data
}

const LanguageChart: React.FC<LanguageChartProps> = ({ data }) => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  // Function to generate random colors
  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const backgroundColors = labels.map(() => getRandomColor());

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const, // Ensuring type compatibility
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default LanguageChart;
