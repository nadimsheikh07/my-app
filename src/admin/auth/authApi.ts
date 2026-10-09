import axiosInstance from "../../lib/axios";

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export interface AuthResponse {
  data: {
    id: string;
    name: string;
    email: string;
    mobile: string;
  };
  accessToken: string;
}

export const signIn = async (payload: SignInPayload): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>(
    "/auth/signin",
    payload,
  );
  return data;
};

export const signUp = async (payload: SignUpPayload): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>(
    "/auth/signup",
    payload,
  );
  return data;
};

export const signOut = async (): Promise<void> => {
  await axiosInstance.post("/auth/signout");
  localStorage.removeItem("accessToken");
};
