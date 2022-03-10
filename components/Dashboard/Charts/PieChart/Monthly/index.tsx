import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Section from '../../../DashboardSection';
ChartJS.register(ArcElement, Tooltip, Legend);
interface Props {
  tipData: Array<number>;
  labelData: Array<string>;
}
const MonthlyPieChart: React.FC<Props> = ({ tipData, labelData }) => {
  const data = {
    labels: labelData,
    datasets: [
      {
        label: 'Tips',
        data: tipData,
        borderColor: '#111111',
        backgroundColor: [
          '#e86435',
          '#37e0d0',
          '#ff78b9',
          '#18acff',
          '#7547a3',
          '#ffe75c',
          '#e18868',
          '#aee2dd',
          '#ffbddd',
          '#a5ddfd',
          '#8d7c9e',
          '#fcf2b7',
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <Section>
      <h4 className=" mb-4 text-2xl">Monthly Chart</h4>
      <div className="mx-auto h-full w-full lg:h-96 lg:w-96">
        <Pie
          data={data}
          options={{ maintainAspectRatio: true, responsive: true }}
        />
      </div>
    </Section>
  );
};

export default MonthlyPieChart;
