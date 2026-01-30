export const getToken = () => sessionStorage.getItem("token");

export const setToken = (token: string) => {
  sessionStorage.setItem("token", token);
};

export const clearToken = () => {
  sessionStorage.removeItem("token");
};
