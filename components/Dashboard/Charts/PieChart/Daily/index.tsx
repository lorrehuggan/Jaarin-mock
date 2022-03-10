import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Section from '../../../DashboardSection';

ChartJS.register(ArcElement, Tooltip, Legend);
interface Props {
  tipData: Array<number>;
  labelData: Array<string>;
}
const DailyPieChart: React.FC<Props> = ({ tipData, labelData }) => {
  const data = {
    labels: labelData,
    datasets: [
      {
        label: 'Tips',
        data: tipData,
        borderColor: '#111111',
        backgroundColor: [
          '#ff78b9',
          '#18acff',
          '#ffe75c',
          '#37e0d0',
          '#7547a3',
          '#e03f4f',
          '#e86435',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {};

  return (
    <Section>
      <h4 className="mb-4 text-2xl">Daily Chart</h4>
      <div className="mx-auto h-full w-full lg:h-96 lg:w-96">
        <Pie
          data={data}
          options={{ maintainAspectRatio: true, responsive: true }}
        />
      </div>
    </Section>
  );
};

export default DailyPieChart;
