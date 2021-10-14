import { UserContext } from "../context/UserContext";
import { Button } from 'reactstrap';
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { axiosInstance } from "../axios";

const Home = () => {
    const { user } = useContext(UserContext)
    const [userInfo, setUserInfo] = React.useState();
    const getUserInfo = () => {
        axiosInstance.get(process.env.REACT_APP_USER_INFO_API).then(result => {
            console.log(result);
            setUserInfo(JSON.stringify(result.data));
        })
        .catch(err => console.log(err.response))
    }
    if (user.accessToken) {
        return (
            <>
                <h1>Welcome {user.username}!</h1>
                <Link to="/logout">Logout</Link>
                <Button onClick={getUserInfo}>get user info</Button><br/>
                {userInfo ? <span>{userInfo}</span>: ''}
                <Link to="/todo">To do</Link>
            </>
        )
    }
    else {
        return (
            <>
            <h2>You must loggin first</h2>
            <Link to="/login">Login</Link>
            </>
        )
    }
}

export default Home;