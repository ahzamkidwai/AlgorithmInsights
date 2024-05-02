import React, { useState } from "react";
import "react-dropdown/style.css";
import { Button } from "@material-tailwind/react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import toast, { Toaster } from "react-hot-toast";

function CompareSorting() {
  const [numberOfElements, setNumberOfElements] = useState(10);
  const [commonArray, setCommonArray] = useState(generateRandomArray());
  const [array1, setArray1] = useState([...commonArray]);
  const [array2, setArray2] = useState([...commonArray]);

  const [pivotIndex1, setPivotIndex1] = useState(-1);
  const [activeIndex1, setActiveIndex1] = useState(-1);
  const [minIndex1, setMinIndex1] = useState(-1);

  const [pivotIndex2, setPivotIndex2] = useState(-1);
  const [activeIndex2, setActiveIndex2] = useState(-1);
  const [minIndex2, setMinIndex2] = useState(-1);

  const [swappedIndices1, setSwappedIndices1] = useState([]);
  const [sortedIndices1, setSortedIndices1] = useState([]);

  const [swappedIndices2, setSwappedIndices2] = useState([]);
  const [sortedIndices2, setSortedIndices2] = useState([]);

  const [totalElements, setTotalElements] = useState(10);
  const [sorting, setSorting] = useState(false);

  const [sortingOptions, setSortingOptions] = useState({
    firstSortingOption: "",
    secondSortingOption: "",
  });

  const [timeTaken1, setTimeTaken1] = useState();
  const [timeTaken2, setTimeTaken2] = useState();

  const sortingSpeed = 200;

  const sortingAlgorithmsOptions = [
    { name: "Selection Sort" },
    { name: "Bubble Sort" },
    { name: "Merge Sort" },
    { name: "Quick Sort" },
    { name: "Insertion Sort" },
  ];

  function changeSelectedAlgorithmHandler(value, option) {
    setSortingOptions((prevState) => ({
      ...prevState,
      [option]: value,
    }));
  }

  function checkForSortedArray(array) {
    let f = true;
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] >= array[i + 1]) {
        return false;
      }
    }
    console.log("Array sorted nikla hai bhai");
    return true;
  }

  function sortArraysHandler() {
    const firstOption = sortingOptions.firstSortingOption;
    const secondOption = sortingOptions.secondSortingOption;
    // console.log("First Sorting Option is : ", firstOption);
    // console.log("Second Sorting Option is : ", secondOption);

    if (!firstOption && !secondOption) {
      toast.error("Select sorting algorithms");
      return;
    } else if (!firstOption && secondOption) {
      toast.error("Select sorting algorithms for first array");
      return;
    } else if (firstOption && !secondOption) {
      toast.error("Select sorting algorithms for second array");
      return;
    }

    const sortArray1 = async () => {
      if (firstOption === "Bubble Sort") {
        await handleBubbleSort(array1, 1);
      } else if (firstOption === "Selection Sort") {
        await handleSelectionSort(array1, 1);
      } else if (firstOption === "Merge Sort") {
        await handleMergeSort(array1, 1);
      } else if (firstOption === "Quick Sort") {
        await handleQuickSort(array1, 1);
      } else if (firstOption === "Insertion Sort") {
        await handleInsertionSort(array1, 1);
      }
    };

    const sortArray2 = async () => {
      if (secondOption === "Bubble Sort") {
        await handleBubbleSort(array2, 2);
      } else if (secondOption === "Selection Sort") {
        await handleSelectionSort(array2, 2);
      } else if (secondOption === "Merge Sort") {
        await handleMergeSort(array2, 2);
      } else if (secondOption === "Quick Sort") {
        await handleQuickSort(array2, 2);
      } else if (secondOption === "Insertion Sort") {
        await handleInsertionSort(array2, 2);
      }
    };

    Promise.all([sortArray1(), sortArray2()]);
  }

  function generateRandomArray() {
    return Array.from({ length: numberOfElements }, () => {
      let value;
      do {
        value = Math.floor(Math.random() * 100);
      } while (value <= 0);
      return value;
    });
  }

  function handleGenerate() {
    const array = generateRandomArray();
    setCommonArray(array);
    setArray1([...array]);
    setArray2([...array]);
    setSortingOptions({
      firstSortingOption: "",
      secondSortingOption: "",
    });
    setSwappedIndices1([]);
    setSwappedIndices2([]);

    setSortedIndices1([]);
    setSortedIndices2([]);

    setSorting(false);

    setActiveIndex1(-1);
    setActiveIndex2(-1);

    setPivotIndex1(-1);
    setPivotIndex2(-1);

    setMinIndex1(-1);
    setMinIndex2(-1);

    setTimeTaken1();
    setTimeTaken2();
  }

  async function handleBubbleSort(newArray, order) {
    const startTime = performance.now();

    setSorting(true);

    let len = newArray.length;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (order === 1) {
          setActiveIndex1(j); // Highlight current element being compared
        } else if (order === 2) {
          setActiveIndex2(j);
        }
        await new Promise((resolve) => setTimeout(resolve, sortingSpeed)); // Delay to visualize sorting
        if (newArray[j] > newArray[j + 1]) {
          // Swap elements
          let temp = newArray[j];
          newArray[j] = newArray[j + 1];
          newArray[j + 1] = temp;
          if (order === 1) {
            setArray1([...newArray]); // Update the array1 after swapping
          } else if (order === 2) {
            setArray2([...newArray]); // Update the array2 after swapping
          }
        }
      }
      if (order === 1) {
        setSortedIndices1((prevSortedIndices) => [
          ...prevSortedIndices,
          len - 1 - i,
        ]);
      } else if (order === 2) {
        setSortedIndices2((prevSortedIndices) => [
          ...prevSortedIndices,
          len - 1 - i,
        ]);
      }
    }
    if (order === 1) {
      setActiveIndex1(-1); // Reset active index
    } else if (order === 2) {
      setActiveIndex2(-1);
    }
    setSorting(false);
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    console.log("Time taken is (using Bubble Sort) : ", timeTaken);

    if (order === 1) setTimeTaken1(timeTaken);
    else if (order === 2) setTimeTaken2(timeTaken);
  }

  async function handleSelectionSort(newArray, order) {
    const startTime = performance.now();

    setSorting(true);
    let len = newArray.length;

    for (let i = 0; i < len - 1; i++) {
      let minimumIndex = i;

      if (order === 1) {
        setActiveIndex1(i);
      } else if (order === 2) {
        setActiveIndex2(i);
      }

      for (let j = i + 1; j < len; j++) {
        if (order === 1) {
          setActiveIndex1(j);
        } else if (order === 2) {
          setActiveIndex2(j);
        }

        await new Promise((resolve) => setTimeout(resolve, sortingSpeed));

        if (newArray[j] < newArray[minimumIndex]) {
          minimumIndex = j;
          if (order === 1) {
            setMinIndex1(minimumIndex);
          } else if (order === 2) {
            setMinIndex2(minimumIndex);
          }
        }
      }
      let temp = newArray[i];
      newArray[i] = newArray[minimumIndex];
      newArray[minimumIndex] = temp;

      if (order === 1) {
        setArray1([...newArray]);
        setSortedIndices1((prevSortedIndices) => [...prevSortedIndices, i]); // Mark the element as sorted
      } else if (order === 2) {
        setArray2([...newArray]);
        setSortedIndices2((prevSortedIndices) => [...prevSortedIndices, i]); // Mark the element as sorted
      }
    }
    if (order === 1) {
      setSortedIndices1((prevSortedIndices) => [...prevSortedIndices, len - 1]); // Mark the last element as sorted
    } else if (order === 2) {
      setSortedIndices2((prevSortedIndices) => [...prevSortedIndices, len - 1]); // Mark the last element as sorted
    }
    setSorting(false);
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    console.log("Time taken is (using Bubble Sort) : ", timeTaken);

    if (order === 1) setTimeTaken1(timeTaken);
    else if (order === 2) setTimeTaken2(timeTaken);
  }

  async function handleInsertionSort(newArray, order) {
    const startTime = performance.now();
    setSorting(true);
    let len = newArray.length;

    if (order === 1) {
      setSortedIndices1([0]); // Mark the first element as sorted
    } else if (order === 2) {
      setSortedIndices2([0]); // Mark the first element as sorted
    }

    for (let i = 1; i < len; i++) {
      let key = newArray[i];
      let j = i - 1;

      if (order === 1) {
        setActiveIndex1(i);
      } else if (order === 2) {
        setActiveIndex2(i);
      }

      while (j >= 0 && newArray[j] > key) {
        if (order === 1) {
          setActiveIndex1(j);
        } else if (order === 2) {
          setActiveIndex2(j);
        }

        await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
        newArray[j + 1] = newArray[j];
        j = j - 1;

        if (order === 1) {
          setArray1([...newArray]);
        } else if (order === 2) {
          setArray2([...newArray]);
        }
      }
      newArray[j + 1] = key;

      if (order === 1) {
        setArray1([...newArray]);
        setSortedIndices1((prevSortedIndices) => [...prevSortedIndices, i]); // Mark the element as sorted
      } else if (order === 2) {
        setArray2([...newArray]);
        setSortedIndices2((prevSortedIndices) => [...prevSortedIndices, i]); // Mark the element as sorted
      }
    }

    if (order === 1) {
      setSortedIndices1((prevSortedIndices) => [...prevSortedIndices, len - 1]); // Mark the last element as sorted
    } else if (order === 2) {
      setSortedIndices2((prevSortedIndices) => [...prevSortedIndices, len - 1]); // Mark the last element as sorted
    }

    setSorting(false);
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    console.log("Time taken is (using Insertion Sort): ", timeTaken);

    if (order === 1) setTimeTaken1(timeTaken);
    else if (order === 2) setTimeTaken2(timeTaken);
  }

  async function handleQuickSort(newArray, order) {
    const startTime = performance.now();
    setSorting(true);
    await quickSort(newArray, 0, newArray.length - 1, order);
    setSorting(false);
    if (order === 1) {
      setActiveIndex1(-1);
      setPivotIndex1(-1);
    } else if (order === 2) {
      setActiveIndex2(-1);
      setPivotIndex2(-1);
    }

    const newIndices = [];
    for (let index = 0; index < newArray.length; index++) {
      newIndices.push(index);
    }
    if (order === 1) {
      setSortedIndices1([...newIndices]);
    } else if (order === 2) {
      setSortedIndices2([...newIndices]);
    }
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    console.log("Time taken is (using Quick Sort) : ", timeTaken);

    if (order === 1) setTimeTaken1(timeTaken);
    else if (order === 2) setTimeTaken2(timeTaken);
  }

  async function quickSort(arr, low, high, order) {
    if (low < high) {
      let pi = await partition(arr, low, high, order);

      await quickSort(arr, low, pi - 1, order);
      await quickSort(arr, pi + 1, high, order);
    }
  }

  async function partition(arr, low, high, order) {
    let pivot = arr[high];
    if (order === 1) {
      setPivotIndex1(high);
    } else if (order === 2) {
      setPivotIndex2(high);
    }
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (order === 1) {
        setActiveIndex1(j);
      } else if (order === 2) {
        setActiveIndex2(j);
      }
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        if (order === 1) {
          setSwappedIndices1([i, j]);
          setArray1([...arr]);
          setSwappedIndices1([]);
        } else if (order === 2) {
          setSwappedIndices2([i, j]);
          setArray2([...arr]);
          setSwappedIndices2([]);
        }
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    if (order === 1) {
      setArray1([...arr]);
      setPivotIndex1(-1);
    } else if (order === 2) {
      setArray2([...arr]);
      setPivotIndex2(-1);
    }
    return i + 1;
  }

  async function handleMergeSort(newArray, order) {
    const startTime = performance.now();

    setSorting(true);

    console.log("Array is (inside MergeSort Before Sorting) : ", newArray);
    console.log(
      "Array size is  (inside MergeSort Before Sorting) : ",
      newArray.length
    );

    await mergeSort(newArray, 0, newArray.length - 1, order);
    const newIndices = [];
    for (let index = 0; index < newArray.length; index++) {
      newIndices.push(index);
    }
    if (order === 1) {
      setSortedIndices1([...newIndices]);
    } else if (order === 2) {
      setSortedIndices2([...newIndices]);
    }
    setSorting(false);

    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    console.log("Time taken is (using Merge Sort) : ", timeTaken);

    /* console.log("Array is (inside MergeSort After Sorting) : ", newArray);
    console.log(
      "Array size is  (inside MergeSort After Sorting) : ",
      newArray.length
    ); */

    if (order === 1) setTimeTaken1(timeTaken);
    else if (order === 2) setTimeTaken2(timeTaken);
  }

  async function mergeSort(arr, l, r, order) {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      await mergeSort(arr, l, m, order);
      await mergeSort(arr, m + 1, r, order);
      await merge(arr, l, m, r, order);
    }
  }

  async function merge(arr, l, m, r, order) {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) {
      if (order === 1) setActiveIndex1(i);
      else if (order === 2) setActiveIndex2(i);
      L[i] = arr[l + i];
    }
    for (let j = 0; j < n2; j++) {
      if (order === 1) setActiveIndex1(j);
      else if (order === 2) setActiveIndex2(j);
      R[j] = arr[m + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        if (order === 1) setActiveIndex1(i);
        else if (order === 2) setActiveIndex2(i);
        arr[k] = L[i];
        i++;
      } else {
        if (order === 1) setActiveIndex1(j);
        else if (order === 2) setActiveIndex2(j);
        arr[k] = R[j];
        j++;
      }
      k++;

      if (order === 1) {
        setArray1([...arr]);
      } else if (order === 2) {
        setArray2([...arr]);
      }
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
    }

    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;

      if (order === 1) {
        setArray1([...arr]);
      } else if (order === 2) {
        setArray2([...arr]);
      }
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
    }

    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;

      if (order === 1) {
        setArray1([...arr]);
      } else if (order === 2) {
        setArray2([...arr]);
      }
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
    }

    const newIndex = [];
    for (let index = l; index <= r; index++) {
      newIndex.push(index);
    }

    if (order === 1) {
      setSortedIndices1((prevSortedIndices) => [
        ...prevSortedIndices,
        ...newIndex,
      ]);
    } else if (order === 2) {
      setSortedIndices2((prevSortedIndices) => [
        ...prevSortedIndices,
        ...newIndex,
      ]);
    }
  }

  return (
    <div className="bg-cyan-50 h-full">
      <Toaster />
      <h1 className="text-4xl uppercase font-bold text-center pt-6 text-cyan-900 ">
        Compare Sorting
      </h1>
      <div className=" min-h-96 pt-8 pb-6 flex flex-row items-center justify-evenly sm:min-h-60">
        <div className="flex flex-col gap-8">
          <div className="flex items-end min-h-60 rounded-xl px-2 bg-cyan-100 shadow-2xl overflow-x-auto">
            {array1.map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`h-auto ${
                    pivotIndex1 === index
                      ? "bg-green-700"
                      : swappedIndices1.includes(index)
                      ? "bg-yellow-800"
                      : sortedIndices1.includes(index)
                      ? "bg-pink-500"
                      : minIndex1 === index
                      ? "bg-red-900"
                      : activeIndex1 === index
                      ? "bg-yellow-500"
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
                <p className="mt-1 font-bold text-[#40A2E3]">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex items-end min-h-48 rounded-xl px-2 bg-cyan-100 shadow-2xl overflow-x-auto">
            {array2.map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`h-auto ${
                    pivotIndex2 === index
                      ? "bg-green-700"
                      : swappedIndices2.includes(index)
                      ? "bg-yellow-800"
                      : sortedIndices2.includes(index)
                      ? "bg-pink-500"
                      : minIndex2 === index
                      ? "bg-red-900"
                      : activeIndex2 === index
                      ? "bg-yellow-500"
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
                <p className="mt-1 font-bold text-[#40A2E3]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="  flex flex-row items-start justify-evenly">
        {/* For array1 */}

        <Dropdown
          value={setSortingOptions.firstSortingOption}
          onChange={(e) => {
            const selectedOption = e.value ? e.value.name : "";
            console.log("First selected option : ", selectedOption);
            changeSelectedAlgorithmHandler(
              selectedOption,
              "firstSortingOption"
            );
          }}
          options={sortingAlgorithmsOptions}
          optionLabel="name"
          placeholder="Select first sorting option"
          className="w-full md:w-64 border rounded p-2 focus:outline-none text-cyan-500 font-medium bg-cyan-100 shadow-md"
          panelClassName="bg-white  border rounded shadow-md text-cyan-800 shadow-2xl"
          dropdownIcon="pi pi-chevron-down"
        />

        {/* For array2 */}

        <Dropdown
          value={setSortingOptions.secondSortingOption}
          onChange={(e) => {
            const selectedOption = e.value ? e.value.name : "";
            console.log("Second selected option : ", selectedOption);
            changeSelectedAlgorithmHandler(
              selectedOption,
              "secondSortingOption"
            );
          }}
          options={sortingAlgorithmsOptions}
          optionLabel="name"
          placeholder="Select second sorting option "
          className="w-full md:w-64 border rounded p-2 focus:outline-none text-cyan-500 font-medium bg-cyan-100 shadow-md"
          panelClassName="bg-white  border rounded shadow-md text-cyan-800 shadow-2xl"
          dropdownIcon="pi pi-chevron-down"
        />
      </div>

      <div className=" flex flex-col">
        <div className="flex flex-row items-center gap-3 text-[#40A2E3] font-bold text-lg justify-center pt-8">
          Size of an Array
          <InputText
            value={numberOfElements}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value >= 1 && value <= 30) {
                setNumberOfElements(value);
              } else if (value < 1) {
                setNumberOfElements(1);
              } else {
                setNumberOfElements(30);
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
          Note : The value of size varies from 1 to 30
        </p>
      </div>

      <div className="flex flex-col pb-8 gap-2 items-center justify-center my-4">
        <Button
          className="bg-[#40A2E3] disabled:opacity-55 hover:bg-[#2d6d98] text-white font-bold py-2 px-4 rounded mt-4 shadow-md hover:shadow-lg transition duration-300"
          variant="filled"
          color="blue"
          onClick={sortArraysHandler}
        >
          Sort Arrays
        </Button>
        <div className="flex flex-row justify-evenly gap-8">
          {timeTaken1 && (
            <p className="font-bold">
              Time Complexity for {sortingOptions.firstSortingOption} :
              <span className="text-[#40A2E3]">
                {timeTaken1 / 1000} seconds
              </span>
            </p>
          )}
          {timeTaken2 && (
            <p className="font-bold">
              Time Complexity for {sortingOptions.secondSortingOption} :
              <span className="text-[#40A2E3]">
                {timeTaken2 / 1000} seconds
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompareSorting;
