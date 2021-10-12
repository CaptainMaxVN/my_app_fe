import { Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Card, CardHeader, CardBody, Alert, Spinner } from 'reactstrap';
import './login.form.css';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Redirect } from 'react-router-dom';
import {useFormDataModel} from '../hooks/useFormDataModel';

const LoginForm = () => {
    const { login } = useContext(UserContext);
    const [model, onChangeInputField] = useFormDataModel({
        username: '',
        password: ''
    });
    const [alert, setAlert] = React.useState();
    const [redirectToRegisterForm, setRedirectToRegisterForm] = React.useState();
    const [redirectToHome, setRedirectToHome] = React.useState();
    const [loading, setLoading] = React.useState(false);
    
    const onChangeInput = (e) => {
        onChangeInputField(e);
        setAlert('');
    }
    const onLogin = () => {
        setLoading(true);
        login(model).then(message => {
            setLoading(false);
            if (message) {
                setAlert(message);
            }
            else {
                setRedirectToHome(true);
            }
        });
    }

    const register = () => {
        console.log('register');
        return setRedirectToRegisterForm(true);
    }

    if (redirectToRegisterForm) {
        return (
            <Redirect to="/register" />
        )
    }

    if (redirectToHome) {
        window.location = process.env.REACT_APP_BASE_URL;
    }

    const renderFormContent = () => {
        if (loading) {
            return <Spinner color="primary" />
        }
        else {
            return (
                <>
                    <Alert color="danger" hidden={!alert}>
                        {alert}
                    </Alert>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <span><i className="fa fa-user" /></span>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Username" type="text" name="username" onChange={onChangeInput} value={model.username} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <span><i className="fa fa-lock" /></span>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Password" type="password" name="password" onChange={onChangeInput} value={model.password} />
                    </InputGroup>

                    <Button size="lg" color="primary" block onClick={onLogin} className="login-button">Login</Button>
                    or
                    < Button size="lg" color="primary" block onClick={register} className="login-button" > Register</Button >
                </>
            )
        }
    }

    return (
        <>
            <Form className="login-form">
                <Card>
                    <CardHeader><h3>Login</h3></CardHeader>
                    <CardBody>
                        {renderFormContent()}
                    </CardBody>
                </Card>
            </Form>
        </>
    )
}

export default LoginForm;