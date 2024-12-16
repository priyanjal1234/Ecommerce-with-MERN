import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const Hero = () => {
  const [isActive, setisActive] = useState(false)
  
  let { allProducts, filteredProducts } = useSelector((state) => state.product);

  let productsToRender = isActive ? filteredProducts : allProducts
  

  return (
    <div className="w-full hero px-5 py-5">
      <h1 className="text-2xl font-semibold">Discover Amazing Products</h1>
      <SearchBar isActive = {isActive} setisActive = {setisActive}/>
      <div className="mt-6 flex flex-wrap gap-6">
        {productsToRender?.length > 0 ? (
          productsToRender.map((product) => (
            <ProductCard product={product} key={product?._id} />
          ))
        ) : (
          <p className="text-gray-500">No products available to display.</p>
        )}
      </div>
    </div>
  );
};

export default Hero;