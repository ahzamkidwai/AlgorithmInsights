import React from "react";
import { NavLink } from "react-router-dom";
import SearchingComponent from "./SearchingComponent";

function Navbar() {
  return (
    <div className="flex justify-between bg-[#40A2E3] text-[#F8F6E3] font-bold text-xl p-4">
      <div>
        <NavLink to="/">Algorithm Insights</NavLink>
      </div>
      <div>
        <ul className="flex gap-2 ">
          <li>
            <NavLink to="/sorting">Sorting </NavLink>
          </li>
          <li>
            <SearchingComponent />
          </li>
          <li>
            <NavLink to="/compare-sorting">Compare </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
