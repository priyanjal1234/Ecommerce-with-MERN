import api from "./api";

class ProductService {
  constructor() {
    this.api = api;
    this.baseUrl = "http://localhost:3000/api";
  }

  async createProduct(productData) {
    try {
      let createProductRes = await this.api.post(`${this.baseUrl}/admin/product/create`, productData, {
        withCredentials: true,
      });
      return createProductRes
    } catch (error) {
      throw error
    }
  }

  async getAllProducts() {
    try {
      let getAllProductsRes = await this.api.get(`${this.baseUrl}/products/all-products`,{withCredentials: true})
      return getAllProductsRes
    } catch (error) {
      throw error
    }
  }

  async deleteProduct(id) {
    try {
      await this.api.delete(`${this.baseUrl}/admin/delete/${id}`,{withCredentials: true})
    } catch (error) {
      throw error
    }
  }

  async editProduct(id,formdata) {
    try {
      return await this.api.put(`${this.baseUrl}/admin/update/product/${id}`,formdata,{withCredentials: true})
    } catch (error) {
      throw error
    }
  }
}

let productService = new ProductService();

export default productService;
