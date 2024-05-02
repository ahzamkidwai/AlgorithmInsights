import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col  text-cyan-900 bg-cyan-50 items-center border h-screen">
      <div>
        <h1 className="text-6xl text-center font-bold mt-48">SEARCHING</h1>
        <br />
        <p className="font-medium px-20">
          Searching in data structures like arrays involves looking for a
          specific element within the array efficiently. One common approach is
          linear search, where each element of the array is examined
          sequentially until the desired element is found. However, for large
          arrays, this can be inefficient. Another approach is binary search,
          which is applicable only to sorted arrays. Binary search repeatedly
          divides the search interval in half until the target element is found
          or the interval is empty. This method is much faster than linear
          search for large arrays.
        </p>
      </div>
      <div className="flex flex-row  gap-4 py-12 mb-44">
        <Button
          label="Explore Linear Search"
          className="px-4 py-2 bg-blue-500 disabled:opacity-55 hover:bg-blue-700 text-white font-bold rounded  shadow-md hover:shadow-lg transition duration-300"
          onClick={() => {
            navigate("/linear-search");
          }}
        />
        <Button
          label="Explore Binary Search"
          className="px-4 py-2 bg-blue-500 disabled:opacity-55 hover:bg-blue-700 text-white font-bold rounded  shadow-md hover:shadow-lg transition duration-300"
          onClick={() => {
            navigate("/binary-search");
          }}
        />
      </div>
    </div>
  );
};

export default Search;
