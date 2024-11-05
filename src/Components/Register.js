import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const username = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);
    const phoneNumber = useRef(null);
    const [image, setImage] = useState(null); // State for storing the Base64 string of the image
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Remove the 'data:image/*;base64,' part
                setImage(base64String); // Store the Base64 string only
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const handleRegister = () => {
        setErrorMessage("");
        setSuccessMessage("");

        if (password.current.value !== confirmPassword.current.value) {
            setErrorMessage("Passwords do not match!");
            alert("Passwords do not match!");
            return;
        }

        const formData = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
            confirmPassword: confirmPassword.current.value,
            phoneNumber: phoneNumber.current.value,
            image: image // Set image as Base64 string
        };

        axios.post("http://localhost:8080/register", formData)
            .then((posRes) => {
                setSuccessMessage("Registration successful!");
                alert("Registration successful! Redirecting to login...");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            })
            .catch((errRes) => {
                setErrorMessage("Registration failed! Please try again.");
                alert("Registration failed! Please try again.");
                console.log(errRes);
            });
    };

    return (
        <div className="register"
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
            <h2>Create Your Account</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="form-group">
                <input
                    type="text"
                    placeholder="Name"
                    ref={username}
                />
            </div>
            <div className="form-group">
                <input
                    type="email"
                    placeholder="Email"
                    ref={email}
                />
            </div>

            <div className="form-group">
                <input
                    type="text"
                    placeholder="Phone Number"
                    ref={phoneNumber}
                />
            </div>

            <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    ref={password}
                />
                
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    ref={confirmPassword}
                />
            </div>
            <div className="form-group">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange} // Call function on file selection
                />
            </div>

            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
