import api from "./api";

class UserService {
  constructor() {
    this.api = api;
    this.baseUrl = "https://ecommerce-with-mern-backend.onrender.com/api";
  }

  async updateUserProfile(editedData) {
    try {
      let updateUserProfileRes = await this.api.put(
        `${this.baseUrl}/users/update/profile`,
        editedData,
        { withCredentials: true }
      );
      return updateUserProfileRes;
    } catch (error) {
        throw error
    }
  }
}

let userService = new UserService();

export default userService;
