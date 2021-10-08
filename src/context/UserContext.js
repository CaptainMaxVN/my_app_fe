import React from "react";

export const CachedUser = () => {
  let user = localStorage.getItem("user");
  return user ? JSON.parse(user) : {}
};
export const UserContext = React.createContext();
export const EmptyUser = {
    username: '',
    password: '',
    accessToken: ''
  }