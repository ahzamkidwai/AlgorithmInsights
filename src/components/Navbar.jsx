import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between bg-[#40A2E3] text-[#F8F6E3] font-bold text-xl p-4">
      <div>
        <NavLink to="/">Algorithm Insights</NavLink>
      </div>
      <div>
        <ul className="flex gap-2 ">
          <NavLink to="/sorting">
            <li>Sorting</li>
          </NavLink>
          <NavLink to="/searching">
            <li>Searching</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
