import React from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import productService from "../../services/Product";
import { setAllProducts } from "../../redux/reducers/ProductReducer";
import { Link } from "react-router-dom";

const ProductsList = () => {
  let { allProducts } = useSelector((state) => state.product);
  let dispatch = useDispatch();
  async function handleDeleteProduct(id) {
    await productService.deleteProduct(id);
    let getAllProductsRes = await productService.getAllProducts();
    dispatch(setAllProducts(getAllProductsRes.data));
  }

  return (
    <div className="w-full min-h-screen bg-[#111827] text-white">
      <AdminSidebar />
      <div className="w-[80%] min-h-screen ml-[20%] flex flex-col gap-6 items-center pt-6">
        <h1 className="text-2xl font-semibold mb-5">All Products</h1>
        {allProducts?.length === 0 ? (
          <span>No Products to display</span>
        ) : (
          <div className="bg-gray-800 rounded-lg overflow-hidden w-[80%]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {allProducts?.length === 0 ? (
                    <span>No Products to display</span>
                  ) : (
                    allProducts?.map((product) => (
                      <tr key={product?._id} className="hover:bg-gray-750">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">
                            {product?.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">
                            {product?.category}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">
                            Rs.{product?.price}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">
                            {product?.stock}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product?.stock >= 10 ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-green-800 bg-green-100">
                              In Stock
                            </span>
                          ) : product?.stock < 10 && product?.stock > 0 ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-yellow-800 bg-yellow-100">
                              Low Stock
                            </span>
                          ) : (
                            product?.stock === 0 && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-red-800 bg-red-100">
                                Out of Stock
                              </span>
                            )
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-3">
                            <button
                              onClick={() => handleDeleteProduct(product?._id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-300">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                            <Link to={`/edit-a-product/${product?._id}`}>
                              <Edit className="h-4"/>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
