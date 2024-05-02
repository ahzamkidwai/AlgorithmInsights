import { Button } from "primereact/button";
import React from "react";

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col font-bold text-cyan-900 bg-cyan-50 items-center border">
      <h1 className="text-6xl mt-56">
        <p className="text-center">WELCOME TO</p>
        <p>ALGORITHM INSIGHTS</p>
      </h1>
      <div className="flex flex-row  gap-4 py-12 mb-44">
        <Button
          label="Explore Sorting"
          className="px-4 py-2 bg-blue-500 disabled:opacity-55 hover:bg-blue-700 text-white font-bold rounded  shadow-md hover:shadow-lg transition duration-300"
          onClick={() => {
            navigate("/sorting");
          }}
        />
        <Button
          label="Compare Sorting"
          className="px-4 py-2 bg-blue-500 disabled:opacity-55 hover:bg-blue-700 text-white font-bold rounded  shadow-md hover:shadow-lg transition duration-300"
          onClick={() => {
            navigate("/compare-sorting");
          }}
        />
        <Button
          label="Explore Searching"
          className="px-4 py-2 bg-blue-500 disabled:opacity-55 hover:bg-blue-700 text-white font-bold rounded  shadow-md hover:shadow-lg transition duration-300"
          onClick={() => {
            navigate("/linear-search");
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
