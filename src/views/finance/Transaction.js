import React from "react";
import CardTable from "../../components/Cards/CardTable.js";
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";


export default function Transaction() {
  console.log("Transaction");
  return (
    <>
        <AdminNavbar title={'Finance / Transactions'} />
        <div className="flex flex-wrap">
          <div className="w-full mb-12">
            <div className="px-4 md:px-10 mx-auto w-full mt-5">
            <CardTable />
          </div>

          </div>
        </div>

    </>
  );
}