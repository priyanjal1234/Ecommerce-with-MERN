import React, { useState } from "react";
import FormField from "../components/FormField";
import SubmitBtn from "../components/SubmitBtn";
import userService from "../services/User";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
  let navigate = useNavigate();
  const [edit, setedit] = useState({
    name: "",
    address: "",
    phone: "",
  });

  function handleEditChange(e) {
    let { name, value } = e.target;
    setedit((prev) => ({ ...prev, [name]: value }));
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    console.log(edit);
    try {
      let editProfileRes = await userService.updateUserProfile(edit);
      toast.success("Profile is updated successfully");
      navigate("/home");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  return (
    <div className="w-full h-screen bg-[#111827] p-10 text-white">
      <h1 className="text-3xl font-semibold mb-5">Edit Profile</h1>
      <form onSubmit={handleEditSubmit}>
        <FormField
          label="New Name"
          type="text"
          placeholder="New Name"
          name="name"
          value={edit.name}
          onChange={handleEditChange}
        />
        <FormField
          label="New Address"
          type="text"
          placeholder="New Address"
          name="address"
          value={edit.address}
          onChange={handleEditChange}
        />
        <FormField
          label="New Phone Number"
          type="number"
          placeholder="New Number"
          name="phone"
          value={edit.phone}
          onChange={handleEditChange}
        />
        <SubmitBtn btnText="Update" />
      </form>
    </div>
  );
};

export default EditProfile;
