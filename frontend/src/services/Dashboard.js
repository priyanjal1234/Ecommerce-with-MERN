import api from "./api";

class DashboardService {
  constructor() {
    this.api = api;
    this.baseUrl = "http://localhost:3000/api";
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
