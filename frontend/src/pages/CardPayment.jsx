import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./StripeForm";

const stripePromise = loadStripe(
  "pk_test_51PyTasDI9aUSHk2XHmDdyJulMBPOmDzrNdoYLsxMdbnnFdUXWwnHPRRJcID26kS5X3vjUnkY8HlTkFDgITux6SIp00aRiynbVr"
);

const CardPayment = () => {
  return (
    <div className="w-full h-screen bg-[#111827] p-10 text-white">
      <Elements stripe={stripePromise}>
        <StripeForm />
      </Elements>
    </div>
  );
};

export default CardPayment;
