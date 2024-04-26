import React from "react";
import SearchNavbar from "../components/SearchNavbar";
import { useSelector } from "react-redux";
import RandomArray from "../components/RandomArray";

function LinearSearch() {
  const searchElement = useSelector((state) => state.searchElement);
  console.log(
    "Search Elemt in Linear Search is : ",
    searchElement.searchElement
  );
  return (
    <div>
      <SearchNavbar />
      Welcome to Linear Search
      <RandomArray />
    </div>
  );
}

export default LinearSearch;
