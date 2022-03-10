import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Section: React.FC<Props> = ({ children }) => {
  return (
    <section className="mx-auto my-6 w-[90%] rounded border-2 border-slate-300 bg-slate-100 px-2 py-4 shadow-lg">
      {children}
    </section>
  );
};

export default Section;
