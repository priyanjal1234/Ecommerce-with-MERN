import { Link, useNavigate } from "react-router-dom";
import FormField from "../../components/FormField";
import { useRef, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { toast } from "react-toastify";
import productService from "../../services/Product";

const AddProduct = () => {
  let navigate = useNavigate();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [stock, setstock] = useState("");
  const [image, setimage] = useState();

  let imageRef = useRef(null);

  async function handleCreateProduct(e) {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("category", category);
    formdata.append("stock", stock);
    formdata.append("image", image);

    try {
      let createProductRes = await productService.createProduct(formdata);

      toast.success("Product Created Successfully");
      navigate("/home");

      setname("");
      setdescription("");
      setprice("");
      setcategory("");
      setstock("");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#111827] text-white">
      <AdminSidebar />
      <div className="w-[80%] ml-[20%] min-h-screen flex flex-col items-center pt-6 pb-5  text-white">
        
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-gray-400 text-center mt-2">
            Add products in your inventory
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mt-8">
          <form onSubmit={handleCreateProduct}>
            <FormField
              label="Name of Product"
              type="text"
              placeholder="Enter Product Name"
              name="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <div className="mb-3">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-200"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter Product Description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md resize-none bg-gray-800 border border-gray-700 text-gray-100 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <FormField
              label="Price (in Rupees)"
              type="number"
              placeholder="Enter Product Price"
              name="price"
              value={price}
              onChange={(e) => setprice(e.target.value)}
            />
            <FormField
              label="Category"
              type="text"
              placeholder="Enter Product Category"
              name="category"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            />
            <FormField
              label="Stock"
              type="number"
              placeholder="Enter Stock"
              name="stock"
              value={stock}
              onChange={(e) => setstock(e.target.value)}
            />
            <div>
              <input
                onChange={(e) => setimage(e.target.files[0])}
                ref={imageRef}
                type="file"
                className="hidden"
              />
              <div
                onClick={() => imageRef.current.click()}
                className="px-3 py-2 bg-blue-600 rounded-lg w-fit cursor-pointer"
              >
                Upload Image
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 mt-3 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
