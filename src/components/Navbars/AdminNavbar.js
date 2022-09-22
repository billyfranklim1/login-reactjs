import React from "react";

import UserDropdown from "../../components/Dropdowns/UserDropdown.js";

export default function Navbar({ title }) {
  return (
    <>
      <div className="relative bg-sky-700 md:pt-32 pb-16 pt-12">
        <nav className="absolute top-24 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
          <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
            <span className="text-white text-sm uppercase hidden lg:inline-block font-semibold">
              {title}
            </span>
            <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
              <UserDropdown />
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
