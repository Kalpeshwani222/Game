// import api from "lib/api-client";
// import config from "configs/config";
// import { useMutation } from "@tanstack/react-query";

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