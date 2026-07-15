import api from "./api";

class AuthService {
  // register new user
  register(userData) {
    return api.post("/register", userData);
  }

  // login user
  login(email, password) {
    return api.post("/login", { email, password });
  }

  // logout the user
  logout() {
    return api.post("/logout");
  }

  // get the user
  getUser() {
    return api.get("/user");
  }
}

export default new AuthService();
