import { Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Card, CardHeader, CardBody, Alert, Spinner } from 'reactstrap';
import './register.form.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../axios';
import { delay } from '../utils/FakeDelay';
import {useFormDataModel} from '../hooks/useFormDataModel';

const RegisterForm = () => {

    const [formModel, onChangeInputField] = useFormDataModel({
        username: '',
        password: '',
        repassword: ''
    });

    const [alert, setAlert] = React.useState();
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onChangeInput = (e) => {
        onChangeInputField(e);
        setAlert('');
    }

    const validateParam = () => {
        if (formModel.password !== formModel.repassword) {
            setAlert('Password re-entered doesnot match!');
            return false;
        }

        return true;
    }

    const register = () => {
        if (validateParam()) {
            const { username, password } = formModel;
            setLoading(true);
            axiosInstance.post(process.env.REACT_APP_REGISTER_API, { username, password }).then(async result => {
                await delay(1000);
                setSuccess(true);
            }).catch(async err => {
                await delay(1000);
                setAlert(err.response.data.result);
            }).finally(() => setLoading(false));
        }
    }

    if (success) {
        return (
            <>
                <h3>You has registered successfully! Please <Link to="/login">login</Link> to continue.</h3>
            </>
        )
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
                        <Input placeholder="Username" type="username" name="username" onChange={onChangeInput} value={formModel.username} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <span><i className="fa fa-lock" /></span>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Password" type="password" name="password" onChange={onChangeInput} value={formModel.password} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <span><i className="fa fa-lock" /></span>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Re-enter password" type="password" name="repassword" onChange={onChangeInputField} value={formModel.repassword} />
                    </InputGroup>

                    <Button size="lg" color="primary" block onClick={register} className="register-button">Register</Button>
                </>
            )
        }
    }

    return (
        <>
            <Form className="register-form">
                <Card>
                    <CardHeader><h3>Register</h3></CardHeader>
                    <CardBody>
                        {renderFormContent()}
                    </CardBody>
                </Card>
            </Form>
        </>
    )
}

export default RegisterForm;