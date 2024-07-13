import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({data}) => {

  const months = data.map((entry) => entry.month);
  const items = data.map((entry) => entry.item);
  const quantities = data.map((entry) => entry.quantity);

  const colors = [
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(255, 205, 86, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(255, 205, 86, 0.6)",
  ];

  const chartData = {
    labels: months,
    datasets: items.map((item, index) => ({
      label: item,
      backgroundColor: colors[index % colors.length], 
      borderColor: `rgba(54, 162, 235, 1)`,
      borderWidth: 1,
      hoverBackgroundColor: `rgba(54, 162, 235, 0.8)`,
      hoverBorderColor: `rgba(54, 162, 235, 1)`,
      data: months.map((month, i) => (data[i].item === item ? data[i].quantity : null)),
    })),
  };

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
              return value;
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

export default BarChart;
