import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import toast, { Toaster } from "react-hot-toast";

function GenerateRandomArray() {
  const [numberOfElements, setNumberOfElements] = useState(10);
  const [randomArray, setRandomArray] = useState(generateRandomArray());
  const [activeIndex, setActiveIndex] = useState(-1);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [minIndex, setMinIndex] = useState(-1);
  const [swappedIndices, setSwappedIndices] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [pivotIndex, setPivotIndex] = useState(-1);
  const [sortingOptionSelected, setSortingOptionSelected] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [sortingSpeed, setSortingSpeed] = useState(100);
  const [timeTaken, setTimeTaken] = useState("");
  const [arrayPasses, setArrayPasses] = useState([]);

  const sortingAlgorithms = [
    { name: "Bubble Sort" },
    { name: "Selection Sort" },
    { name: "Merge Sort" },
    { name: "Quick Sort" },
    { name: "Insertion Sort" },
  ];

  const sortingSpeedFactor = [
    { speedVal: "0.25x" },
    { speedVal: "0.50x" },
    { speedVal: "1x" },
    { speedVal: "1.50x" },
    { speedVal: "1.75x" },
    { speedVal: "2x" },
    { speedVal: "4x" },
    { speedVal: "8x" },
  ];

  function submitSortingMethodHandler() {
    setSortingOptionSelected(selectedAlgorithm.name);

    if (!sortingOptionSelected) {
      toast.error("Select Sorting Algorithm");
    }

    if (selectedAlgorithm.name === "Bubble Sort") {
      handleBubbleSort();
    } else if (selectedAlgorithm.name === "Selection Sort") {
      handleSelectionSort();
    } else if (selectedAlgorithm.name === "Quick Sort") {
      handleQuickSort();
    } else if (selectedAlgorithm.name === "Merge Sort") {
      handleMergeSort();
    } else if (selectedAlgorithm.name === "Insertion Sort") {
      handleInsertionSort();
    }
  }

  function generateRandomArray() {
    return Array.from({ length: numberOfElements }, () => {
      let value;
      do {
        value = Math.floor(Math.random() * 100);
      } while (value <= 0); // Keep generating until value is greater than 0
      return value;
    });
  }

  function handleGenerate() {
    const array = generateRandomArray();
    setRandomArray(array);
    setActiveIndex(-1);
    setSortedIndices([]);
    setMinIndex(-1);
    setSortingSpeed(100);
    setTimeTaken("");
    setArrayPasses([]);
  }

  async function handleBubbleSort() {
    const startTime = performance.now();

    setSorting(true);
    let newArray = [...randomArray]; // Create a copy of the array
    let len = newArray.length;

    const passes = [];

    // Bubble sort algorithm
    for (let i = 0; i < len; i++) {
      const passArray = [...newArray]; // Creating copy of newArray into passArray

      for (let j = 0; j < len - 1 - i; j++) {
        setActiveIndex(j); // Highlight current element being compared
        await new Promise((resolve) => setTimeout(resolve, sortingSpeed)); // Delay to visualize sorting
        if (newArray[j] > newArray[j + 1]) {
          // Swap elements
          let temp = newArray[j];
          newArray[j] = newArray[j + 1];
          newArray[j + 1] = temp;
          setRandomArray([...newArray]); // Update the array after swapping
        }
        // passArray[j] = newArray[j];
      }
      console.log("random array after iteration " + i + " is : " + randomArray);
      passes.push(passArray);
      setSortedIndices((prevSortedIndices) => [
        ...prevSortedIndices,
        len - 1 - i,
      ]); // Mark the element as sorted
    }

    setArrayPasses([...passes]);

    setActiveIndex(-1); // Reset active index
    setSorting(false);

    const endTime = performance.now();
    setTimeTaken(endTime - startTime);
  }

  async function handleSelectionSort() {
    const startTime = performance.now();
    setSorting(true);
    let newArray = [...randomArray];
    let len = newArray.length;

    const passes = [];

    for (let i = 0; i < len - 1; i++) {
      const passArray = [...newArray];
      let minIndex = i;
      setActiveIndex(i);
      for (let j = i + 1; j < len; j++) {
        setActiveIndex(j);
        await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
        if (newArray[j] < newArray[minIndex]) {
          minIndex = j;
        }
        // passArray[j] = newArray[j];
      }
      [newArray[i], newArray[minIndex]] = [newArray[minIndex], newArray[i]];
      passes.push(passArray); // Pushing passArray into passes
      setRandomArray([...newArray]);
      setSortedIndices((prevSortedIndices) => [...prevSortedIndices, i]); // Mark the element as sorted
    }
    setSortedIndices((prevSortedIndices) => [...prevSortedIndices, len - 1]); // Mark the element as sorted
    passes.push([...newArray]); // Pushing the final sorted array into passes
    setArrayPasses([...passes]); // Setting the array passes
    setSorting(false);
    const endTime = performance.now();
    setTimeTaken(endTime - startTime);
  }

  async function handleInsertionSort() {
    const startTime = performance.now();
    setSorting(true);
    let newArray = [...randomArray];
    let len = newArray.length;

    const passes = [];

    for (let i = 1; i < len; i++) {
      let passArray = [...newArray];
      let key = newArray[i];
      let j = i - 1;
      setActiveIndex(i);

      while (j >= 0 && newArray[j] > key) {
        setActiveIndex(j);
        await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
        newArray[j + 1] = newArray[j];
        j = j - 1;
        // passArray[j + 1] = newArray[j + 1]; // Update the passArray
        setRandomArray([...newArray]);
      }
      newArray[j + 1] = key;
      // passArray[j + 1] = key; // Update the passArray
      passArray = [...newArray];
      setRandomArray([...newArray]);
      passes.push(passArray); // Pushing passArray into passes
      if (i === 1) {
        setSortedIndices((prevSortedIndices) => [...prevSortedIndices, 0]);
      }
      setSortedIndices((prevSortedIndices) => [...prevSortedIndices, i]); // Mark the element as sorted
    }

    passes.push([...newArray]); // Pushing the final sorted array into passes
    setArrayPasses([...passes]); // Setting the array passes
    setSorting(false);
    const endTime = performance.now();
    setTimeTaken(endTime - startTime);
  }

  async function handleMergeSort() {
    const startTime = performance.now();

    setSorting(true);
    let newArray = [...randomArray];
    await mergeSort(newArray, 0, newArray.length - 1);
    const newIndices = [];
    for (let index = 0; index < newArray.length; index++) {
      newIndices.push(index);
    }

    setSortedIndices((prevSortedIndices) => {
      return [...prevSortedIndices, ...newIndices];
    });
    setSorting(false);

    const endTime = performance.now();
    setTimeTaken(endTime - startTime);
  }

  async function mergeSort(arr, l, r) {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      await mergeSort(arr, l, m);
      await mergeSort(arr, m + 1, r);
      await merge(arr, l, m, r);
    }
  }

  async function merge(arr, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = new Array(n1);
    const R = new Array(n2);
    const newIndices = [];

    for (let i = 0; i < n1; i++) {
      setActiveIndex(i);
      L[i] = arr[l + i];
    }
    for (let j = 0; j < n2; j++) {
      setActiveIndex(j);
      R[j] = arr[m + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
        setSwappedIndices([i, j]);
      } else {
        arr[k] = R[j];
        j++;
        setSwappedIndices([i, j]);
      }
      k++;
      setRandomArray([...arr]); // Update the array during sorting
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed)); // Delay for visualization
    }

    setSwappedIndices([]);

    while (i < n1) {
      setActiveIndex(i);
      setSwappedIndices([i, k]);
      arr[k] = L[i];
      i++;
      k++;
      setRandomArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
    }

    while (j < n2) {
      setActiveIndex(j);
      setSwappedIndices([j, k]);
      arr[k] = R[j];
      j++;
      k++;
      setRandomArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
    }

    const newIndex = [];
    for (let index = l; index <= r; index++) {
      newIndex.push(index);
    }

    setSortedIndices((prevSortedIndices) => {
      return [...prevSortedIndices, ...newIndex];
    });
    setSwappedIndices([]);
  }

  async function handleQuickSort() {
    const startTime = performance.now();

    setSorting(true);
    let newArray = [...randomArray];
    await quickSort(newArray, 0, newArray.length - 1);
    setSorting(false);
    setActiveIndex(-1);
    setPivotIndex(-1);
    setSortedIndices([]);
    const newIndices = [];
    for (let index = 0; index < newArray.length; index++) {
      newIndices.push(index);
    }
    setSortedIndices(newIndices);

    const endTime = performance.now();
    setTimeTaken(endTime - startTime);
  }

  async function quickSort(arr, low, high) {
    if (low < high) {
      let pi = await partition(arr, low, high);

      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  }

  async function partition(arr, low, high) {
    let pivot = arr[high];
    setPivotIndex(high);
    let i = low - 1;
    for (let j = low; j < high; j++) {
      setActiveIndex(j);
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
      if (arr[j] < pivot) {
        setSwappedIndices([i + 1, j]);
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setRandomArray([...arr]);
        setSwappedIndices([]);
      }
    }
    setSwappedIndices([i + 1, high]);
    let swap = arr[i + 1];
    arr[i + 1] = arr[high]; // Fix assignment here
    arr[high] = swap;
    setSwappedIndices([]);
    setRandomArray([...arr]);
    setPivotIndex(-1);
    return i + 1;
  }

  return (
    <div className="bg-cyan-50 h-screen">
      <Toaster />
      <h1 className="text-4xl py-6 uppercase font-bold text-center pt-6 text-cyan-900 ">
        Sorting
      </h1>
      <div className="flex flex-col items-center justify-center h-2/3 py-12 ">
        <div className="flex flex-row items-end justify-center min-h-60 bg-cyan-100  rounded-lg px-4  shadow-lg">
          {randomArray.map((value, index) => (
            <div key={index} className="flex flex-col">
              <div
                className={`h-auto ${
                  pivotIndex === index
                    ? "bg-green-700"
                    : swappedIndices.includes(index)
                    ? "bg-yellow-800"
                    : sortedIndices.includes(index)
                    ? "bg-pink-500"
                    : minIndex === index
                    ? "bg-red-900"
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
            </div>
          ))}
        </div>

        <div className=" flex flex-col">
          <div className="flex flex-row items-center gap-3 text-[#40A2E3] font-bold text-lg justify-center pt-8">
            Size of an Array
            <InputText
              value={numberOfElements}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 1 && value <= 20) {
                  setNumberOfElements(value);
                } else if (value < 1) {
                  setNumberOfElements(1);
                } else {
                  setNumberOfElements(20);
                }
              }}
              placeholder="Enter Length of Array"
              className="rounded-md text-black font-thin"
            />
            <button
              disabled={sorting}
              onClick={handleGenerate}
              className="disabled:opacity-80 disabled:hover:bg-green-500 py-1 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none shadow-md hover:shadow-lg transition duration-300 text-base"
            >
              Generate
            </button>
          </div>
          <p className="text-red-600 font-medium text-center">
            Note : The value of size varies from 1 to 20
          </p>
        </div>

        <div className="py-4">
          <div className="flex flex-row gap-[37px] items-center ">
            <p> Select Algorithm </p>
            <Dropdown
              value={selectedAlgorithm}
              onChange={(e) => {
                setSelectedAlgorithm(e.target.value);
                setSortingOptionSelected(e.target.value);
                console.log("Event.target : ", e.target.value);
              }}
              options={sortingAlgorithms}
              optionLabel="name"
              placeholder="Select a sorting algorithm"
              className="w-full md:w-64 border rounded p-2 focus:outline-none text-cyan-500 font-medium bg-cyan-100 shadow-md"
              panelClassName="bg-white  border rounded shadow-md text-cyan-800 shadow-2xl"
              dropdownIcon="pi pi-chevron-down"
            />
          </div>

          <div className="flex flex-row gap-2 items-center ">
            <p> Select Sorting Speed </p>
            <Dropdown
              value={sortingSpeed}
              onChange={(e) => {
                let speedValue = e.target.value.speedVal;
                let newSpeedFactor = speedValue.slice(0, -1);
                console.log("newSpeedValue is : ", newSpeedFactor);
                let value = 1000 / (2 * newSpeedFactor);
                setSortingSpeed(value); // Set speed to newSpeedValue, not speedValue
              }}
              options={sortingSpeedFactor}
              optionLabel="speedVal"
              placeholder="Select sorting speed"
              className="w-full md:w-64 border rounded p-2 focus:outline-none text-cyan-500 font-medium bg-cyan-100 shadow-md"
              panelClassName="bg-white border rounded shadow-md text-cyan-800 shadow-2xl"
              dropdownIcon="pi pi-chevron-down"
            />
          </div>
        </div>
        <Button
          label="Submit"
          onClick={submitSortingMethodHandler}
          className="bg-blue-500 disabled:opacity-55 hover:bg-blue-700 text-white font-bold py-4 px-5 rounded mt-4 shadow-md hover:shadow-lg transition duration-300"
          disabled={sorting}
        />
        {timeTaken && (
          <p className="text-red-600 mt-4 font-bold text-center">
            Time taken: {timeTaken / 1000} s
          </p>
        )}
      </div>
      <br />  <br />
      <div className="py-8 bg-cyan-50">
        {arrayPasses.map((passArray, passIndex) => (
          <div
            key={passIndex}
            className="flex flex-row justify-evenly items-center"
          >
            <p className="font-bold text-lg mt-4">
              {selectedAlgorithm.name} Sort Pass {passIndex + 1}
            </p>
            <div className="flex justify-center">
              {passArray.map((value, index) => (
                <div
                  key={index}
                  className="mx-1 bg-[#40A2E3] text-white font-bold py-2 px-2 rounded"
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GenerateRandomArray;
