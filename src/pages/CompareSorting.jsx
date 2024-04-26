import React, { useState } from "react";
import "react-dropdown/style.css";
import { Button } from "@material-tailwind/react";

import { Dropdown } from "primereact/dropdown";

function CompareSorting() {
  const [commonArray, setCommonArray] = useState(generateRandomArray());
  const [array1, setArray1] = useState(commonArray);
  const [array2, setArray2] = useState(commonArray);

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

  const sortingSpeed = 500;

  const sortingAlgorithmsOptions = [
    { name: "Selection Sort" },
    { name: "Bubble Sort" },
    { name: "Merge Sort" },
    { name: "Quick Sort" },
  ];

  function changeSelectedAlgorithmHandler(value, option) {
    setSortingOptions((prevState) => ({
      ...prevState,
      [option]: value,
    }));
  }

  function sortArraysHandler() {
    const firstOption = sortingOptions.firstSortingOption;
    const secondOption = sortingOptions.secondSortingOption;
    console.log("First Sorting Option is : ", firstOption);
    console.log("Second Sorting Option is : ", secondOption);

    const sortArray1 = async () => {
      if (firstOption === "Bubble Sort") {
        console.log(`(firstOption === "Bubble Sort")`);
        await handleBubbleSort(array1, 1);
      } else if (firstOption === "Selection Sort") {
        console.log(`(firstOption === "Selection Sort")`);
        await handleSelectionSort(array1, 1);
      } else if (firstOption === "Merge Sort") {
        console.log(`(firstOption === "Merge Sort")`);
        await handleMergeSort(array1, 1);
      } else if (firstOption === "Quick Sort") {
        console.log(`(firstOption === "Quick Sort")`);
        await handleQuickSort(array1, 1);
      }
    };

    const sortArray2 = async () => {
      if (secondOption === "Bubble Sort") {
        console.log(`(secondOption === "Bubble Sort")`);
        await handleBubbleSort(array2, 2);
      } else if (secondOption === "Selection Sort") {
        console.log(`(secondOption === "Selection Sort")`);
        await handleSelectionSort(array2, 2);
      } else if (secondOption === "Merge Sort") {
        console.log(`(secondOption === "Merge Sort")`);
        await handleMergeSort(array2, 2);
      } else if (secondOption === "Quick Sort") {
        console.log(`(secondOption === "Quick Sort")`);
        await handleQuickSort(array2, 2);
      }
    };

    Promise.all([sortArray1(), sortArray2()]);
  }

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
    setCommonArray(array);
    setArray1(array);
    setArray2(array);
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
  }

  async function handleBubbleSort(newArray, order) {
    console.log("bubble sort function is called by array " + order);
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
    if (order === 1)
      console.log("After Bubble Sort Algorithm Array1 : ", array1);
    else if (order === 2)
      console.log("After Bubble Sort Algorithm Array2 : ", array2);
  }

  async function handleSelectionSort(newArray, order) {
    console.log("selection sort function is called by array " + order);
    setSorting(true);
  
    let len = newArray.length;
  
    for (let i = 0; i < len - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < len; j++) {
        if (order === 1) {
          setActiveIndex1(j); // Highlight current element being compared
        } else if (order === 2) {
          setActiveIndex2(j);
        }
        await new Promise((resolve) => setTimeout(resolve, sortingSpeed)); // Delay to visualize sorting
        if (newArray[j] < newArray[minIndex]) {
          minIndex = j;
        }
      }
  
      // Swap elements
      let temp = newArray[i];
      newArray[i] = newArray[minIndex];
      newArray[minIndex] = temp;
      
      if (order === 1) {
        setArray1([...newArray]); // Update the array1 after swapping
      } else if (order === 2) {
        setArray2([...newArray]); // Update the array2 after swapping
      }
  
      if (order === 1) {
        setSortedIndices1((prevSortedIndices) => [
          ...prevSortedIndices,
          i,
        ]);
      } else if (order === 2) {
        setSortedIndices2((prevSortedIndices) => [
          ...prevSortedIndices,
          i,
        ]);
      }
    }
  
    if (order === 1) {
      setActiveIndex1(-1); // Reset active index
    } else if (order === 2) {
      setActiveIndex2(-1);
    }
    
    setSorting(false);
    
    if (order === 1)
      console.log("After Selection Sort Algorithm Array1 : ", array1);
    else if (order === 2)
      console.log("After Selection Sort Algorithm Array2 : ", array2);
  }
  

  async function handleQuickSort(newArray, order) {
    setSorting(true);
    // let newArray = [...commonArray];
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
    // console.log("NewIndices are : ", newIndices);
    if (order === 1) {
      setSortedIndices1((prevSortedIndices) => {
        return [...prevSortedIndices, ...newIndices];
      });
    } else if (order === 2) {
      setSortedIndices2((prevSortedIndices) => {
        return [...prevSortedIndices, ...newIndices];
      });
    }
  }

  async function quickSort(arr, low, high, order) {
    if (low < high) {
      let pi = await partition(arr, low, high, order);

      await quickSort(arr, low, pi - 1, order);
      await quickSort(arr, pi + 1, high, order);
      const newIndex = [];
      for (let index = low; index < high; index++) {
        newIndex.push(index);
      }
      console.log("Newindex in quick sort is : ", newIndex);

      if (order === 1) {
        setSortedIndices1((prevSortedIndices) => {
          return [...prevSortedIndices, newIndex];
        });
      } else if (order === 2) {
        setSortedIndices2((prevSortedIndices) => {
          return [...prevSortedIndices, newIndex];
        });
      }
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
        if (order === 1) {
          setSwappedIndices1([i + 1, j]);
        } else if (order === 2) {
          setSwappedIndices2([i + 1, j]);
        }
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        // setCommonArray([...arr]);
        if (order === 1) {
          setArray1([...arr]);
        } else if (order === 2) {
          setArray2([...arr]);
        }
        if (order === 1) {
          setSwappedIndices1([]);
        } else if (order === 2) {
          setSwappedIndices2([]);
        }
      }
    }
    if (order === 1) {
      setSwappedIndices1([i + 1, high]);
    } else if (order === 2) {
      setSwappedIndices2([i + 1, high]);
    }

    let swap = arr[i + 1];
    arr[i + 1] = arr[high]; // Fix assignment here
    arr[high] = swap;
    if (order === 1) {
      setSwappedIndices1([]);
    } else if (order === 2) {
      setSwappedIndices2([]);
    }
    // setCommonArray([...arr]);
    if (order === 1) {
      setArray1([...arr]);
    } else if (order === 2) {
      setArray2([...arr]);
    }
    if (order === 1) {
      setPivotIndex1(-1);
    } else if (order === 2) {
      setPivotIndex2(-1);
    }
    return i + 1;
  }

  async function handleMergeSort(newArray, order) {
    setSorting(true);
    // let newArray = [...commonArray];
    await mergeSort(newArray, 0, newArray.length - 1, order);
    const newIndices = [];
    for (let index = 0; index < newArray.length; index++) {
      newIndices.push(index);
    }
    // console.log("NewIndices are : ", newIndices);
    if (order === 1) {
      setSortedIndices1((prevSortedIndices) => {
        return [...prevSortedIndices, ...newIndices];
      });
    } else if (order === 2) {
      setSortedIndices2((prevSortedIndices) => {
        return [...prevSortedIndices, ...newIndices];
      });
    }

    setSorting(false);
    // setSwappedIndices([]);
  }

  async function mergeSort(arr, l, r, order) {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      await mergeSort(arr, l, m);
      await mergeSort(arr, m + 1, r);
      await merge(arr, l, m, r, order);
    }
  }

  async function merge(arr, l, m, r, order) {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = new Array(n1);
    const R = new Array(n2);
    const newIndices = [];

    for (let i = 0; i < n1; i++) {
      if (order === 1) {
        setActiveIndex1(i);
      } else if (order === 2) {
        setActiveIndex2(i);
      }
      L[i] = arr[l + i];
    }
    for (let j = 0; j < n2; j++) {
      if (order === 1) {
        setActiveIndex1(i);
      } else if (order === 2) {
        setActiveIndex2(i);
      }
      R[j] = arr[m + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
        if (order === 1) {
          setSwappedIndices1([i, j]);
        } else if (order === 2) {
          setSwappedIndices2([i, j]);
        }
      } else {
        arr[k] = R[j];
        j++;
        if (order === 1) {
          setSwappedIndices1([i, j]);
        } else if (order === 2) {
          setSwappedIndices2([i, j]);
        }
      }
      k++;
      // setCommonArray([...arr]); // Update the array during sorting
      if (order === 1) {
        setArray1([...newArray]);
      } else if (order === 2) {
        setArray2([...newArray]);
      }
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed)); // Delay for visualization
    }

    if (order === 1) setSwappedIndices1([]);
    else if (order === 2) setSwappedIndices2([]);

    while (i < n1) {
      if (order === 1) {
        setActiveIndex1(i);
        setSwappedIndices1([i, k]);
      } else if (order === 2) {
        setActiveIndex2(i);
        setSwappedIndices2([i, k]);
      }

      arr[k] = L[i];
      i++;
      k++;
      // setCommonArray([...arr]);
      if (order === 1) {
        setArray1([...newArray]);
      } else if (order === 2) {
        setArray2([...newArray]);
      }
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
    }

    while (j < n2) {
      if (order === 1) {
        setActiveIndex1(i);
        setSwappedIndices1([i, k]);
      } else if (order === 2) {
        setActiveIndex2(i);
        setSwappedIndices2([i, k]);
      }
      arr[k] = R[j];
      j++;
      k++;
      // setCommonArray([...arr]);
      if (order === 1) {
        setArray1([...newArray]);
      } else if (order === 2) {
        setArray2([...newArray]);
      }
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
    }

    const newIndex = [];
    for (let index = l; index <= r; index++) {
      newIndex.push(index);
    }
    // console.log("NewIndexes are : ", newIndex);

    /*     setSortedIndices((prevSortedIndices) => {
      return [...prevSortedIndices, ...newIndex];
    });
    setSwappedIndices([]); */

    if (order === 1) {
      setSortedIndices1((prevSortedIndices) => {
        return [...prevSortedIndices, ...newIndex];
      });
      setSwappedIndices1([]);
    } else if (order === 2) {
      setSortedIndices2((prevSortedIndices) => {
        return [...prevSortedIndices, ...newIndex];
      });
      setSwappedIndices2([]);
    }
  }

  return (
    <div>
      <div className="bg-[#153448] min-h-96 flex flex-row items-center justify-evenly sm:min-h-60">
        <div className="flex flex-col justify-around gap-8 lg:flex lg:flex-row ">
          <div className="flex items-end min-h-48 border  border-[#3C5B6F] bg-[#3C5B6F]">
            {array1.map((value, index) => (
              <div key={index} className="flex flex-col ">
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
                      : "bg-[#153448]"
                  } text-white flex items-end justify-center rounded`}
                  style={{
                    height: `${value / 10}rem`,
                    width: "2rem",
                    margin: "0 0.2rem",
                    minWidth: "2rem",
                  }}
                ></div>
                <p className="mx-2 text-[#E3FEF7]">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex items-end min-h-48 border  border-[#3C5B6F] bg-[#3C5B6F]">
            {array2.map((value, index) => (
              <div key={index} className="flex flex-col ">
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
                      : "bg-[#153448]"
                  } text-white flex items-end justify-center rounded`}
                  style={{
                    height: `${value / 10}rem`,
                    width: "2rem",
                    margin: "0 0.2rem",
                    minWidth: "2rem",
                  }}
                ></div>
                <p className="mx-2 text-[#e3f4ff]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" min-h-32 bg-[#153448] flex flex-row items-start justify-evenly">
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
          placeholder="Select an Algorithm"
          className="text-[#E3FEF7]"
        />
        <Dropdown
          value={setSortingOptions.firstSortingOption}
          onChange={(e) => {
            const selectedOption = e.value ? e.value.name : "";
            console.log("Second Selections option : ", selectedOption);
            changeSelectedAlgorithmHandler(
              selectedOption,
              "secondSortingOption"
            );
          }}
          options={sortingAlgorithmsOptions}
          optionLabel="name"
          placeholder="Select an Algorithm"
          className="text-[#E3FEF7]"
        />
      </div>

      <div className="flex flex-col gap-2 items-center justify-center my-4">
        <Button
          className="uppercase px-4 py-2 rounded-none text-center bg-[#153448] text-[#e3f4ff]"
          variant="filled"
          color="blue"
          onClick={handleGenerate}
        >
          Generate Random Array
        </Button>
        <Button
          className="uppercase px-4 py-2 rounded-none text-center bg-[#153448] text-[#e3f4ff]"
          variant="filled"
          color="blue"
          onClick={sortArraysHandler}
        >
          Sort Arrays
        </Button>
      </div>
    </div>
  );
}

export default CompareSorting;
