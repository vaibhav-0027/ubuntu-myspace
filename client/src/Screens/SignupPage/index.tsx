import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Input, Row } from 'reactstrap'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import UbuntuImage from "../../assets/images/ubuntu_orange_hex.svg";
import dash_api from '../../helpers/dash_api';
import isEmail from 'validator/es/lib/isEmail';
import { toast } from 'react-toastify';

const SignupPage = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const signupHandler = (e: any) => {
        e?.preventDefault();

        const body = {
            email,
            password,
            name,
        };

        if(!isEmail(email)) {
            return toast.warning("Invalid Email");
        }

        if(password.length < 6) {
            return toast.warn("Password too short");
        }

        if(!name.length) {
            return toast.warn("Enter non empty name");
        }

        dash_api.post('/auth/signup', body).then((res) => {
            return history.push('/login');
        });
        
    }

    useEffect(() => {

        dash_api.get('/auth/verify').then((res) => {
            if(res) {
                return history.push("/home")
            }
        });

    }, [history]);

    return (
        <div className="align-items-center bg-purple d-flex justify-content-center w-100">
            <Container className="login-page-container mx-0 bg-purple pt-5 justify-content-center align-items-center">
                <Row className="d-flex align-items-center">
                    <i className="ri-user-3-fill fa-5x text-white" />
                </Row>

                <Form>
                    <Input
                        type="text"
                        placeholder="Name"
                        value={name}
                        className="login-input-field"
                        onChange={e => setName(e.target.value.trim())}
                    />

                    <br />
                    
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        className="login-input-field"
                        onChange={e => setEmail(e.target.value.trim())}
                    />

                    <br />

                    <Input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        className="login-input-field"
                        onChange={e => setPassword(e.target.value.trim())}
                    />

                    <div className="auth-link">
                        <Link to="/login" className="auth-link" >
                            <span className="fa-sm">Already have an accout? <strong>Login here</strong></span>
                        </Link>
                    </div>

                    <br />

                    <Row className="d-flex justify-content-center w-100 login-button-row">
                        <Button 
                            className="cursor-pointer login-button  "
                            onClick={signupHandler}
                            type="submit"
                        >
                            <i 
                                className="ri-arrow-right-s-line fa-2x text-white p-1"
                            />
                        </Button>
                    </Row>
                </Form>

                <div className="auth-ubuntu">
                    <img className="h-100 w-100" alt="Ubuntu" src={UbuntuImage} />
                </div>

            </Container>

        </div>
    )
}

export default SignupPage
