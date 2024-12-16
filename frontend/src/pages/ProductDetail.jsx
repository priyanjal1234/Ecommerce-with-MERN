import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ProductDetail = () => {
  let { id } = useParams();
  let { allProducts } = useSelector((state) => state.product);
  const [product, setproduct] = useState({});

  // Hover zoom effect for image container

  const [iszoomed, setiszoomed] = useState(false);
  const [zoomposition, setzoomposition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let foundProduct = allProducts?.find((prod) => prod?._id === id);
    if (foundProduct) {
      setproduct(foundProduct);
    }
  }, []);

  function handleMouseEnter() {
    setiszoomed(true);
  }

  function handleMouseLeave() {
    setiszoomed(false);
  }

  function handleMouseMove(e) {
    let rect = e.target.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;
    setzoomposition({ x, y });
  }

  return (
    <div className="w-full min-h-screen bg-[#111827] p-12 text-white">
      <h2>
        This is read only if you want to shop go to{" "}
        <Link to={"/home"} className="text-purple-600">
          home
        </Link>{" "}
        and add the product to cart
      </h2>
      <h1 className="text-2xl font-semibold mb-4">{product?.name}</h1>
      <div className="w-[400px] h-fit bg-[#1F2937] rounded-lg overflow-hidden">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className="w-full h-[400px]"
        >
          <img
            className="w-full h-full object-cover"
            src={product?.image}
            alt=""
          />
          {iszoomed && (
            <div
              className="w-[100px] h-[100px] overflow-hidden absolute left-[500px] top-40"
              style={{
                backgroundImage: `url(${product?.image})`,
                backgroundPosition: `${zoomposition.x}% ${zoomposition.y}%`,
              }}
            />
          )}
        </div>
        <div className="p-4">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
            {product?.category}
          </span>
          <h3 className="text-lg font-semibold text-gray-100 mt-1">
            {product?.name}
          </h3>
          <p className="text-gray-400 text-sm mt-1 line-clamp-2">
            {product?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
