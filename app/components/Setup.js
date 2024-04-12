// Setup.js

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Setup({ pictures, sut, indice }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (pictures && sut && indice) {
      setLoading(false);
    }
  }, [pictures, sut, indice]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="border border-black p-4 mb-4 w-full max-w-md flex items-center rounded-lg">
      <div className="pictures pr-4 border-r border-black">
        <h2 className="text-xl font-bold">Pictures:</h2>
        <div className="picture-list grid grid-cols-2 gap-2">
          {indice.map((id, index) => (
            <Link key={id} href={`/products/${id}`} passHref>
              <img src={pictures[index]} alt={`Picture ${index + 1}`} className="w-full" />
            </Link>
          ))}
        </div>
      </div>
      <div className="text pl-2">
        <div className="text-list">
          <ul>
            {sut && sut.map((item, index) => (
              <li key={index} className="mb-2 text-2xl font-bold">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="absolute h-full bg-black left-0 top-0 bottom-0 w-2 rounded-l-lg"></div>
      <div className="absolute h-full bg-black right-0 top-0 bottom-0 w-2 rounded-r-lg"></div>
    </div>
  );
}
