import { clsx, type ClassValue } from "clsx";
import { format, isDate } from "date-fns";
// import { jwtDecode, JwtPayload } from 'jwt-decode';
import { twMerge } from "tailwind-merge";
// import Constants from './Constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// ? need this function?
export const isFunction = (func: any) => {
  return func && typeof func === "function";
};

// ? need this function?
export const convertDate = (date: string) => {
  return date ? date?.split("-").reverse()?.join("/") : "";
};

export const getLoggedInUserInfoFromToken = () => {
  // const token = getCookie('accessToken') && getCookie('accessToken') || '';
  // if (!token) {
  //   return null;
  // }
  // const value = jwtDecode(token);
  return null;
};

export function objectToFormData(
  obj: any,
  formData: FormData | null = null,
  namespace = ""
): FormData {
  const fd = formData || new FormData();

  for (const property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      const formKey = namespace ? `${namespace}.${property}` : property;

      if (obj[property] instanceof Date) {
        fd.append(formKey, obj[property].toISOString());
      } else if (Array.isArray(obj[property])) {
        obj[property].forEach((item: any, index: number) => {
          const itemNamespace = `${formKey}[${index}]`;
          objectToFormData(item, fd, itemNamespace);
        });
      } else if (
        typeof obj[property] === "object" &&
        !(obj[property] instanceof File)
      ) {
        objectToFormData(obj[property], fd, formKey);
      } else {
        fd.append(formKey, obj[property]);
      }
    }
  }

  return fd;
}

export const replacePathWithId = (path: string, id: string) => {
  return path.replace(":id", id);
};

export const speak = (text: string) => {
  const text_to_speech = new SpeechSynthesisUtterance();
  text_to_speech.text = text;
  text_to_speech.lang = "en-US";
  window.speechSynthesis.speak(text_to_speech);
};

export const convertDateToString = (text: string) => {
  const date = new Date(text);
  return date.toDateString();
};

export const shuffleArray = (array: any[]) => {
  const newArray = [...array]; // Create a shallow copy of the original array
  return newArray.sort(() => Math.random() - 1); // Corrected sorting logic
};

// export const getUserJWTDecode = (): JwtPayload | any => {
//     const token = localStorage.getItem('access_token')
//         ? JSON.parse(localStorage.getItem('access_token') || '')
//         : '';
//     if (!token) {
//         return null;
//     }
//     const value = jwtDecode(token);
//     return value;
// };

export const formatToLocalDate = (date: Date) => {
  if (isDate(date)) {
    return format(date, "yyyy-MM-dd");
  }
  return null;
};
export const formatNumberToVND = (num: any) => {
  if (typeof num == "number") {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(num);
  }
  return null;
};
