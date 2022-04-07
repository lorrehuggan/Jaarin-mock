import React, { useState } from 'react';
import Section from '../DashboardSection';
import { TiTrash, TiThLarge } from 'react-icons/ti';
import { Job, Wage } from 'utils/types/job-types';
import { getDateString, HandleCurrency, sortDatesDesc } from 'utils/helpers';
import useJob from 'utils/hooks/useJob';
import { Modal, Alert } from '@mantine/core';
import { AiFillEdit, AiFillWarning } from 'react-icons/ai';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { jobRoutes } from 'utils/api-routes';
import { getUnixTime, fromUnixTime } from 'date-fns';
import { useToasts } from 'react-toast-notifications';
import { useLocalStorage } from 'utils/hooks/useLocalStorage';
import { useSWRConfig } from 'swr';
import { DatePicker } from '@mantine/dates';
import { TiTick, TiTimes } from 'react-icons/ti';

type Props = {
  wages: Wage[];
  jobID: string;
};

const ShiftCard: React.FC<Props> = ({ wages, jobID }) => {
  const [shiftListAmount, setShiftListAmount] = useState(5);
  const _wages = sortDatesDesc(wages);
  const [error, setError] = useState<string | null>(null);
  const currency = HandleCurrency();
  const { deleteShift } = useJob();

  return (
    <Section>
      <div className="flex justify-between">
        <h4 className="text-2xl font-bold">Recent Shifts</h4>
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
        {wages?.length === 0 && <p>No shifts added</p>}
        {_wages?.slice(0, shiftListAmount).map((wage, i) => {
          const { day, month, date } = getDateString(wage.date);
          return (
            <div
              key={wage._id}
              className={`mb-1 grid w-full grid-cols-2 gap-1 border-l-2 border-dotted border-slate-500 py-1 pl-2`}
            >
              <p className="mr-1 flex items-center text-slate-500">{`
              ${day} ${date} ${month}`}</p>
              <div className="flex justify-between">
                <p className="flex w-full items-center justify-center rounded-xl bg-green-400/50 p-1 text-green-800">{`${currency}${wage.tips.toFixed(
                  2
                )}`}</p>

                <DeleteModal wage={wage} jobID={jobID} />
                <EditModal wage={wage} />
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default ShiftCard;

const EditShiftSchema = Yup.object().shape({
  date: Yup.number().required('Required'),
  hours_worked: Yup.number().min(1, 'Invalid').max(24, 'Invalid'),
});

interface Values {
  date: number;
  hours_worked: number;
}

interface IEdit {
  wage: Wage;
}

export const EditModal: React.FC<IEdit> = ({ wage }) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { token } = useLocalStorage();
  const { mutate } = useSWRConfig();
  const { addToast } = useToasts();

  return (
    <>
      <Modal centered opened={opened} onClose={() => setOpened(false)}>
        <h1 className="text-2xl font-bold">Edit Shift</h1>
        <Formik
          initialValues={{
            date: wage.date,
            hours_worked: wage.hours_worked,
            tips: wage.tips,
          }}
          onSubmit={async (values: Values, { resetForm }) => {
            setLoading(true);
            try {
              const res = await fetch(jobRoutes.updateShift, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: token!,
                },
                body: JSON.stringify({
                  ...values,
                  date: getUnixTime(value!),
                  wageID: wage._id,
                }),
              });
              const data: Job = await res.json();

              mutate([jobRoutes.base, token]);
              resetForm();
              setOpened(false);
              addToast(`${data.user} Edited Shift,`, {
                appearance: 'success',
                autoDismiss: true,
                autoDismissTimeout: 2500,
                newestOnTop: true,
              });
            } catch (error: any) {
              setError(error.message);
            }

            setLoading(false);
          }}
          validationSchema={EditShiftSchema}
        >
          {({ errors, touched }) => (
            <Form className="mx-auto mt-2 w-full">
              <label htmlFor="date" className="text-sm text-slate-500">
                Enter Date
              </label>
              <DatePicker
                //dropdownType="modal"
                className="my-2"
                value={value ? value : fromUnixTime(wage.date)}
                placeholder="Pick Date"
                onChange={setValue}
                styles={{
                  input: {
                    backgroundColor: '#94A3B8',
                    color: '#ffffff',
                    fontSize: '1.25rem',
                    padding: '1.25rem 1rem',
                  },
                }}
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tips" className="text-sm text-slate-500">
                    Tips Earned
                  </label>
                  <Field
                    id="tips"
                    placeholder="Shift Length"
                    type="number"
                    step="any"
                    min="1"
                    name="tips"
                    className="my-2 w-full rounded bg-slate-400 px-4 py-2 text-xl text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="hours_worked"
                    className="text-sm text-slate-500"
                  >
                    Shift Length
                  </label>
                  <Field
                    id="hours_worked"
                    placeholder="Shift Length"
                    type="number"
                    min="0.5"
                    step="0.5"
                    name="hours_worked"
                    className="my-2 w-full rounded bg-slate-400 px-4 py-2 text-xl text-white"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-2 w-full rounded bg-slate-800 p-2 text-center uppercase text-slate-100 transition-colors duration-300 ease-in-out hover:bg-pink-400"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
      <button
        onClick={() => {
          setValue(null);
          setOpened(true);
        }}
        className="ml-1"
      >
        <AiFillEdit size={20} />
      </button>
    </>
  );
};

interface IDelete {
  wage: Wage;
  jobID: string;
}

export const DeleteModal: React.FC<IDelete> = ({ wage, jobID }) => {
  const [opened, setOpened] = useState(false);
  const { deleteShift } = useJob();
  const { day, month, date } = getDateString(wage.date);
  return (
    <>
      <Modal centered opened={opened} onClose={() => setOpened(false)}>
        <>
          <AiFillWarning className="text-red-400" size={30} />
          <div className="mt-3 flex items-center justify-between">
            <h2 className=" text-lg font-bold text-slate-600">
              {`Delete ${day} ${date} ${month}`}
              <span className="ml-1">{`${HandleCurrency()}${wage.tips.toFixed(
                2
              )}`}</span>
            </h2>
            <div className="flex items-center">
              <button
                onClick={() => setOpened(false)}
                className="rounded bg-red-400 p-1 text-slate-50"
              >
                <TiTimes />
              </button>
              <button
                onClick={() => deleteShift(wage, jobID)}
                className="ml-2 rounded bg-green-300 p-1 text-slate-800"
              >
                <TiTick />
              </button>
            </div>
          </div>
        </>
      </Modal>
      <button
        onClick={() => {
          setOpened(true);
        }}
        className="ml-2"
      >
        <TiTrash className=" text-red-400" size={24} />
      </button>
    </>
  );
};
