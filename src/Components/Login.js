import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Login = ({ onLogin }) => {
    const [identifier, setIdentifier] = useState(''); // Combined state for username or email
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // State to handle error messages
    const navigate = useNavigate();

    const handleLogin = async () => {
        setErrorMessage(''); // Reset error message on new login attempt
        try {
            const loginData = { email: identifier, password }; // Use 'email' as key
            const response = await axios.post('http://localhost:8080/login', loginData);
    
            if (response.status === 200) {
                alert(response.data); // Show success message
                onLogin(true);
                navigate('/dashboard', { state: { identifier } }); // Navigate to the dashboard
            }
        } catch (error) {
            setErrorMessage(error.response?.data || 'Invalid credentials');
        }
    };    

    return (
        <div className="login"
        style={{
                backgroundImage: 'url("https://img.freepik.com/free-psd/shopping-vertical-background_23-2150409471.jpg")', // Replace with your image path
                backgroundSize: 'cover',
                backgroundPosition: 'center', 
                height: '80vh', 
                display: 'flex', 
                flexDirection: 'column', 
                color: 'black',
            }}
            >
            <h1>Fashion Hub</h1> 
            <h2>Login to Your Account</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="form-group">
                <label>Email</label>
                <input
                    type="text"
                    placeholder="Enter your username or email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <div className="password-input">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                    >
                        {showPassword ? '👁' : '👁‍🗨'} {/* Eye symbols for show/hide */}
                    </span>
                </div>
            </div>
            <button className="login-button" onClick={handleLogin}>Login</button>

           
            <p>
                Don't have an account?{' '}
                <button className="register-button" style={{textDecoration:"none"}} onClick={() => navigate('/register')}>Register</button>
            </p>
        </div>
    );
};

export default Login;
