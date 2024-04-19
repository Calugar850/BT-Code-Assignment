import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ValidateOTP = () => {
    const initialFormState = {
        userOTP: '',
    };

    const[otp_validate, setGroup] = useState(initialFormState);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedOTP = localStorage.getItem('userOTP');
        showSnackbar(storedOTP);
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target

        setGroup({ ...otp_validate, [name]: value })
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('https://localhost:7061/api/OTP/validate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(otp_validate)
        });
        const data = await response.json();
        if(data.isValid){
            showSnackbar("Successfully validated OTP!");
        }else{
            showSnackbar("OTP is expired!");
        }
    }


    return (<div>
            <AppNavbar/>
            <Container>
                <h2>Please Insert Your OTP</h2>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="password">OTP Code</Label>
                        <Input type="password" name="userOTP" id="userOTP" value={otp_validate.userOTP || ''}
                               onChange={handleChange} autoComplete="UserOTP"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Validate OTP</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Back</Button>
                    </FormGroup>
                </Form>
            </Container>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={1000}
                onClose={handleSnackbarClose}
            >
                <div>
                    <Alert onClose={handleSnackbarClose} severity="info">
                        {snackbarMessage}
                    </Alert>
                </div>
            </Snackbar>
        </div>
    )
};

export default ValidateOTP;