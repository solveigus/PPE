// pages/setup.js

import React from 'react';
import Layout from '../components/Layout.js';
import Setup from '../components/Setup.js';

export default function Page() {
  const setups = [
    {
      pictures: ['penguin.jpeg', 'penguin.jpeg', 'penguin.jpeg', 'penguin.jpeg', 'penguin.jpeg'],
      list1: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
      list2: ['Item A', 'Item B', 'Item C', 'Item D', 'Item E']
    },
    {
      pictures: ['penguin.jpeg', 'penguin.jpeg', 'penguin.jpeg'],
      list1: ['Item 1', 'Item 2', 'Item 3'],
      list2: ['Item A', 'Item B', 'Item C']
    },
    // Add more setup objects here if needed
  ];

  return (
    <Layout title="Webtech" description="Home">
      <div className="flex-1 flex flex-col items-center justify-between p-24">
        <h1 className={`mb-3 text-5xl font-semibold text-center`}>Setups</h1>
        {setups.map((setup, index) => (
          <Setup key={index} {...setup} />
        ))}
      </div>
    </Layout>
  );
}
