import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import GenerateRandomArray from "./components/GenerateRandomArray";
import LinearSearch from "./pages/LinearSearch";
import BinarySearch from "./pages/BinarySearch";
import CompareSorting from "./pages/CompareSorting";
import { PrimeReactProvider } from "primereact/api";
import HomePage from "./pages/HomePage";
import Search from "./pages/Search";

function App() {
  return (
    <PrimeReactProvider>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sorting" element={<GenerateRandomArray />} />
          <Route path="/search" element={<Search />} />
          <Route path="/linear-search" element={<LinearSearch />} />
          <Route path="/binary-search" element={<BinarySearch />} />
          <Route path="/compare-sorting" element={<CompareSorting />} />
        </Routes>
      </>
    </PrimeReactProvider>
  );
}

export default App;
