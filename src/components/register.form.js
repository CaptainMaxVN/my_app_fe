import { Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Card, CardHeader, CardBody, Alert } from 'reactstrap';
import './register.form.css';
import React from 'react';
import { Link } from 'react-router-dom';
import {config} from '../config';
import {axiosInstance} from '../axios';

const RegisterForm = () => {
    const [user, updateUser] = React.useState({
        username: '',
        password: '',
        repassword: ''
    })
    const [alert, setAlert] = React.useState();
    const [success, setSuccess] = React.useState(false);
    const onChangeInputField = (e) => {
        let { name, value } = e.target;
        console.log(`${name} changed to ${value}`);
        let newValue = { ...user, [name]: value };
        console.log(newValue);
        updateUser(newValue);
        setAlert('');
    }

    const validateParam = () => {
        if(user.password !== user.repassword){
            setAlert('Password re-entered doesnot match!');
            return false;
        }

        return true;
    }

    const register = () => {
        if (validateParam()) {
            const {username, password} = user;
            axiosInstance.post(config.REGISTER_API, {username, password}).then(result => {
                setSuccess(true);
            }).catch(err => {
                    setAlert(err.response.data.result);
            });
        }
    }

    if(success){
        return (
            <>
                <h3>You has registered successfully! Please <Link to="/login">login</Link> to continue.</h3>
            </>
        )
    }

    return (
        <>
            <Form className="register-form">
                <Card>
                    <CardHeader><h3>Register</h3></CardHeader>
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

                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <span><i className="fa fa-lock" /></span>
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Re-enter password" type="password" name="repassword" onChange={onChangeInputField} value={user.repassword} />
                        </InputGroup>

                        <Button size="lg" color="primary" block onClick={register} className="register-button">Register</Button>
                    </CardBody>
                </Card>
            </Form>
        </>
    )
}

export default RegisterForm;