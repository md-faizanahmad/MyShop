import axios from "axios";

const api = axios.create({
  baseURL: "https://api.myazstore.shop/api/categories",
});

export const getCategories = async (): Promise<string[]> => {
  const response = await api.get<string[]>("/products/categories");
  return response.data;
};
