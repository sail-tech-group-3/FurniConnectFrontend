import { useState, useEffect } from "react";
import { axiosInstance } from "../utils";

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        setUsers(response.data.data.users);
      } catch (err) {
        console.error("error fetching users", err);
      }
    };

    fetchUsers();
  }, []);

  return { users, setUsers };
};

export default useUsers;
