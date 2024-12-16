import React, { useState } from "react";
import { CreditCard } from "lucide-react";
import FormField from "../components/FormField";
import SubmitBtn from "../components/SubmitBtn";
import checkoutSchema from "../schemas/checkoutSchema";
import { Link, useNavigate } from "react-router-dom";
import orderService from "../services/Order";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Checkout = () => {
  const [checkout, setcheckout] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [errors, seterrors] = useState({});

  let navigate = useNavigate()

  let { cartProducts } = useSelector((state) => state.cart);

  let { totalPrice } = useSelector((state) => state.order);

  function handleCheckOutChange(e) {
    let { name, value } = e.target;
    setcheckout((prev) => ({ ...prev, [name]: value }));

    try {
      checkoutSchema.pick({ [name]: true }).parse({ [name]: value });
      seterrors((prev) => ({ ...prev, [name]: null }));
    } catch (error) {
      if (error.errors) {
        seterrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  }

  async function handleCheckOutSubmit(e) {
    e.preventDefault();

    let items = cartProducts?.map(prod => ({
        product: prod?.product?._id,
        quantity: prod?.quantity,
        price: prod?.product?.price
    }))

    try {
      checkoutSchema.parse(checkout);
      let createOrderRes = await orderService.createOrder({
        fullName: checkout.fullName,
        email: checkout.email,
        address: checkout.address,
        city: checkout.city,
        state: checkout.state,
        zipCode: checkout.zipCode,
        items,
        totalPrice,
      });

      toast.success("Order Placed Successfully")
      navigate("/payment-options")

      setcheckout((prev) => ({
        ...prev,
        fullName: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      }));
    } catch (error) {
      if (error.errors) {
        let fielderrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        seterrors(fielderrors);
      } else if (error) {
        toast.error(
          error?.response?.data?.message || error?.response?.data?.errorMessage
        );
      }
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#111827] text-white">
      <div className="px-5 py-8 flex justify-center flex-col items-center">
        <Link to={"/home"} className="absolute right-4 top-10 text-purple-600">
          Go to home
        </Link>
        <div className="flex items-center mb-8">
          <CreditCard className="h-8 w-8 text-purple-500 mr-3" />
          <h1 className="text-3xl font-bold text-white">Checkout</h1>
        </div>
        <div className="w-[450px] flex justify-center h-fit px-3 py-2 bg-[#1F2937] rounded-lg">
          <div>
            <form onSubmit={handleCheckOutSubmit} className="mt-4">
              <FormField
                label="Full Name"
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={checkout.fullName}
                onChange={handleCheckOutChange}
                error={errors.fullName}
              />
              <FormField
                label="Email"
                type="email"
                placeholder="Email"
                name="email"
                value={checkout.email}
                onChange={handleCheckOutChange}
                error={errors.email}
              />
              <FormField
                label="Address"
                type="text"
                placeholder="Address"
                name="address"
                value={checkout.address}
                onChange={handleCheckOutChange}
                error={errors.address}
              />
              <FormField
                label="City"
                type="text"
                placeholder="City"
                name="city"
                value={checkout.city}
                onChange={handleCheckOutChange}
                error={errors.city}
              />
              <FormField
                label="State"
                type="text"
                placeholder="State"
                name="state"
                value={checkout.state}
                onChange={handleCheckOutChange}
                error={errors.state}
              />
              <FormField
                label="Zip Code"
                type="number"
                placeholder="Zip Code"
                name="zipCode"
                value={checkout.zipCode}
                onChange={handleCheckOutChange}
                error={errors.zipCode}
              />
              <SubmitBtn btnText="Place Order" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
