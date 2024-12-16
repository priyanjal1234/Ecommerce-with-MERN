import React, { useState } from "react";
import { ArrowRight, CreditCard } from "lucide-react";
import PaymentMethodCard from "../components/PaymentMethodCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch } from "react-redux";
import { setTotalPrice } from "../redux/reducers/OrderReducer";
import { setCartNumber, setCartProducts } from "../redux/reducers/CartReducer";
import cartService from "../services/CartService";

const PaymentOptions = () => {
  const [selected, setselected] = useState(null);
  let navigate = useNavigate();

  let dispatch = useDispatch()
  let paymentMethods = [
    {
      icon: CreditCard,
      type: "card",
      title: "Credit/Debit Card",
      description: "Pay securely with your credit or debit card",
    },
    {
      type: "cod",
      title: "Cash on Delivery",
      description: "Pay on Delivery",
    },
  ];

  async function handleAfterSelection() {
    if (selected === "cod") {
      toast.success("You will be notified as the order reaches you");
      dispatch(setTotalPrice(0));
      dispatch(setCartNumber(0));
      dispatch(setCartProducts([]));
      navigate("/home");
      let deleteCartProducts = await cartService.deleteAllCartProducts();
      
    } else if (selected === "card") {
      navigate("/card-payment");
    }
  }

  return (
    <div className="w-full h-screen bg-[#111827] flex flex-col items-center text-white pt-8">
      <div className="flex mb-12">
        <CreditCard className="h-8 w-8 text-purple-500 mr-3" />
        <h1 className="text-3xl font-bold text-white">Select Payment Method</h1>
      </div>

      <div>
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.type}
            selected={selected === method.type}
            title={method.title}
            description={method.description}
            onSelect={() => setselected(method.type)}
          />
        ))}
      </div>

      <button
        onClick={handleAfterSelection}
        disabled={!selected}
        className="w-[600px] flex items-center justify-center space-x-2 bg-purple-600 text-white rounded-lg py-3 px-4 disabled:bg-gray-700 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors duration-200"
      >
        <span>Continue</span>
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default PaymentOptions;
