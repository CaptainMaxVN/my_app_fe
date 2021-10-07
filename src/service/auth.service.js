import { useContext } from 'react';
import { UserContext, EmptyUser } from "../context/UserContext";

export function useLogout() {
    const { updateUser } = useContext(UserContext)
    localStorage.removeItem("user");
    updateUser(EmptyUser);
}