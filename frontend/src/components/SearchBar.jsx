import { Search } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredProducts } from "../redux/reducers/ProductReducer";

const SearchBar = ({isActive,setisActive}) => {
  const [searchVal, setsearchVal] = useState("");
  let { allProducts } = useSelector((state) => state.product);

  let dispatch = useDispatch();

  function handleSearch(e) {
    let value = e.target.value;
    setisActive(true)
    setsearchVal(value);

    let filtered = allProducts?.filter(
      (prod) => prod.name.toLowerCase().includes(value.toLowerCase())
    );
    console.log(filtered)
    dispatch(setFilteredProducts(filtered))
  }

  return (
    <div className="relative mt-4">
      <input
        type="text"
        placeholder="Search products..."
        className="w-[700px] pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-500"
        value={searchVal}
        onChange={handleSearch}
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
    </div>
  );
};

export default SearchBar;
