// src/Components/AddExpenseModal.js

import React, { useState } from 'react';

const AddExpenseModal = ({ showModal, closeModal, addNewExpense }) => {
    const [expenseData, setExpenseData] = useState({
        item: '',
        amount: '',
        date: new Date().toISOString().substring(0, 10) // Default to today's date
    });

    const handleChange = (e) => {
        setExpenseData({
            ...expenseData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (expenseData.item && expenseData.amount) {
            addNewExpense(expenseData);
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
                <h2>Add New Expense</h2>
                <label>Item</label>
                <input 
                    type="text" 
                    name="item" 
                    value={expenseData.item} 
                    onChange={handleChange} 
                    placeholder="Expense item" 
                />
                <label>Amount</label>
                <input 
                    type="number" 
                    name="amount" 
                    value={expenseData.amount} 
                    onChange={handleChange} 
                    placeholder="Amount in ₹" 
                />
                <label>Date</label>
                <input 
                    type="date" 
                    name="date" 
                    value={expenseData.date} 
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

export default AddExpenseModal;