import React, { useState } from 'react';
import Section from '../DashboardSection';
import { TiTrash, TiThLarge } from 'react-icons/ti';
import { Wage } from 'utils/types/job-types';
import { getDateString, HandleCurrency, sortDatesDesc } from 'utils/helpers';
import { jobRoutes } from 'utils/api-routes';
import { useLocalStorage } from 'utils/hooks/useLocalStorage';
import useSWR, { useSWRConfig } from 'swr';

type Props = {
  wages: Wage[];
  jobID: string;
};

const ShiftCard: React.FC<Props> = ({ wages, jobID }) => {
  const { token } = useLocalStorage();
  const [shiftListAmount, setShiftListAmount] = useState(5);
  const _wages = sortDatesDesc(wages);
  const [error, setError] = useState<string | null>(null);
  const { mutate } = useSWRConfig();

  const deleteShift = async (wageID: string | undefined) => {
    try {
      const res = await fetch(jobRoutes.deleteShift, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token!,
        },
        body: JSON.stringify({ jobID, wageID }),
      });
      const data = res.json();
      mutate([jobRoutes.base, token]);
    } catch (error) {}
  };

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
        {wages.length === 0 && <p>No shifts added</p>}
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
                <button
                  onClick={() => deleteShift(wage._id)}
                  className="ml-2 flex items-center justify-end"
                >
                  <TiTrash className=" text-2xl text-red-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default ShiftCard;
