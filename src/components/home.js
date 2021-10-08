import { UserContext, EmptyUser } from "../context/UserContext";
import { Button } from 'reactstrap';
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { axiosInstance } from "../axios";
import {config} from "../config"
const Home = () => {
    const { user } = useContext(UserContext)
    const [userInfo, setUserInfo] = React.useState();
    const getUserInfo = () => {
        axiosInstance.get(config.USER_INFO).then(result => {
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