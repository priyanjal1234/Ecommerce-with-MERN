import React, { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import FormHeading from "../components/FormHeading";
import FormField from "../components/FormField";
import SubmitBtn from "../components/SubmitBtn";
import registerSchema from "../schemas/registerSchema";
import authService from "../services/Auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setLoggedin, setUser } from "../redux/reducers/UserReducer";

const Register = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let { isLoggedin } = useSelector(state => state.user)
  const [register, setregister] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const [errors, seterrors] = useState({});

  useEffect(() => {
    if(isLoggedin) {
      return navigate("/home")
    }
    return navigate("/")
  },[])

  function handleRegisterChange(e) {
    let { name, value } = e.target;
    setregister((prev) => ({ ...prev, [name]: value }));

    try {
      registerSchema.pick({ [name]: true }).parse({ [name]: value });
      seterrors((prev) => ({ ...prev, [name]: null }));
    } catch (error) {
      if (error.errors) {
        seterrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault();

    try {
      registerSchema.parse(register);
      let registerRes = await authService.createAccount(register);
      toast.success("Registration Successfull")
      dispatch(setLoggedin(true))
      dispatch(setUser(registerRes?.data?.user))
      navigate("/home")

      setregister((prev) => ({
        ...prev,
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
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
    <div className="w-full min-h-screen bg-[#111827] text-white flex flex-col gap-5 items-center justify-center">
      <div className="flex items-center gap-3 mb-4">
        <UserPlus className="h-8 w-8 text-purple-500 mr-2" />
        <FormHeading headingText="Create Account" />
      </div>
      <form onSubmit={handleRegisterSubmit}>
        <FormField
          label="Full Name"
          type="text"
          placeholder="John Doe"
          name="name"
          value={register.name}
          onChange={handleRegisterChange}
          error={errors.name}
        />
        <FormField
          label="Email"
          type="email"
          placeholder="john@example.com"
          name="email"
          value={register.email}
          onChange={handleRegisterChange}
          error={errors.email}
        />
        <FormField
          label="Password"
          type="password"
          placeholder="••••••••"
          name="password"
          value={register.password}
          onChange={handleRegisterChange}
          error={errors.password}
        />
        <FormField
          label="Address"
          type="text"
          placeholder="123 Main St, City, Country"
          name="address"
          value={register.address}
          onChange={handleRegisterChange}
          error={errors.address}
        />
        <FormField
          label="Phone Number"
          type="number"
          placeholder="+91 9132456334"
          name="phone"
          value={register.phone}
          onChange={handleRegisterChange}
          error={errors.phone}
        />
        <SubmitBtn btnText="Create Account" />
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link to={"/login"} className="text-purple-400 hover:text-purple-300">
            Sign in
          </Link>
        </p>
      </form>
      
    </div>
  );
};

export default Register;
