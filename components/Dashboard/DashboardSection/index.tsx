import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Section: React.FC<Props> = ({ children }) => {
  return (
    <section className="mx-auto my-6 w-[90%] rounded-2xl border-2 border-slate-200 bg-slate-100 p-4 shadow-lg">
      {children}
    </section>
  );
};

export default Section;
