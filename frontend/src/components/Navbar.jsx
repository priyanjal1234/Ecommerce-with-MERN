import { Package, ShoppingCart } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";


const Navbar = () => {
  let { user } = useSelector((state) => state.user);

  let { cartNumber } = useSelector((state) => state.cart);
 

  const navMidData = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
  ];

  return (
    <nav className="w-full h-[80px] bg-[#1F2937] flex items-center justify-between px-8">
      <div className="flex items-center gap-1">
        <Package className="h-8 w-8 text-purple-500" />
        <h1 className="text-2xl font-bold">ShopHub</h1>
      </div>
      <div className="flex gap-5">
        {navMidData.map((item, index) => (
          <NavLink
            to={`/${item.toLowerCase()}`}
            className={({ isActive }) =>
              isActive ? "text-purple-600" : "text-white"
            }
            key={index}
          >
            {item}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Link to={"/cart"} className="flex items-center gap-3">
          <ShoppingCart className="h-6 w-6" />
          {cartNumber > 0 && (
            <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
              {cartNumber}
            </span>
          )}
        </Link>
        {user?.isAdmin && (
          <Link
            className="px-3 py-2 bg-zinc-600 rounded-lg"
            to={"/admin-panel"}
          >
            Admin Panel
          </Link>
        )}
        <Link
          to={"/profile"}
          className="w-[45px] h-[45px] text-lg flex items-center justify-center bg-[#A855F7] rounded-full"
        >
          {user?.name?.split("")[0]}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
