import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { Button } from "primereact/button";
import toast, { Toaster } from "react-hot-toast";

const LinearSearch = () => {
  const [numberOfElements, setNumberOfElements] = useState(10);
  const [randomArray, setRandomArray] = useState(generateRandomArray(10));
  const [activeIndex, setActiveIndex] = useState(-1);
  const [targetIndex, setTargetIndex] = useState([]);
  const [targetElement, setTargetElement] = useState("");
  const [searching, setSearching] = useState(false);
  const [showData, setShowData] = useState(false);

  function generateRandomArray(length) {
    return Array.from({ length: length }, () => {
      let value;
      do {
        value = Math.floor(Math.random() * 100);
      } while (value <= 0); // Keep generating until value is greater than 0
      return value;
    });
  }

  function handleGenerate() {
    const array = generateRandomArray(numberOfElements);
    setRandomArray(array);
    setActiveIndex(-1);
    setShowData(false);
    setTargetIndex([]);
    setTargetElement("");
    setSearching(false);
  }

  async function linearSearchHandler() {
    setSearching(true);
    if (!targetElement) {
      toast.error("ERROR! Enter target element");
      return;
    }
    setTargetIndex([]);

    for (let index = 0; index < randomArray.length; index++) {
      setActiveIndex(index);
      await new Promise((resolve) => setTimeout(resolve, 300)); // Delay to visualize sorting
      if (randomArray[index] === targetElement) {
        setTargetIndex((prevTarget) => [...prevTarget, index]);
      }
    }

    setActiveIndex(-1);
    setSearching(false);
    setShowData(true);
  }

  return (
    <div className="bg-cyan-50 h-screen">
      <Toaster />
      <h1 className="text-center text-cyan-900 text-2xl font-bold pt-8">
        LINEAR SEARCH
      </h1>
      <div className="flex flex-row items-end justify-center min-h-60 rounded-lg px-4 ">
        {randomArray.map((value, index) => (
          <div key={index} className="flex flex-col">
            <div
              className={`h-auto ${
                targetIndex.includes(index)
                  ? "bg-purple-900"
                  : activeIndex === index
                  ? "bg-[#ffae45]"
                  : "bg-[#40A2E3]"
              } text-white flex items-end justify-center rounded shadow-md transform transition-transform`}
              style={{
                height: `${value / 10}rem`,
                width: "2rem",
                margin: "0 0.2rem",
                minWidth: "2rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            ></div>
            <p className="mx-2 font-bold text-[#40A2E3]">{value}</p>
            <br />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center">
        <div>
          <div className="flex flex-row items-center gap-3 text-[#40A2E3] font-bold text-lg justify-center pt-8">
            Size of an Array
            <InputText
              value={numberOfElements}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setNumberOfElements(value);
              }}
              placeholder="Enter Length of Array"
              className="rounded-md text-black font-thin"
            />
            <button
              onClick={handleGenerate}
              className="py-1 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none shadow-md hover:shadow-lg transition duration-300 text-base"
            >
              Generate
            </button>
          </div>
          <p className="text-red-600 font-medium text-center">
            Note : The value of size varies from 1 to 30
          </p>
          <br />
        </div>
        <div className="flex flex-row gap-3 justify-center">
          <p className="text-[#40A2E3] font-bold text-lg  text-center">
            Enter value to be searched for :{" "}
          </p>
          <input
            type="number"
            placeholder="Enter target element..."
            value={targetElement}
            className="rounded-md px-2"
            onChange={(e) => {
              setTargetElement(parseInt(e.target.value));
            }}
          />
        </div>
        <br />
        <div className="text-center">
          <Button
            label="Submit"
            onClick={linearSearchHandler}
            className="bg-blue-500 disabled:opacity-55 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 shadow-md hover:shadow-lg transition duration-300"
          />
        </div>
      </div>

      {showData && targetIndex.length > 0 && (
        <p className="text-center text-[#40A2E3] font-bold text-lg">
          {targetIndex.length === 1
            ? `Target element is found at index ${targetIndex[0]}`
            : `Target element is found at indexes ${targetIndex.join(", ")}.`}
        </p>
      )}
      {showData && targetIndex.length === 0 && (
        <p className="text-center text-[#40A2E3] font-bold text-lg">
          Target element is not found.
        </p>
      )}
      <br />
    </div>
  );
};

export default LinearSearch;
