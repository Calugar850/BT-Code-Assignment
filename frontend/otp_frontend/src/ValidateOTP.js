import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const ValidateOTP = () => {
    const initialFormState = {
        password: '',
    };

    const[app_user, setGroup] = useState(initialFormState);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target

        setGroup({ ...app_user, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const response = await fetch('https://localhost:7061/api/OTP/validate', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(app_user)
        // });
        // const user_data = await response.json();
    }


    return (<div>
            <AppNavbar/>
            <Container>
                <h2>Please Insert Your OTP</h2>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="password">OTP Code</Label>
                        <Input type="password" name="password" id="password" value={app_user.password || ''}
                               onChange={handleChange} autoComplete="Password"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Validate OTP</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Back</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default ValidateOTP;