import Head from 'next/head';
import React from 'react';

interface IHead {
  title: string;
  name?: string;
  content?: string;
  tags?: string;
}

const HTMLHead: React.FC<IHead> = ({ title, name, content, tags }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name={name} content={content} />
      <meta name="theme" content="#ffffff" />
      <meta
        name="keywords"
        content={tags ? tags : `money track, tip tracker,`}
      />
      <meta name="copyright" content="Jaarin"></meta>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HTMLHead;
