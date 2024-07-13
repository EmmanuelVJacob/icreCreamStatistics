import React from "react";
import { Bar } from "react-chartjs-2";

const RevenueBarChart = ({ data }) => {
  const months = data.map((entry) => entry.month);
  const quantities = data.map((entry) => entry.quantity);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Hot Chocolate Fudge Revenue",
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.8)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        data: quantities,
      },
    ],
  };

  // Chart.js options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
            callback: function (value) {
              return "Rs." + value.toLocaleString(); 
            },
          },
        },
      ],
    },
  };

  return (
    <div className="chart-container mx-auto p-4">
      <div className="w-full lg:w-4/5 xl:w-3/5">
        <div className="relative" style={{ height: "400px" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default RevenueBarChart;
