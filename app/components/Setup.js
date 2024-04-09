import React from 'react';
import Link from 'next/link';

export default function Setup({ pictures, list1, list2 }) {
  return (
    <div className="border border-black p-4 mb-4 w-full max-w-md flex items-center rounded-lg">
      <div className="pictures pr-4 border-r border-black">
        <h2 className="text-xl">Pictures:</h2>
        <div className="picture-list grid grid-cols-2 gap-2">
          {pictures.map((picture, index) => (
            <Link key={index} href={`/product/${index + 1}`} passHref>
              <img src={picture} alt={`Picture ${index + 1}`} className="w-full" />
            </Link>
          ))}
        </div>
      </div>
      <div className="text pl-2">
        <div className="text-list">
          <ul>
            {list1.map((item, index) => (
              <li key={index} className="mb-2 text-2xl">
                <span className="text-2xl font-semibold">{item}</span> : {list2[index]}
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
