import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart(props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "COVID-19 Data Chart",
      },
    },
  };

  const data = {
    labels: [props.datas.countryRegion],
    datasets: [
      {
        label: "Active",
        data: [props.datas.active],
        borderColor: "#f0ad4e",
        backgroundColor: "#f0ad4e",
      },
      {
        label: "Infected",
        data: [props.datas.confirmed],
        borderColor: "#0275d8",
        backgroundColor: "#0275d8",
      },
      {
        label: "Recovered",
        data: [props.datas.recovered],
        borderColor: "#5cb85c",
        backgroundColor: "#5cb85c",
      },
      {
        label: "Deaths",
        data: [props.datas.deaths],
        borderColor: "#d9534f",
        backgroundColor: "#d9534f",
      },
    ],
  };

  console.log(props.datas);
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}

export default Chart;
