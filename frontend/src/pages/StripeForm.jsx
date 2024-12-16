import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import paymentService from "../services/Payment";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCurrentOrder, setTotalPrice } from "../redux/reducers/OrderReducer";
import orderService from "../services/Order";
import { setCartNumber, setCartProducts } from "../redux/reducers/CartReducer";
import { useNavigate } from "react-router-dom";
import cartService from "../services/CartService";

const StripeForm = () => {
  let { user } = useSelector(state => state.user)
  let { totalPrice } = useSelector((state) => state.order);
  let navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  let dispatch = useDispatch();

  async function handlePayment(e) {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      let createPaymentIntentRes = await paymentService.createPaymentIntent(
        totalPrice * 100
      );
      let { clientSecret } = createPaymentIntentRes.data;

      let { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (paymentIntent.status === "succeeded") {
        toast.success("Payment Successfull");
        dispatch(setTotalPrice(0));
        dispatch(setCartNumber(0));
        dispatch(setCartProducts([]));
        navigate("/home");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  async function handleCancelOrder() {
    try {
      let cancelOrderRes = await orderService.cancelOrder();
      console.log(cancelOrderRes.data);
      toast.success("Order Canceled Successfully");
      dispatch(setCartNumber(0));
      dispatch(setCartProducts([]));

      if (cancelOrderRes.data.message === "Order Canceled Successfully") {
        navigate("/home");
        let deleteCartProducts = await cartService.deleteAllCartProducts();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  return (
    <form onSubmit={handlePayment}>
      <h1 className="text-2xl font-semibold mb-5">Enter Card Details</h1>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "white",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
      />
      <button
        type="submit"
        className="px-3 py-2 mt-5 w-fit bg-purple-600 rounded-lg"
      >
        Pay
      </button>
      <button
        type="button"
        onClick={handleCancelOrder}
        className="w-[200px] block h-[45px] mt-3 rounded-lg  bg-red-500"
      >
        Cancel Order
      </button>
    </form>
  );
};

export default StripeForm;
