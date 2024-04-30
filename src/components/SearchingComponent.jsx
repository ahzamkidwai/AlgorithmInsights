import React from "react";
import { Dropdown } from "rsuite";
// import "rsuite/dist/rsuite.min.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import { NavLink } from "react-router-dom";

const SearchingComponent = () => {
  return (
    <Dropdown
      title="Searching"
      className=" hover:bg-[#40A2E3] bg-[#40A2E3] text-[#F8F6E3] font-bold font-ser"
    >
      <NavLink to="/linear-search">
        <Dropdown.Item className="bg-white ">Linear Search</Dropdown.Item>
      </NavLink>
      <NavLink to="/binary-search">
        <Dropdown.Item className="bg-white ">Binary Search</Dropdown.Item>
      </NavLink>
    </Dropdown>
  );
};

export default SearchingComponent;
