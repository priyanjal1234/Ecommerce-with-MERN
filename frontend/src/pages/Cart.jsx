import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { ShoppingCart } from "lucide-react";
import cartService from "../services/CartService";
import { useDispatch, useSelector } from "react-redux";
import { setCartNumber, setCartProducts } from "../redux/reducers/CartReducer";
import CartProduct from "../components/CartProduct";
import { Link } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";

const Cart = () => {
  let dispatch = useDispatch();

  let { cartProducts } = useSelector((state) => state.cart);

  async function fetchCartProducts() {
    try {
      let fetchCartProductsRes = await cartService.getCartProducts();
      dispatch(setCartProducts(fetchCartProductsRes.data))
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchCartProducts()
  },[])

  return (
    <div className="w-full h-screen bg-[#111827] text-white">
      <Navbar />
      <div className="cartHero px-8 py-5">
        <Link to={"/home"} className="absolute right-5 text-purple-600">
          Go to home
        </Link>
        <div className="flex items-center mb-8">
          <ShoppingCart className="h-8 w-8 text-purple-500 mr-3" />
          <h1 className="text-2xl font-bold">Your Cart</h1>
        </div>

        <div className="w-full flex gap-16">
          <div>
            {cartProducts?.length !== 0 && cartProducts.map((product,index) => (
              <CartProduct
                fetchCartProducts={fetchCartProducts}
                product={product}
                key={index}
              />
            ))}
          </div>
          {cartProducts?.length === 0 ? (
            <span className="absolute">Your Cart is Empty</span>
          ) : (
            <OrderSummary />
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
