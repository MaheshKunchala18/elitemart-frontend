import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import NavigationBar from '../components/Navbar';
import '../styles/loginsignup.css';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showImage, setShowImage] = useState(true);
    const [showPassword, setShowPassword] = useState(false);  // Flips EyeIcon to show/hide password.

    const [invalidInput, setInvalidInput] = useState(false);  // When Email and Password not match, boxes animate.
    const { setUserId } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleResize = () => {
        setShowImage(window.innerWidth >= 700);
    };

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        setPassword(password);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Show pending toast when the request is sent
        const pendingToastId = toast.loading('Logging in...');

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem('userId', data.userId); // Save user ID
                setUserId(data.userId);

                // Dismiss pending toast and show success toast
                toast.update(pendingToastId, {
                    render: 'Logged in successfully',
                    type: 'success',
                    isLoading: false,
                    autoClose: 2000, // Show success toast for 2 seconds
                });

                // Delay navigation so user can see the success message
                setTimeout(() => {
                    navigate('/'); // Redirect to home page
                }, 2000);
            } else if (response.status === 401) {
                // Dismiss pending toast and show warning toast for invalid credentials
                setTimeout(() => setInvalidInput(true), 1000); // Input boxes animate(shakes) for 1s
                
                toast.update(pendingToastId, {
                    render: 'Invalid Credentials',
                    type: 'warning',
                    isLoading: false,
                    autoClose: 3000, // Auto-close warning after 3 seconds
                });
                
                setInvalidInput(false);
            } else {
                // Handle other errors by displaying a generic error message
                const errorData = await response.json();
                toast.update(pendingToastId, {
                    render: errorData.message || 'Login failed',
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        } catch (error) {
            // Dismiss pending toast and show error toast for any exceptions
            toast.update(pendingToastId, {
                render: 'Error logging in',
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            });
            console.error('Error logging in:', error);
        }
    };


    return (
        <>
            <NavigationBar />
            <ToastContainer position="bottom-right" autoClose={3000} />
            <Container fluid>
                <Row style={{ height: '100vh' }}>
                    {showImage && (<Col className='bg-img' xs={12} sm={3} md={5} />)}
                    <Col xs={12} sm={showImage ? 9 : 12} md={showImage ? 7 : 12} className="form-container">
                        <Container>
                            <Row className="justify-content-center">
                                <Col className="text-center mb-3">
                                    <img src="./LockIcon.png" alt="Lock Icon" width={64} />
                                    <h1 className="form-heading">Log In</h1>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col md={8}>

                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>
                                                <span className="required-field">Email Address</span> <span style={{ color: 'red' }}>*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className={`input-container ${invalidInput ? 'shake' : ''}`}
                                            />
                                        </Form.Group>


                                        <Form.Group className="mb-4" controlId="formBasicPassword">
                                            <Form.Label>
                                                <span className="required-field">Password</span> <span style={{ color: 'red' }}>*</span>
                                            </Form.Label>
                                            <div style={{ position: 'relative' }}>
                                                <Form.Control
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Enter password"
                                                    value={password}
                                                    onChange={handlePasswordChange}
                                                    required
                                                    className={`input-container ${invalidInput ? 'shake' : ''}`}
                                                />
                                                <div className="password-toggle-icon" onClick={handleTogglePasswordVisibility}>
                                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                                </div>
                                            </div>
                                        </Form.Group>


                                        <Form.Group className="mb-4" controlId="formBasicCheckbox">
                                            <Form.Check
                                                type="checkbox"
                                                label={<span style={{ fontSize: '1.2rem' }}>Remember me</span>}
                                                className='custom-checkbox'
                                            />
                                        </Form.Group>

                                        <Button variant="primary" type="submit" size="lg" className="submit-button">
                                            LOG IN
                                        </Button>
                                    </Form>

                                    <Row className="mt-3">
                                        <Col className="text-center">
                                            <p style={{ fontSize: '1.5rem' }}>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
}


export default Login;