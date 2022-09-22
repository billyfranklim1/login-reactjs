import React from 'react';

const Erros = ({ erros }) => {
  if (erros.length)
    return (
      <div className='mt-5 bg-red-300 text-red-700 px-4 py-3 rounded-md text-sm font-medium'>
        <ul>
          <li>
            Houve erros:
          </li>
          {erros.map((erro, index) => {
            return (<li key={index}>- {erro}</li>)
          })}
        </ul>
      </div>
    );
  else
    return <></>

};

export default Erros;
