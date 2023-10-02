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
    const totalPages = response.data.total_pages;
    const pageRequests = Array.from({ length: totalPages }, (_, index) =>
      fetchUsersByPage(index + 1)
    );
    const pageData = await Promise.all(pageRequests);
    const allUsers = pageData.reduce(
      (acc, pageUsers) => acc.concat(pageUsers),
      []
    );
    return allUsers;
  } catch (error) {
    throw new Error("Error fetching users.");
  }
};

const fetchUsersByPage = async (page: number): Promise<User[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/users?page=${page}`);
    return response.data.data as User[];
  } catch (error) {
    console.error(`Error fetching users for page ${page}:`);
    throw new Error(`Error fetching users for page ${page}.`);
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
