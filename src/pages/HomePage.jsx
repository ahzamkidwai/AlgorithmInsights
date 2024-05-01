import React from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div className=" ">
      <div className="mx-28 bg-[#F7EBE8] px-8 py-8">
        <h1 className="font-bold uppercase text-4xl text-sky-800">
          Welcome to Algorithm Insights
        </h1>
        <p>
          Algorithm Insights is your go-to destination for visualizing sorting
          and searching algorithms. Whether you're a student, educator, or
          enthusiast, our platform offers a comprehensive understanding of
          various sorting and searching techniques through interactive
          visualizations.
        </p>
        <br />
        <h1 className="font-bold uppercase text-4xl text-sky-800">
          Sorting Algorithms
        </h1>
        <p>
          <br />
          Explore the intricacies of sorting algorithms such as Selection Sort,
          Insertion Sort, Merge Sort, Quick Sort, and Bubble Sort. Witness how
          each algorithm operates in real-time, gaining insights into their
          efficiency and performance.
          <NavLink to="/sorting">
            <span className="cursor-pointer text-sky-800 font-bold hover:underline mx-1">
              Explore Sorting
            </span>
          </NavLink>
        </p>
        <br />
        <h1 className="font-bold uppercase text-4xl text-sky-800">
          Searching Algorithms
        </h1>
        <p>
          <br />
          Delve into the world of searching algorithms with our visualizations
          of
          <NavLink to="/linear-search">
            <span className="cursor-pointer text-sky-800 font-bold hover:underline mx-1">
              Linear Search
            </span>
          </NavLink>
          and
          <NavLink to="/binary-search">
            <span className="cursor-pointer text-sky-800 font-bold hover:underline mx-1">
              Binary Search.
            </span>
          </NavLink>
          See how these algorithms traverse through data to find the desired
          element, allowing you to grasp their functionality with ease.
        </p>
        <br />
        <h1 className="font-bold uppercase text-4xl text-sky-800">
          Compare Sorting Algorithms
        </h1>
        <p>
          <br />
          Our unique feature enables you to compare two sorting algorithms side
          by side. Witness the differences in their approach and efficiency, and
          obtain valuable insights into which algorithm suits your needs best.
          After the sorting process is complete, Algorithm Insights provides you
          with detailed time-speed comparisons, aiding you in making informed
          decisions.
          <NavLink to="/compare-sorting">
            <span className="cursor-pointer text-sky-800 font-bold hover:underline mx-1">
              Compare Sorting page
            </span>
          </NavLink>
        </p>

        <br />
        <p>
          At Algorithm Insights, we aim to make complex algorithms
          understandable and accessible to everyone. Join us on our journey to
          unravel the mysteries of algorithms and gain valuable insights into
          their inner workings. Start exploring now and enhance your
          understanding of sorting and searching techniques like never before!
        </p>
      </div>
    </div>
  );
};

export default HomePage;
