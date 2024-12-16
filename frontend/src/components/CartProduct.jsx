import { Minus, Plus, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import cartService from "../services/CartService";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCartNumber } from "../redux/reducers/CartReducer";

const CartProduct = ({ product, fetchCartProducts }) => {
  let dispatch = useDispatch();
  let { user } = useSelector((state) => state.user);
  let { cartProducts, cartNumber } = useSelector((state) => state.cart);

  let origin;
  async function handleAddToCart() {
    try {
      await cartService.addToCart({
        user: user?._id,
        product: product?.product?._id,
      });
      origin = 1;
      cartProducts?.forEach(function (prod) {
        origin += prod?.quantity;
      });
      dispatch(setCartNumber(origin));
      fetchCartProducts();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  async function handleRemoveFromCart() {
    try {
      await cartService.removeFromCart(product?.product?._id);
      if (cartNumber > 0) {
        dispatch(setCartNumber(cartNumber - 1));
      }

      fetchCartProducts();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  async function handleDeleteCartProduct(prodId) {
    try {
      await cartService.deleteCartProduct(prodId);

      let foundProduct = cartProducts?.find(prod => prod?.product?._id === prodId)
      dispatch(setCartNumber(cartNumber - foundProduct.quantity))
      fetchCartProducts();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  return (
    <div className="w-[900px] rounded-lg h-[120px] flex items-center justify-between bg-[#1F2937] p-3 mb-4">
      <div className="flex items-center gap-4">
        <div className="w-[90px] h-[90%] overflow-hidden rounded-sm">
          <img
            className="w-full h-full object-cover"
            src={product?.product?.image}
            alt=""
          />
        </div>
        <div>
          <h1 className="text-lg font-semibold">{product?.product?.name}</h1>
          <p className="text-purple-400 font-semibold">
            Rs.{product?.product?.price}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRemoveFromCart}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <Minus className="h-4 w-4 text-gray-400" />
          </button>
          <span className="text-white px-4 py-1 bg-gray-700 rounded">
            {product?.quantity}
          </span>
          <button
            onClick={handleAddToCart}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <Plus className="h-4 w-4 text-gray-400" />
          </button>
        </div>
        <button
          onClick={() => handleDeleteCartProduct(product?.product?._id)}
          className="p-2 hover:bg-gray-700 rounded"
        >
          <Trash2 className="h-5 w-5 text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
