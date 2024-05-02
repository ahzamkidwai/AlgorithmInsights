import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { Button } from "primereact/button";
import toast, { Toaster } from "react-hot-toast";

const BinarySearch = () => {
  const [numberOfElements, setNumberOfElements] = useState(10);
  const [randomArray, setRandomArray] = useState(
    generateSortedArray(numberOfElements)
  );
  const [activeIndexes, setActiveIndexes] = useState([]);
  const [targetIndexes, setTargetIndexes] = useState([]);
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

  function generateSortedArray(length) {
    const array = generateRandomArray(length);
    return array.sort((a, b) => a - b); // Sort the array in ascending order
  }

  function handleGenerate() {
    const array = generateRandomArray(numberOfElements).sort((a, b) => a - b); // Sort the array
    setRandomArray(array);
    setActiveIndexes([]);
    setShowData(false);
    setTargetElement("");
  }

  async function binarySearchHandler() {
    if (!targetElement) {
      toast.error("ERROR! Enter target element");
      return;
    }
    setTargetIndexes([]);

    let newArray = [...randomArray].sort((a, b) => a - b);
    let low = 0,
      high = newArray.length - 1;
    const target = parseInt(targetElement);

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      setActiveIndexes([low, high, mid]);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Delay to visualize sorting

      if (newArray[mid] === target) {
        setTargetIndexes([mid]);
        setShowData(true);
        return;
      } else if (newArray[mid] < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    setShowData(true);
    setActiveIndexes([]);
  }

  return (
    <div className="bg-cyan-50 h-screen">
      <Toaster />
      <h1 className="text-center text-cyan-900 text-2xl font-bold pt-8">
        BINARY SEARCH
      </h1>
      <div className="flex flex-row items-end justify-center min-h-60 rounded-lg px-4 ">
        {randomArray.map((value, index) => (
          <div key={index} className="flex flex-col">
            <div
              className={`h-auto ${
                targetIndexes.includes(index)
                  ? "bg-purple-900"
                  : activeIndexes.includes(index)
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
              setTargetElement(e.target.value);
            }}
          />
        </div>
        <br />
        <div className="text-center">
          <Button
            label="Submit"
            onClick={binarySearchHandler}
            className="bg-blue-500 disabled:opacity-55 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 shadow-md hover:shadow-lg transition duration-300"
          />
        </div>
      </div>

      {showData && targetIndexes.length > 0 && (
        <p className="text-center text-[#40A2E3] font-bold text-lg">
          Target element is found at index {targetIndexes[0]}
        </p>
      )}
      {showData && targetIndexes.length === 0 && (
        <p className="text-center text-[#40A2E3] font-bold text-lg">
          Target element is not found.
        </p>
      )}
      <br />
    </div>
  );
};

export default BinarySearch;
