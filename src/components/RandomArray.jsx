import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function RandomArray() {
  const [randomArray, setRandomArray] = useState(generateRandomArray());
  const [activeIndex, setActiveIndex] = useState(-1);
  const [targetIndex, setTargetIndex] = useState([]);

  const searchElement = useSelector((state) => state.searchElement);
  let ele = Number(searchElement.searchElement);

  function generateRandomArray() {
    return Array.from({ length: 10 }, () => {
      let value;
      do {
        value = Math.floor(Math.random() * 100);
      } while (value <= 0);
      return value;
    });
  }

  function handleGenerate() {
    const array = generateRandomArray();
    setRandomArray(array);
    setTargetIndex([]);
  }

  async function linearSearchHandler() {
    setTargetIndex([]);

    for (let index = 0; index < randomArray.length; index++) {
      setActiveIndex(index);
      await new Promise((resolve) => setTimeout(resolve, 300)); // Delay to visualize sorting
      if (randomArray[index] === ele) {
        setTargetIndex((prevTarget) => [...prevTarget, index]); // Correct way to update targetIndex
      }
    }

    setActiveIndex(-1);
  }

  useEffect(() => {
    console.log("Target index is : ", targetIndex);
    // let newArray = [...randomArray];
    // setRandomArray(newArray );
  }, [targetIndex]); // Log targetIndex whenever it changes

  return (
    <div>
      <div className="flex items-end ">
        {randomArray.map((value, index) => (
          <div key={index} className="flex flex-col">
            <div
              className={`h-auto ${
                targetIndex.includes(index)
                  ? "bg-pink-900"
                  : activeIndex === index
                  ? "bg-yellow-500"
                  : "bg-blue-500"
              } text-white flex items-end justify-center rounded`}
              style={{ height: `${value}px`, width: "30px", margin: "0 3px" }}
            ></div>
            <p className="mx-2">{value}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handleGenerate}
        className="bg-red-500 px-4 py-1 text-white mx-2"
      >
        Generate Random
      </button>
      <button
        onClick={linearSearchHandler}
        className="bg-pink-500 px-4 py-1 text-white mx-2"
      >
        Find
      </button>
    </div>
  );
}

export default RandomArray;
