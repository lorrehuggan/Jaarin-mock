import React from 'react';
import Section from '../DashboardSection';
import { BsTrash } from 'react-icons/bs';
import { TiTrash } from 'react-icons/ti';
type Props = {};

const ShiftCard = (props: Props) => {
  return (
    <Section>
      <div className="flex justify-between">
        <h4 className=" text-slate-400">Most Recent Shift</h4>
        <TiTrash className="text-2xl" />
      </div>
      <div>
        <h4 className="my-10 text-center text-4xl font-black">
          Sat 05 Mar 2022
        </h4>
      </div>
      <div className="flex justify-between">
        <p className="text-xs">
          <span className="text-2xl">8</span>HRS
        </p>

        <p className="text-xl font-black text-pink-400">£11.87</p>
      </div>
    </Section>
  );
};

export default ShiftCard;
