import api from "./api";

class AuthService {
  constructor() {
    this.api = api;
    this.baseUrl = "https://ecommerce-with-mern-backend.onrender.com/api";
  }

  async createAccount(register) {
    try {
      let registerRes = await this.api.post(
        `${this.baseUrl}/users/register`,
        register,
        { withCredentials: true }
      );
      return registerRes;
    } catch (error) {
      throw error;
    }
  }

  async loginAccount(login) {
    try {
      let loginRes = await this.api.post(`${this.baseUrl}/users/login`, login, {
        withCredentials: true,
      });
      return loginRes;
    } catch (error) {
      throw error;
    }
  }

  async logoutAccount() {
    try {
      let logoutAccountRes = await this.api.get(
        `${this.baseUrl}/users/logout`,
        { withCredentials: true }
      );
      return logoutAccountRes;
    } catch (error) {
      throw error;
    }
  }

  async getLoggedinUser() {
    try {
      let getLoggedinUserRes = await this.api.get(
        `${this.baseUrl}/users/profile`,
        { withCredentials: true }
      );
      return getLoggedinUserRes;
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(email) {
    try {
      let forgotPasswordRes = await this.api.post(
        `${this.baseUrl}/users/forgot-password`,
        { email: email },
        { withCredentials: true }
      );
      return forgotPasswordRes;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(token, password) {
    try {
      let resetPasswordRes = await this.api.post(
        `${this.baseUrl}/users/reset-password/${token}`,
        { password: password },
        { withCredentials: true }
      );
      return resetPasswordRes
    } catch (error) {
      throw error
    }
  }
}

let authService = new AuthService();

export default authService;
