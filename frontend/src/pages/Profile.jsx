import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/Auth";
import { toast } from "react-toastify";
import { setLoggedin, setUser } from "../redux/reducers/UserReducer";

const Profile = () => {
  let { user } = useSelector((state) => state.user);
  let dispatch = useDispatch()
  let navigate = useNavigate()

  async function handleLogout() {
    try {
      let logoutUserRes = await authService.logoutAccount();
      toast.success("Logout Success")
      dispatch(setLoggedin(false))
      dispatch(setUser(null))
      navigate("/login")
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  return (
    <div className="w-full h-screen bg-[#111827] p-10 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold mb-4">Hello, {user?.name}</h1>
        <span onClick={handleLogout} className="text-red-600 cursor-pointer">
          Logout
        </span>
        <Link to={"/home"} className="text-purple-600">
          Go to Home
        </Link>
      </div>
      <div className="mt-3">
        <h2 className="text-lg mb-3">Name: {user?.name}</h2>
        <h2 className="text-lg mb-3">Email: {user?.email}</h2>
        <h2 className="text-lg mb-3">Address: {user?.address}</h2>
        <h2 className="text-lg mb-3">Phone Number: {user?.phone}</h2>
      </div>
      <Link to={'/edit-profile'} className="px-3 py-2 bg-purple-600 mt-5 rounded-lg block w-fit">
        Edit Profile
      </Link>
    </div>
  );
};

export default Profile;
