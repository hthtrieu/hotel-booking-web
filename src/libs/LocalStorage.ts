"use client";

// const getItem = <T = unknown>(key: string | any): T | string | null => {
//   if (typeof window === "undefined") {
//     return null; // Nếu đang chạy trên server thì không thực hiện lấy dữ liệu từ localStorage
//   }

//   const value = window.localStorage.getItem(key);
//   if (!value || value === "undefined") return null;
//   return JSON.parse(value);
// };
const getItem = <T = unknown>(key: string): T | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const value = window.localStorage.getItem(key);
  if (!value || value === "undefined") return null;
  return JSON.parse(value) as T;
};

const setItem = (key: string, value: unknown) => {
  if (value == undefined) {
    return window.localStorage.setItem(key, "");
  }
  window.localStorage.setItem(key, JSON.stringify(value));
};
const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
};

export { getItem, setItem, removeItem };
