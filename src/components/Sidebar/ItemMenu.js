import React from "react";
import { Link } from "react-router-dom";


const ItemMenu = ({ path, label, icon = "" }) => {
  return (
    <Link className={"text-xs uppercase py-3 font-bold block " + (window.location.href.indexOf(path) !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")} to={path} >
      <i
        className={
          icon + " mr-2 text-sm " +
          (window.location.href.indexOf(path) !== -1
            ? "opacity-75"
            : "text-blueGray-300")
        }
      ></i>{" "}
      {label}
    </Link>
  );


}

export default ItemMenu;