import { getUnixTime } from 'date-fns';
import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useSWRConfig } from 'swr';
import { jobRoutes } from 'utils/api-routes';
import { getDateString, HandleCurrency } from 'utils/helpers';
import { Job, Wage } from 'utils/types/job-types';
import { useLocalStorage } from './useLocalStorage';

interface Shift {
  date: number;
  hours_worked: number;
}

const useJob = () => {
  const { token } = useLocalStorage();
  const { mutate } = useSWRConfig();
  const { addToast } = useToasts();
  const currency = HandleCurrency();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const deleteShift = async (wage: Wage, jobID: string) => {
    const { month, date } = getDateString(wage.date);
    try {
      const res = await fetch(jobRoutes.deleteShift, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token!,
        },
        body: JSON.stringify({ jobID, wageID: wage._id }),
      });
      if (res.status === 200) {
        mutate([jobRoutes.base, token]);
        addToast(
          `${date} ${month} ${currency}${wage.tips.toFixed(2)} Deleted!`,
          {
            appearance: 'success',
            autoDismiss: true,
            autoDismissTimeout: 2500,
            newestOnTop: true,
          }
        );
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const addShift = async (
    values: Shift,
    date: Date | null,
    { resetForm }: { resetForm: any }
  ) => {
    setLoading(true);
    try {
      const res = await fetch(jobRoutes.createShift, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token!,
        },
        body: JSON.stringify({ ...values, date: getUnixTime(date!) }),
      });
      const data: Job = await res.json();

      mutate([jobRoutes.base, token]);
      resetForm();
      addToast(`${data.user} Added Shift,`, {
        appearance: 'success',
        autoDismiss: true,
        autoDismissTimeout: 2500,
        newestOnTop: true,
      });
    } catch (error: any) {
      setError(error.message);
    }

    setLoading(false);
  };

  return { deleteShift, addShift };
};

export default useJob;
