import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Section from '../../../DashboardSection';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Monthly Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [2, 8, 9, 2, 3, 1, 3],
      borderColor: 'rgb(244 114 182)',
      backgroundColor: 'rgba(244, 114, 182, 0.5)',
    },
    {
      label: 'Hours',
      data: [10, 15, 6, 9, 4, 8, 8],
      borderColor: 'rgb(30 41 59)',
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
    },
  ],
};

export function LineChart() {
  return (
    <Section>
      <Line options={options} data={data} />
    </Section>
  );
}
