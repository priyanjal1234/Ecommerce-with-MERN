import api from "./api";

class CartService {
  constructor() {
    this.api = api;
    this.baseUrl = "http://localhost:3000/api";
  }

  async addToCart({ user, product }) {
    try {
      let addToCartRes = await this.api.post(
        `${this.baseUrl}/cart/add`,
        { user, product, quantity: 1 },
        { withCredentials: true }
      );
      return addToCartRes;
    } catch (error) {
      throw error;
    }
  }

  async removeFromCart(productId) {
    try {
      let removeFromCartRes = await this.api.post(
        `${this.baseUrl}/cart/remove`,
        { productId },
        { withCredentials: true }
      );
      return removeFromCartRes;
    } catch (error) {
      throw error;
    }
  }

  async getCartProducts() {
    try {
      let getCartProductsRes = await this.api.get(
        `${this.baseUrl}/cart/user/cart`,
        { withCredentials: true }
      );
      return getCartProductsRes;
    } catch (error) {
      throw error;
    }
  }

  async getUserCart() {
    try {
      let getUserCartRes = await this.api.get(
        `${this.baseUrl}/cart/loggedin/cart`,
        { withCredentials: true }
      );
      return getUserCartRes;
    } catch (error) {
      throw error;
    }
  }

  async deleteCartProduct(id) {
    try {
      return await this.api.delete(`${this.baseUrl}/cart/delete/cart/product/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteAllCartProducts() {
    try {
      let deleteAllCartProductsRes = await this.api.post(
        `${this.baseUrl}/cart/all-cart-delete`,
        {},
        { withCredentials: true }
      );
      return deleteAllCartProductsRes;
    } catch (error) {
      throw error
    }
  }
}

let cartService = new CartService();

export default cartService;
