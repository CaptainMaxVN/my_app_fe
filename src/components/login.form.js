import { Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Card, CardHeader, CardBody, Alert } from 'reactstrap';
import './login.form.css';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Redirect } from 'react-router-dom';
import {config} from '../config';
import {axiosInstance} from '../axios';

const LoginForm = () => {
    const { user, updateUser } = useContext(UserContext);
    const [alert, setAlert] = React.useState();
    const [redirectToRegisterForm, setRedirectToRegisterForm] = React.useState();
    const [redirectToHome, setRedirectToHome] = React.useState();
    const onChangeInputField = (e) => {
        let {name, value} = e.target;
        console.log(`${name} changed to ${value}`);
        let newValue = {...user, [name] : value};
        console.log(newValue);
        updateUser(newValue);
        setAlert('');
    }

    const login = () => {
        axiosInstance.post(config.LOGIN_API, user).then(result => {
            console.log(result);
            const accessToken = result.data.token;
            updateUser({...user, accessToken : accessToken});
            setRedirectToHome(true);
        }).catch(err => {
            if(err.response.status == 401){
                setAlert('User name or password is incorrect!');
            }
            else {
                setAlert(err.response.statusText);
            }
        });
    }

    const register = () => {
        console.log('register');
        return setRedirectToRegisterForm(true);
    }

    if(redirectToRegisterForm) {
        return (
            <Redirect to="/register"/>
        )
    }

    if(redirectToHome) {
        return (
            <Redirect to="/"/>
        )
    }

    return (
                <>
                <Form className="login-form">
                    <Card>
                        <CardHeader><h3>Login</h3></CardHeader>
                        <CardBody>
                        <Alert color="danger" hidden={!alert}>
                            {alert}
                        </Alert>
                            <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <span><i className="fa fa-user" /></span>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Username" type="username" name="username" onChange={onChangeInputField} value={user.username} />
                            </InputGroup>
    
                            <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <span><i className="fa fa-lock" /></span>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Password" type="password" name="password" onChange={onChangeInputField} value={user.password} />
                            </InputGroup>
    
                            <Button size="lg" color="primary" block onClick={login} className="login-button">Login</Button>
                            or
                            <Button size="lg" color="primary" block onClick={register} className="login-button">Register</Button>
                        </CardBody>
                    </Card>
                </Form>
            </>
    )
}

export default LoginForm;