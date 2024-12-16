import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../services/Auth";
import { toast } from "react-toastify";
import resetSchema from "../schemas/resetSchema"; // Assume this schema is already defined and imported

const ResetPassword = () => {
  
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for validation error
  let navigate = useNavigate();

  async function handleResetPassword(e) {
    e.preventDefault();
    if (error) {
      toast.error("Please fix the errors before proceeding.");
      return;
    }

    try {
      await authService.resetPassword(token, password);
      toast.success("Password Reset Successfully");
      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  function handleResetPasswordChange(e) {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const validationResult =  resetSchema.safeParse({password: newPassword})
    if(!validationResult.success) {
        setError(validationResult.error.errors[0].message)
    }
    else {
        setError("")
    }
  }

  return (
    <div className="w-full h-screen bg-[#111827] p-10 text-white">
      <h1 className="text-3xl font-semibold mb-5">Reset Your Password</h1>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="New Password"
          onChange={handleResetPasswordChange}
          className="w-[400px] px-4 py-2 mr-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-500"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="px-3 py-2 bg-purple-600 rounded-lg"
          
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
