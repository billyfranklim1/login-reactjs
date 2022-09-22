import React from "react";
import { Oval } from 'react-loader-spinner'


const Loader = ({ show }) => {
  if (show) {

    return (
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-100 opacity-75 z-50 cursor-wait">
        <Oval
          height={100}
          width={100}
          color='grey'
        />
      </div>
    );
  }

  return null;

}

export default Loader;