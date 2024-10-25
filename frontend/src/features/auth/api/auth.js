import api from "lib/api-client";
import config from "configs/config";

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/api/v1/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error?.response?.data?.error?.message || "Login failed. Please try again.";
  }
};

// export const registerUser = async (formData) => {
//   const response = await api.post(`${config.baseUrl}/api/auth/register`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };

// export const loginUser = async (data) => {
//   const response = await api.post(`${config.baseUrl}/api/auth/login`, data);
//   return response.data;
// };

// //hook for register user
// // export const useRegister = (options) => {
// //   return useMutation(registerUser, options);
// // };

// // export const useRegister = (onSuccess, onError) => {
// //   return useMutation(registerUser, { onSuccess, onError });
// //   // return useMutation({
// //   //   mutationFn: registerUser,
// //   //   onSuccess: ({ data }) => {
// //   //     alert("Success");
// //   //   },

// //   //   onError: (error) => {
// //   //     alert(`Registration failed}`);
// //   //   },
// //   // });
// // };

// // export default useRegister;
