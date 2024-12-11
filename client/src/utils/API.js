const API = import.meta.env.VITE_API_URL;

export const SIGNUP = API + "/user/register";
export const LOGIN = API + "/user/login";
export const GET_ALL_ROOM = API + "/room/getall";
export const CREATE_ROOM = API + "/room/add";
export const BOOK_ROOM = API + "/room/bookroom";
export const TRANSACTIONS = API + "/room/bookings";
