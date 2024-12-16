import { LogIn } from "lucide-react";
import React, { useEffect, useState } from "react";
import FormField from "../components/FormField";
import SubmitBtn from "../components/SubmitBtn";
import { Link, useNavigate } from "react-router-dom";
import loginSchema from "../schemas/loginSchema";
import authService from "../services/Auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";

const Login = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { isLoggedin } = useSelector((state) => state.user);
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const [errors, seterrors] = useState({});

  useEffect(() => {
    if (isLoggedin) {
      return navigate("/home");
    }
    return navigate("/login");
  }, []);

  function handleLoginChange(e) {
    let { name, value } = e.target;
    setlogin((prev) => ({ ...prev, [name]: value }));

    try {
      loginSchema.pick({ [name]: true }).parse({ [name]: value });
      seterrors((prev) => ({ ...prev, [name]: null }));
    } catch (error) {
      if (error.errors) {
        seterrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      loginSchema.parse(login);
      await authService.loginAccount(login);
      toast.success("Login Successfull");
      dispatch(setLoggedin(true));
      navigate("/home");
    } catch (error) {
      if (error.errors) {
        const objErr = {};
        error.errors.forEach(function (err) {
          const { path, message } = err;
          objErr[path] = message;
        });

        seterrors(objErr);
      } else if (error) {
        toast.error(
          error?.response?.data?.message || error?.response?.data?.errorMessage
        );
      }
    }
  }

  return (
    <div className="w-full h-screen bg-[#111827] text-white flex flex-col gap-5 items-center justify-center">
      <div className="flex items-center mb-4">
        <LogIn className="h-8 w-8 text-purple-500 mr-2" />
        <h1 className="text-3xl font-bold text-gray-100">Welcome Back</h1>
      </div>
      <form onSubmit={handleLoginSubmit}>
        <FormField
          label="Email"
          type="email"
          placeholder="john@example.com"
          name="email"
          value={login.email}
          onChange={handleLoginChange}
          error={errors.email}
        />
        <FormField
          label="Password"
          type="password"
          placeholder="••••••••"
          name="password"
          value={login.password}
          onChange={handleLoginChange}
          error={errors.password}
        />

        <div className="flex items-center justify-between mb-6">
          <Link
            to={"/forgot-password"}
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            Forgot Password?
          </Link>
        </div>
        <SubmitBtn btnText="Login" />

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <Link to={"/"} className="text-purple-400 hover:text-purple-300">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
