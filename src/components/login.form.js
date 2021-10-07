import { Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Card, CardHeader, CardBody } from 'reactstrap';
import './login.form.css';
import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const LoginForm = () => {
    const { user, updateUser } = useContext(UserContext);
    const onChangeInputField = (e) => {
        let {name, value} = e.target;
        console.log(`${name} changed to ${value}`);
        let newValue = {...user, [name] : value};
        console.log(newValue);
        updateUser(newValue);
    }

    const login = () => {
        console.log('login');
        axios.post('http://localhost:9294/auth/login', user).then(result => {
            console.log(result);
            const accessToken = result.data.token;
            updateUser({...user, accessToken : accessToken});
        }).catch(error => console.log(error));
    }

    return (
                <>
                <Form className="login-form">
                    <Card>
                        <CardHeader><h3>Login</h3></CardHeader>
                        <CardBody>
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
                        </CardBody>
                    </Card>
                </Form>
            </>
    )
}

export default LoginForm;