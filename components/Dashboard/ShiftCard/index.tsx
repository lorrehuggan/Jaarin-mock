import React, { useState } from 'react';
import Section from '../DashboardSection';
import { TiTrash, TiThLarge } from 'react-icons/ti';
import { Wage } from 'utils/types/job-types';
import { getDateString, HandleCurrency, sortDatesDesc } from 'utils/helpers';

type Props = {
  wages: Wage[];
};

const ShiftCard: React.FC<Props> = ({ wages }) => {
  const [shiftListAmount, setShiftListAmount] = useState(5);
  const _wages = sortDatesDesc(wages);
  return (
    <Section>
      <div className="flex justify-between">
        <h4 className="text-2xl">Recent Shifts</h4>
        <button
          onClick={() => {
            shiftListAmount === 5
              ? setShiftListAmount(100)
              : setShiftListAmount(5);
          }}
        >
          <TiThLarge className="text-2xl" />
        </button>
      </div>
      <div className="mt-4">
        {_wages?.slice(0, shiftListAmount).map((wage, i) => {
          const { day, month, date } = getDateString(wage.date);
          return (
            <div
              key={wage._id}
              className={`mb-1 grid w-full grid-cols-2 gap-1 py-1`}
            >
              <p className="mr-1 flex items-center text-slate-500">{`
              ${day} ${date} ${month}`}</p>
              <div className="flex justify-between">
                <p className="flex w-full items-center justify-center rounded-xl bg-green-400/50 p-1 text-green-800">{`${HandleCurrency()}${wage.tips.toFixed(
                  2
                )}`}</p>
                <span className="ml-2 flex items-center justify-end">
                  <TiTrash className=" text-2xl text-red-400" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default ShiftCard;
