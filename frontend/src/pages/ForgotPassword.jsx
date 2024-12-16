import React, { useState } from "react";
import authService from "../services/Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setemail] = useState("");
  let navigate = useNavigate()

  async function handleForgotPassword(e) { 
    e.preventDefault()
    try {
      await authService.forgotPassword(email)
      toast.success("Check your email for link")
      navigate("/login")
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      )
    }
  }

  return (
    <div className="w-full h-screen bg-[#111827] p-10 text-white">
      <h1 className="text-3xl font-semibold mb-5">Enter Your Email</h1>
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Enter Your Email"
          className="w-[400px] px-4 py-2 mr-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-500"
        />
        <button type="submit" className="px-3 py-2 bg-purple-600 rounded-lg">
          Get Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
