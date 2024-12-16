import api from "./api";

class DashboardService {
  constructor() {
    this.api = api;
    this.baseUrl = "https://ecommerce-with-mern-backend.onrender.com/api";
  }

  async getAnalytics() {
    try {
      return await this.api.get(`${this.baseUrl}/admin/analytics`, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }
}

let dashboardService = new DashboardService();

export default dashboardService;
