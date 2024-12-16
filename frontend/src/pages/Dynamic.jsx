import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

const Dynamic = () => {
  const [catProds, setcatProds] = useState([]);
  let { category } = useParams();
  let { allProducts } = useSelector((state) => state.product);


  useEffect(() => {
    let prods = allProducts?.filter(
      (prod) => prod.category.toLowerCase() === category
    );
    setcatProds(prods);
  }, [category]);


  return (
    <div className="w-full h-screen bg-[#111827] text-white">
      <Navbar />
      
      <div className="px-8 py-5 flex flex-wrap gap-8">
        {
            catProds.length === 0 ? <span>No Products for this Category</span> : catProds.map(prod => (
                <ProductCard product={prod} key={prod?._id} />
            ))
        }
      </div>
    </div>
  );
};

export default Dynamic;
