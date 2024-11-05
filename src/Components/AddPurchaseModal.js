// src/Components/AddPurchaseModal.js

import React, { useState } from 'react';
const AddPurchaseModal = ({ showModal, closeModal, addNewPurchase }) => {
    const [formData, setFormData] = useState({
        item: '',
        quantity: '',
        amount: '',
        date: new Date().toISOString().substring(0, 10) // Default to today's date
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (formData.item && formData.quantity && formData.amount) {
            addNewPurchase(formData);
            closeModal(); // Close modal after saving
        } else {
            alert('Please fill in all fields');
        }
    };

    if (!showModal) {
        return null; // Do not render if not showing
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Add New Purchase</h2>
                <label>Item</label>
                <input 
                    type="text" 
                    name="item" 
                    value={formData.item} 
                    onChange={handleChange} 
                    placeholder="Item name" 
                />
                <label>Quantity</label>
                <input 
                    type="number" 
                    name="quantity" 
                    value={formData.quantity} 
                    onChange={handleChange} 
                    placeholder="Quantity" 
                />
                <label>Amount</label>
                <input 
                    type="number" 
                    name="amount" 
                    value={formData.amount} 
                    onChange={handleChange} 
                    placeholder="Amount in ₹" 
                />
                <label>Date</label>
                <input 
                    type="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleChange} 
                />
                <div>
                    <button onClick={handleSubmit}>Save</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddPurchaseModal;