import api from "lib/api-client";
import { getCurrentUserDetails } from "utils/localStorageOperations";

export const acceptInvitation = async (inviteId) => {
  try {
    const token = getCurrentUserDetails();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.post(
      "/api/v1/dashboard/accept-invite",
      {
        inviteId,
      },
      config
    );
    return response.data;
  } catch (error) {
    throw error?.response?.data?.error?.message || "Somthing went wrong. Please try again.";
  }
};
