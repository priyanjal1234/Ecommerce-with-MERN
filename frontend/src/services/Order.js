import api from "./api";

class OrderService {
  constructor() {
    this.api = api;
    this.baseUrl = "http://localhost:3000/api";
  }

  async createOrder({
    fullName,
    email,
    address,
    city,
    state,
    zipCode,
    items,
    totalPrice,
  }) {
    try {
      let createOrderRes = await this.api.post(
        `${this.baseUrl}/orders/order/create`,
        {
          fullName,
          email,
          address,
          city,
          state,
          zipCode,
          items,
          totalPrice,
        },
        { withCredentials: true }
      );

      return createOrderRes;
    } catch (error) {
      throw error;
    }
  }

  async cancelOrder(name) {
    try {
      let cancelOrderRes = await this.api.post(`${this.baseUrl}/orders/cancel/order`,{name},{withCredentials: true})
      return cancelOrderRes
    } catch (error) {
      throw error
    }
  }
}

let orderService = new OrderService();

export default orderService;
