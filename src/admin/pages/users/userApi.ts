import axiosInstance from "../../../lib/axios";

export interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedUsers {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

export interface FetchUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const fetchUsers = async (
  params: FetchUsersParams,
): Promise<PaginatedUsers> => {
  const { data } = await axiosInstance.get("/users", { params });
  return data;
};

export const fetchUser = async (id: string): Promise<User> => {
  const { data } = await axiosInstance.get(`/users/${id}`);
  return data.data ?? data;
};

export const createUser = async (
  payload: Omit<User, "_id"> & { password?: string },
): Promise<User> => {
  const { data } = await axiosInstance.post("/users", payload);
  return data.data ?? data;
};

export const updateUser = async (
  id: string,
  payload: Partial<User> & { password?: string },
): Promise<User> => {
  const { data } = await axiosInstance.put(`/users/${id}`, payload);
  return data.data ?? data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
};
