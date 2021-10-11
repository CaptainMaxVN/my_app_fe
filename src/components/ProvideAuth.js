import React from "react";
import { UserReducer } from '../hooks/UserReducer';
import { UserContext, CachedUser } from '../context/UserContext';
import { axiosInstance } from '../axios';
import {delay} from '../utils/FakeDelay';
const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();
    return (
        <UserContext.Provider value={auth}>
            {children}
        </UserContext.Provider>
    )
}

const useProvideAuth = () => {
    const [user, dispatch] = React.useReducer(UserReducer, CachedUser());

    const login = async userInfo => {
        var message = null;
        try {
            let result = await axiosInstance.post(process.env.REACT_APP_LOGIN_API, userInfo);
            console.log(result);
            console.log('login success');
            await delay(1000);
            const accessToken = result.data.token;
            dispatch({ type: 'LOGIN', payload: { username: userInfo.username, accessToken } });
            return message;
        }
        catch (err) {
            console.log('login fail');
            await delay(1000);
            if (err.response && err.response.status === 401) {
                message = 'User name or password is incorrect!';
            }
            else {
                message = 'Server is getting problem';
            }
            return message;
        }
    };
    const logout = () => dispatch({ type: 'LOGOUT' });

    return { user, login, logout };
}

export default ProvideAuth;