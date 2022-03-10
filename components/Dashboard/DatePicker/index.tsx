import React, { useState } from 'react';
import { DatePicker } from '@mantine/dates';

type Props = {};

const DateSelection = (props: Props) => {
  const [value, onChange] = useState<Date | null>(new Date());

  return (
    <DatePicker
      dropdownType="modal"
      className="my-2"
      value={value}
      onChange={onChange}
    />
  );
};

export default DateSelection;
