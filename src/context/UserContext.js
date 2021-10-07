import React from "react";
let user = localStorage.getItem("user");
export const CachedUser = user ? JSON.parse(user) : {};
export const UserContext = React.createContext();
export const EmptyUser = {
    username: '',
    password: '',
    accessToken: ''
  }