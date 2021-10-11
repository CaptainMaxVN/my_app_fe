import React, { useContext } from 'react';
import { UserContext, EmptyUser } from "../context/UserContext";

const Logout = () => {
    const { logout } = useContext(UserContext);
    logout();
    return (
        <>
            <h3>You have logged out successfully, see you again!</h3>
        </>
    )
}

export default Logout;