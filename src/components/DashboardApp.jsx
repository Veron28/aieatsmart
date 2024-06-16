import React, { useState ,useEffect} from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import '../styles/dashboardApp.css'

ChartJS.register(ArcElement, Tooltip);


const DashboardApp = () => {
  const [allkkl, setAllkkl] = useState(230)
  const [kkl, setKkl] = useState(12)
  
  const data = {
    labels: ['Red', 'Blue'],
    datasets: [{
      label: '# of Votes',
      data: [allkkl, kkl],
      backgroundColor: [
        '#9C6AF9',
        '#EBE1FE',
      ],
    }],
     Legend: {
       display: false,
     },
  };
  return (
    <Pie data={data} ></Pie>
  );
};

export default DashboardApp;