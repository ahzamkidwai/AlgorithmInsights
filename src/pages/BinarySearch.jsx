import React, { useState } from "react";
import SearchNavbar from "../components/SearchNavbar";
import { useSelector } from "react-redux";
import RandomArray from "../components/RandomArray";

function BinarySearch() {
  const [randomArray, setRandomArray] = useState(generateRandomArray());
  const [activeIndex, setActiveIndex] = useState([]);
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
    array.sort((a, b) => a - b);
    setRandomArray(array);
    setTargetIndex([]);
  }

  async function binarySearchHandler() {
    setTargetIndex([]);

    let newArray = [...randomArray];
    let low = 0,
      high = newArray.length - 1;
    console.log("Newarray : ", newArray);
    while (low <= high) {
      setActiveIndex([low, high]);
      console.log("LOW AND HIGH are : ", low, " ", high);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay to visualize sorting
      let mid = Math.floor((low + high) / 2);
      console.log("Ele and arr[mid] are : ", ele, "  ", newArray[mid]);
      if (ele === newArray[mid]) {
        console.log("MATCH FOUND");
        let arr = [];
        arr.push(mid);
        setTargetIndex(arr);
        console.log("target Index at last after match found : ", targetIndex);
        break;
      } else if (ele > newArray[mid]) {
        console.log("else if (ele > newArray[mid]) chal raha hain");
        low = mid + 1;
      } else {
        console.log("else wla part chal raha hain");
        high = mid - 1;
      }
    }

    /* for (let index = 0; index < randomArray.length; index++) {
      setActiveIndex(index);
      await new Promise((resolve) => setTimeout(resolve, 300)); // Delay to visualize sorting
      if (randomArray[index] === ele) {
        setTargetIndex((prevTarget) => [...prevTarget, index]); // Correct way to update targetIndex
      }
    } */

    setActiveIndex([]);
  }

  return (
    <div>
      <SearchNavbar />
      Welcome to Binary Search
      <div className="flex items-end ">
        {randomArray.map((value, index) => (
          <div key={index} className="flex flex-col">
            <div
              className={`h-auto ${
                targetIndex.includes(index)
                  ? "bg-pink-900"
                  : activeIndex.includes(index)
                  ? "bg-yellow-500"
                  : "bg-blue-500"
              } text-white flex items-end justify-center rounded`}
              style={{ height: `${value}px`, width: "30px", margin: "0 3px" }}
            ></div>
            <p className="mx-2">{value}</p>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={handleGenerate}
          className="bg-red-500 px-4 py-1 text-white mx-2"
        >
          Generate Random
        </button>
        <button
          onClick={binarySearchHandler}
          className="bg-pink-500 px-4 py-1 text-white mx-2"
        >
          Find
        </button>
      </div>
    </div>
  );
}

export default BinarySearch;
