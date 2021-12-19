export const addTokenToLocalStorage = (token) => {
  localStorage.setItem("access", token);
};

export const removeTokenToLocalStorage = (token) => {
  localStorage.removeItem("access");
};

export const getTokenfromLocalStorage = () => {
  return localStorage.getItem("access");
};
