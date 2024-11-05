import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Profile = () => {
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [password, setPassword] = useState(''); // State for password

    const location = useLocation();
    const { customerDetails } = location.state || {};

    useEffect(() => {
        if (customerDetails) {
            setUsername(customerDetails.username);
            setPhoneNumber(customerDetails.phoneNumber);
        }
    }, []);

    if (!customerDetails) {
        return <div style={{ textAlign: 'center', marginTop: '20px' }}>No customer details found.</div>;
    }

    const handleChanges=async ()=>{
        try {
            await axios.put(`http://localhost:8080/update/${username}`, {
                email: customerDetails.email, // Keep the original email
                phoneNumber,
                password,
            });
            alert('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving profile data:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    return (
        <div style={{ 
            maxWidth: '600px', 
            margin: 'auto', 
            padding: '20px', 
            backgroundColor: '#6f42c1', 
            borderRadius: '8px', 
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' 
        }}>
            <h2 style={{ textAlign: 'center', color: '#fff' }}>Profile Information</h2>

            {/* Profile Picture (No Change Option) */}
            <label style={{ fontWeight: 'bold', color: '#fff' }}>Profile Photo:</label>
            <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {customerDetails.image && (
                    <img 
                        src={`data:image/jpeg;base64,${customerDetails.image}`} 
                        alt="Profile Preview" 
                        width={100} 
                        height={100} 
                        style={{ borderRadius: '50%', marginRight: '10px' }} 
                    />
                )}
            </div>

            {/* Username Field */}
            <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <label style={{ fontWeight: 'bold', color: '#fff', width: '100px' }}>Username:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                ) : (
                    <p style={{ color: '#fff', margin: 0 }}>{customerDetails.username}</p>
                )}
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <label style={{ fontWeight: 'bold', color: '#fff', width: '100px' }}>Email:</label>
                <p style={{ color: '#fff', margin: 0 }}>{customerDetails.email}</p>
            </div>

            {/* Phone Field */}
            <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <label style={{ fontWeight: 'bold', color: '#fff', width: '100px' }}>Phone:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="1234567890"
                        style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                ) : (
                    <p style={{ color: '#fff', margin: 0 }}>{customerDetails.phoneNumber}</p>
                )}
            </div>

            {/* Password Field */}
            {isEditing && (
                <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                    <label style={{ fontWeight: 'bold', color: '#fff' }}>New Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
            )}

            <div style={{ textAlign: 'center' }}>
                {isEditing ? (
                    <>
                        <button onClick={handleChanges} style={{ backgroundColor: '#28a745', color: '#fff', borderRadius: '5px', padding: '10px 15px', cursor: 'pointer', marginRight: '10px' }}>Save Changes</button>
                        <button onClick={() => setIsEditing(false)} style={{ backgroundColor: '#6c757d', color:'#fff', borderRadius:'5px', padding:'10px 15px'}}>Cancel</button>
                    </>
                ) : (
                    <button onClick={() => setIsEditing(true)} style={{ backgroundColor:'#007BFF', color:'#fff', borderRadius:'5px', padding:'10px 15px'}}>Edit Profile</button>
                )}
            </div>
        </div>
    );
};

export default Profile;