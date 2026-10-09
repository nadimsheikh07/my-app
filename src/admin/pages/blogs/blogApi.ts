import axiosInstance from "../../../lib/axios";

export interface Blog {
  _id: string;
  title: string;
  slug?: string;
  content: string;
  author?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedBlogs {
  data: Blog[];
  total: number;
  page: number;
  limit: number;
}

export interface FetchBlogsParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const fetchBlogs = async (
  params: FetchBlogsParams,
): Promise<PaginatedBlogs> => {
  const { data } = await axiosInstance.get("/blogs", { params });
  return data;
};

export const fetchBlog = async (id: string): Promise<Blog> => {
  const { data } = await axiosInstance.get(`/blogs/${id}`);
  return data.data ?? data;
};

export const createBlog = async (payload: Omit<Blog, "_id">): Promise<Blog> => {
  const { data } = await axiosInstance.post("/blogs", payload);
  return data.data ?? data;
};

export const updateBlog = async (
  id: string,
  payload: Partial<Blog>,
): Promise<Blog> => {
  const { data } = await axiosInstance.put(`/blogs/${id}`, payload);
  return data.data ?? data;
};

export const deleteBlog = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/blogs/${id}`);
};
