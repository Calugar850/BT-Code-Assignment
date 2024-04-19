import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const GenerateOTP = () => {
    const initialFormState = {
        password: '',
    };

    const[otp_request, setGroup] = useState(initialFormState);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target

        setGroup({ ...otp_request, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`https://localhost:7061/api/OTP/generate`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(otp_request)
        });

        const data = await response.json();
        localStorage.setItem("userOTP", data.otp);
        setGroup(initialFormState);
        navigate('/validateOTP');
    }


    return (<div>
            <AppNavbar/>
            <Container>
                <h2>Please Insert Your Password</h2>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" value={otp_request.password || ''}
                               onChange={handleChange} autoComplete="Password"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Generate OTP</Button>{' '}
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default GenerateOTP;