import api from "./api";

class PaymentService {
  constructor() {
    this.api = api;
    this.baseUrl = "https://ecommerce-with-mern-backend.onrender.com/api";
  }

  async createPaymentIntent(amount) {
    try {
      let createPaymentIntentRes = await this.api.post(
        `${this.baseUrl}/payment/create-payment-intent`,
        { amount },
        { withCredentials: true }
      );
      return createPaymentIntentRes;
    } catch (error) {
      throw error;
    }
  }
}

let paymentService = new PaymentService();

export default paymentService;
