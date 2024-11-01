import Cookies from "js-cookie";

//login or not
export const isLoggedIn = () => {
  const data = Cookies.get("accessToken");
  if (data == null || undefined) {
    return false;
  } else {
    return true;
  }
};

//set cookie
export const doLogin = (data, next) => {
  const { accessToken, refreshToken } = data;
  Cookies.set("accessToken", JSON.stringify(accessToken), {
    secure: true,
    sameSite: "strict",
    expires: 1 / 24,
  });

  Cookies.set("refreshToken", JSON.stringify(refreshToken), { secure: true, sameSite: "strict", expires: 1 });
  next();
};

//remove from localstorage
export const doLogout = (next) => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  next();
};

//get current user
export const getCurrentUserDetails = () => {
  if (isLoggedIn()) {
    return JSON.parse(Cookies.get("accessToken"));
  } else {
    return false;
  }
};
