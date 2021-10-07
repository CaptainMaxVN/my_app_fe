import { UserContext, EmptyUser } from "../context/UserContext";
import { Button } from 'reactstrap';
import React, { useContext } from 'react';
const Home = () => {
    const { user, updateUser } = useContext(UserContext)
    const logout = () => {
        localStorage.removeItem("user");
        updateUser(EmptyUser);
    }
    return (
        <>
            <h1>Welcome {user.username}!</h1>
            <Button color="secondary" onClick={logout}>Logout</Button>
        </>
    )
}

export default Home;