import { useState } from "react";

import { createUserByPrincipal } from "../services/principalService";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");
  const [search, setSearch] = useState("");

  const createUser = async (userData) => {
    try {
      await createUserByPrincipal({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: userData.role,
      });
      setUsers((prev) => [
        ...prev,
        { ...userData, id: Date.now(), created_at: new Date().toISOString() },
      ]);
      return true;
    } catch (err) {
      return false;
    }
  };

  return { users, createUser, filterRole, setFilterRole, search, setSearch };
};