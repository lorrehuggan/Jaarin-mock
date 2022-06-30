import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Section: React.FC<Props> = ({ children }) => {
  return (
    <section className="mx-auto mb-4 w-[90%] rounded border-[1px] border-neutral-300 bg-white p-4 lg:w-[100%]">
      {children}
    </section>
  );
};

export default Section;
