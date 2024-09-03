import { useState, useEffect } from "react";
import { axiosInstance } from "../utils";

export const useAuth = () => {
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/users/me");

        if (response.data && response.data.data && response.data.data.user) {
          setRole(response.data.data.user.role);
          setUser(response.data.data.user);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  return { role, isAuthenticated, user };
};
