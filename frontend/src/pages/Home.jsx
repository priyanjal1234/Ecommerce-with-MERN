import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import productService from "../services/Product";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../redux/reducers/ProductReducer";
import authService from "../services/Auth";
import { setUser } from "../redux/reducers/UserReducer";


const Home = () => {
  let dispatch = useDispatch();

  async function fetchProducts() {
    try {
      let fetchProductsRes = await productService.getAllProducts();
      dispatch(setAllProducts(fetchProductsRes.data));
    } catch (error) {
      console.log(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  async function fetchLoggedinUser() {
    try {
      let fetchLoggedinUserRes = await authService.getLoggedinUser();
      dispatch(setUser(fetchLoggedinUserRes.data));
    } catch (error) {
      console.log(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }


  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchLoggedinUser();
  }, []);
 

  return (
    <div className="w-full min-h-screen bg-[#111827] text-white">
      <Navbar  />
      <Hero />
    </div>
  );
};

export default Home;
