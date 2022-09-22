import React from 'react';

const Input = ({ name, placeholder, label, type, value, onChange, error }) => {
  return (
    <div className="flex flex-col mb-6">
      <label htmlFor={name} className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
        {label}
      </label>

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
        />
        {error && <p className="text-red-500 text-xs italic">{error}</p>}

    </div>
  );
}

export default Input;