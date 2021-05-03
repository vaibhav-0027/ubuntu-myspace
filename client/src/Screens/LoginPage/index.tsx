import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Input, Row } from 'reactstrap'
import { useHistory } from 'react-router';
import { setUserAccessId, setUserAccessName, setUserAccessToken } from '../../helpers/authentication';
import UbuntuImage from "../../assets/images/ubuntu_orange_hex.svg";
import { Link } from 'react-router-dom';
import dash_api from '../../helpers/dash_api';
import { toast } from 'react-toastify';
import isEmail from 'validator/es/lib/isEmail';

const LoginPage = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const loginHandler = (e: any) => {
        e?.preventDefault();

        const body = {
            email,
            password,
        };

        if(!isEmail(email)) {
            return toast.warning("Invalid email");
        }

        dash_api.post('/auth/login', body).then((res) => {
            setUserAccessToken(res?.data?.jwtToken);
            setUserAccessId(res?.data?.id);
            setUserAccessName(res?.data?.name);
            return history.push("/home");
        }).catch((err) => {
            return toast.error("Invalid credentials");
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
                        type="email"
                        placeholder="Email"
                        value={email}
                        className="login-input-field"
                        onChange={e => setEmail(e.target.value)}
                    />

                    <br />

                    <Input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        className="login-input-field"
                        onChange={e => setPassword(e.target.value)}
                    />

                    <div className="auth-link">
                        <Link to="/signup" className="auth-link" >
                            <span className="fa-sm">Don't have an account yet? <strong>Signup here</strong> </span>
                        </Link>
                    </div>

                    <br />

                    <Row className="d-flex justify-content-center w-100 login-button-row">
                        <Button 
                            className="cursor-pointer login-button  "
                            onClick={loginHandler}
                            type="submit"
                        >
                            <i 
                                className="ri-arrow-right-s-line fa-2x text-white p-1"
                            />
                        </Button>
                    </Row>
                </Form>


                <div className="auth-ubuntu mt-5 pt-5">
                    <img className="h-100 w-100 mt-1" src={UbuntuImage} alt="Ubutnu" />
                </div>
                
            </Container>

        </div>
    )
}

export default LoginPage
