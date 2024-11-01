import api from "lib/api-client";

export const sendInvitation = async (receiver, coins) => {
  try {
    const senderId = "671bcb7e771b88a2bb22f0ff";
    const response = await api.post("/api/v1/dashboard/invite", {
      senderId,
      receiverId: receiver,
      coins: coins,
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data?.error?.message || "Somthing went wrong. Please try again.";
  }
};
