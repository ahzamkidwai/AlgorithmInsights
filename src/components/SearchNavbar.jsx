import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchValue } from "../redux/slice/searchSlice";

function SearchNavbar() {
  const [searchElement, setSearchElement] = useState();
  const dispatch = useDispatch();

  function changeHandler(event) {
    event.preventDefault();
    setSearchElement(event.target.value);
  }

  function submitHandler() {
    console.log("Search element is : ", searchElement);
    dispatch(searchValue(searchElement));
  }

  return (
    <div>
      <div className="flex justify-center ">
        <input
          type="number"
          name=""
          id=""
          className="border border-gray-500 bg-gray-200 active:border-gray-800 rounded-lg"
          onChange={changeHandler}
        />
        <button
          className="py-1 px-4 bg-green-500 rounded-md text-white font-bold"
          onClick={submitHandler}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchNavbar;
