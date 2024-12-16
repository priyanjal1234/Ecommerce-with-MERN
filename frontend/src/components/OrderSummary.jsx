import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTotalPrice } from "../redux/reducers/OrderReducer";

const OrderSummary = () => {
  const [totalPrice, settotalPrice] = useState(0);
  const [shipping, setshipping] = useState(200);
  const [tax, settax] = useState(1000);
  let { cartProducts } = useSelector((state) => state.cart);

  
  let dispatch = useDispatch()

  useEffect(() => {
    let newTotalPrice = cartProducts?.reduce((acc, product) => {
      return acc + product.product.price * product.quantity;
    }, 0);
    settotalPrice(newTotalPrice);
    dispatch(setTotalPrice(Number(newTotalPrice) + Number(shipping) + Number(tax)))
  }, [cartProducts]);

  return (
    <div className="w-[400px] h-fit px-3 py-4 bg-[#1F2937] rounded-lg">
      <h1 className="text-xl font-semibold">Order Summary</h1>
      <div className="mt-3 border-b border-zinc-700">
        <div className="w-full flex justify-between mb-3">
          <h2 className="text-[#D1D5D1]">Subtotal</h2>
          <h2 className="text-[#D1D5D1]">Rs. {totalPrice}</h2>
        </div>
        <div className="w-full flex justify-between mb-3">
          <h2 className="text-[#D1D5D1]">Shipping</h2>
          <h2 className="text-[#D1D5D1]">Rs. {shipping}</h2>
        </div>
        <div className="w-full flex justify-between mb-3">
          <h2 className="text-[#D1D5D1]">Tax</h2>
          <h2 className="text-[#D1D5D1]">Rs. {tax}</h2>
        </div>
      </div>
      <div className="mt-2 w-full flex justify-between">
        <h1 className="text-lg font-semibold">Total</h1>
        <h2>Rs. {Number(totalPrice) + Number(shipping) + Number(tax)}</h2>
      </div>
      <Link to={'/checkout'} className="w-full h-[45px] flex items-center justify-center bg-[#9333EA] rounded-lg mt-3">
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default OrderSummary;
