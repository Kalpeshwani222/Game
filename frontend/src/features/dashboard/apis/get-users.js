import api from "lib/api-client";

export const getUsers = async () => {
  try {
    const response = await api.get("/api/v1/dashboard/online-users");
    return response.data;
  } catch (error) {
    throw error?.response?.data?.error?.message || "Somthing went wrong. Please try again.";
  }
};
