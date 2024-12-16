import { ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartService from "../services/CartService";
import { toast } from "react-toastify";
import { setCartNumber } from "../redux/reducers/CartReducer";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  let { user } = useSelector((state) => state.user);
 
  const [isDisabled, setisDisabled] = useState(false)

  let dispatch = useDispatch();
  let navigate = useNavigate()

  async function handleAddToCart() {
    try {
      let addToCartRes = await cartService.addToCart({
        user: user?._id,
        product: product?._id,
      });
      let origin = 0;
      addToCartRes.data.products.forEach(function (product) {
        origin += product.quantity;
        dispatch(setCartNumber(origin));
      });
      setisDisabled(() => true)
      
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  function handleGoToProductDetsPage(id)  {
    navigate(`/product/${id}`)
  }

  return (
    <div  className="bg-gray-800 w-[400px] cursor-pointer rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <div onClick={() => handleGoToProductDetsPage(product?._id)} className="relative w-full h-[400px]">
        <img src={product?.image} className="w-full h-full object-cover" />
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

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-100">
            Rs.{product?.price}
          </span>
          <button
            disabled={isDisabled}
            onClick={handleAddToCart}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
