import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState('light');
  const [username, setUsername] = useState('');
  const [showInputs, setShowInputs] = useState(false);

  // Effect to apply the selected theme and save it to local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.style.backgroundColor = savedTheme === 'light' ? '#f0f8ff' : '#333';
    document.body.style.color = savedTheme === 'light' ? '#000' : '#fff';
  }, []);

  // Effect to update styles when theme changes
  useEffect(() => {
    document.body.style.backgroundColor = theme === 'light' ? '#f0f8ff' : '#333';
    document.body.style.color = theme === 'light' ? '#000' : '#fff';
    localStorage.setItem('theme', theme); // Save the theme to local storage
  }, [theme]);

  // const handleSaveChanges = async () => {
  //   try {
  //     // If saving user settings is required, adjust this part accordingly
  //     alert('Changes saved successfully!');
  //   } catch (error) {
  //     console.error('Error saving changes:', error);
  //     alert('Failed to save changes. Please try again.');
  //   }
  // };

  const handleDeleteAccount = () => {
    setShowInputs(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/deleteCustomer/${username}`);
      alert('Account deleted successfully!');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Please try again.');
    }
  };

  return (
    <div style={{
      backgroundColor: theme === 'light' ? '#f0f8ff' : '#444',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '600px',
      margin: 'auto',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: theme === 'light' ? '#333' : '#fff' }}>Settings</h2>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <h3 style={{ color: theme === 'light' ? '#007BFF' : '#FF5733' }}>Preferences</h3>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>Enable Notifications:</label>
            <input 
              type="checkbox" 
              checked={notificationsEnabled} 
              onChange={(e) => setNotificationsEnabled(e.target.checked)} 
              className="custom-checkbox"
            />
          </div>
          <div>
            <label style={{ marginRight: '10px' }}>Theme:</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)} style={{ padding: '5px', borderRadius: '4px' }}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        {showInputs && (
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ color: theme === 'light' ? '#FF5733' : '#FFC300' }}>Please Enter Your Username to Delete Your Account</h3>
            <div style={{ marginBottom: '10px' }}>
              <label>Username:</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: `1px solid ${theme === 'light' ? '#ccc' : '#888'}`
                }} 
              />
            </div>
            <button 
              className="confirm-delete" 
              onClick={confirmDeleteAccount} 
              style={{
                backgroundColor: '#FF5733',
                color: '#fff',
                padding: '10px 15px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Confirm Delete Account
            </button>
          </div>
        )}

        <div className="actions">
          {!showInputs && (
            <button 
              className="delete-account" 
              onClick={handleDeleteAccount} 
              style={{
                backgroundColor: '#007BFF',
                color: '#fff',
                padding: '10px 15px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Delete Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
