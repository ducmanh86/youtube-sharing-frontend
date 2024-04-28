import axiosClient from './axios_client';

export type LoginDTO = {
  email: string;
  password: string;
};

export type RegisterDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type User = {
  id: number;
  fullName: string;
  email: string;
};

export const login = (data: LoginDTO) => {
  return axiosClient.post('auth/email/login', data);
};

export const register = (data: RegisterDTO) => {
  return axiosClient.post('auth/email/register', data);
};

export const me = () => {
  return axiosClient.get('auth/me');
};

export const logout = () => {
  return axiosClient.post('auth/logout');
};
