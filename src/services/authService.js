import instance from "./instance";

const authServices = {
  register: async (data) => {
    try {
      return await instance.post('/auth/register', data);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },
  
  login: async (data) => {
    try {
      const response = await instance.post('/auth/login', data);
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  
  logout: async () => {
    try {
      return await instance.post('/auth/logout');
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },
  
  me: async () => {
    try {
      return await instance.get('/auth/profile');
    } catch (error) {
      console.error("Profile error:", error);
      throw error;
    }
  }
};

export default authServices;