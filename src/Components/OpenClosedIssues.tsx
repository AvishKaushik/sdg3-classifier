import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Typography } from "@mui/material";

Chart.register(ArcElement, Tooltip, Legend);

interface OpenClosedIssuesProps {
  open: string; // Open issues count
  closed: string; // Closed issues count
}

const OpenClosedIssues: React.FC<OpenClosedIssuesProps> = ({
  open,
  closed,
}) => {
  // Ensure open and closed are valid numbers before rendering
  const openCount = open ? parseInt(open, 10) : 0;
  const closedCount = closed ? parseInt(closed, 10) : 0;

  // If both open and closed are zero or not valid, don't render the chart
  if (openCount === 0 && closedCount === 0) {
    return (
      <>
        <Typography variant="body2" color="text.secondary" marginTop={3}>
          No data available.
        </Typography>
      </>
    );
  }

  const labels = ["Open", "Closed"];
  const values = [openCount, closedCount];

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
        position: "right" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default OpenClosedIssues;
