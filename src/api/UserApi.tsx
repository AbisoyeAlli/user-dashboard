import axios from "axios";

const BASE_URL = "https://reqres.in/api";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  job?: string;
  name?: string;
}

export interface UpdatedUserData {
  name?: string;
  job?: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data.data as User[];
  } catch (error) {
    throw new Error("Failed to fetch users.");
  }
};

export const updateUser = async (
  userId: number,
  updatedData: UpdatedUserData
): Promise<void> => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, {
      ...updatedData,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user");
    throw new Error("Failed to update user.");
  }
};
