import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between bg-[#FFA987] text-[#E54B4B] font-bold text-xl p-4">
      <div>
        <NavLink to="/">Algorithm Insights</NavLink>
      </div>
      <div>
        <input type="text" name="" id="" />
      </div>
      <div>
        <ul className="flex gap-2 ">
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
