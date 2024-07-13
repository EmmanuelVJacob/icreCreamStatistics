import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto"; 

const SalesChart = ({ data }) => {
  const chartRef = useRef(null); 

  useEffect(() => {
    let chartInstance = null;

    if (chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(chartRef.current.getContext("2d"), {
        type: "bar",
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              label: 'Sales Amount',
              data: Object.values(data),
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
              hoverBorderColor: 'rgba(54, 162, 235, 1)',
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                callback: function(value) {
                  return "$" + value.toLocaleString(); 
                },
              },
            }],
          },
        },
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]); 

  return (
    <div className="chart-container mx-auto p-4">
      <div className="w-full lg:w-4/5 xl:w-3/5">
        <div className="relative" style={{ height: '400px' }}>
          <canvas ref={chartRef} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
