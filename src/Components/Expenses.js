// src/Components/Expenses.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddExpenseModal from './AddExpenseModal'; // Assuming you have or will create AddExpenseModal
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { FaTrash } from 'react-icons/fa'; // Importing a trash icon from react-icons

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Expenses = () => {
    const [expenseData, setExpenseData] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Fetch expense data from the backend API
    const fetchExpenseData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/expenses/expenses");
            console.log("Expense data fetched:", response.data); // Add this line
            setExpenseData(response.data);
            calculateTotalExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expense data:", error);
        } finally {
            setLoading(false);
        }
    };    

    // Calculate total expenses
    const calculateTotalExpenses = (data) => {
        const total = data.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
        setTotalExpenses(total);
    };

    useEffect(() => {
        fetchExpenseData(); // Fetch data on component mount
    }, []);

    // Add new expense from modal form
    const addNewExpense = async (newExpense) => {
        const expenseWithId = { ...newExpense, transactionId: Date.now() }; // Adding a unique ID
        try {
            await axios.post("http://localhost:8080/expenses/saveExpenses"); // Ensure this is the correct endpoint
            fetchExpenseData(); // Fetch updated expense data
        } catch (error) {
            console.error("Error adding new expense:", error);
        }
    };    

    // Handle deletion of an expense
    const deleteExpense = async (transactionId) => {
        try {
            await axios.delete(`http://localhost:8080/expenses/${transactionId}`); // Adjust the URL as needed
            const updatedExpenseData = expenseData.filter(expense => expense.transactionId !== transactionId);
            setExpenseData(updatedExpenseData);
            calculateTotalExpenses(updatedExpenseData);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };    

    // Prepare data for the bar chart
    const prepareBarChartData = () => {
        const labels = [...new Set(expenseData.map(expense => expense.item))]; // Unique items
        const amounts = labels.map(item => {
            return expenseData
                .filter(expense => expense.item === item)
                .reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
        });

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Expense Amount (₹)',
                    data: amounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    // Prepare data for the pie chart with vibrant colors
    const preparePieChartData = () => {
        const labels = [...new Set(expenseData.map(expense => expense.item))];
        const amounts = labels.map(item => {
            return expenseData
                .filter(expense => expense.item === item)
                .reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
        });

        // Define vibrant colors
        const vibrantColors = [
            'rgba(255, 99, 132, 0.6)', // Red
            'rgba(54, 162, 235, 0.6)', // Blue
            'rgba(255, 206, 86, 0.6)', // Yellow
            'rgba(75, 192, 192, 0.6)', // Teal
            'rgba(153, 102, 255, 0.6)', // Purple
            'rgba(255, 159, 64, 0.6)', // Orange
            'rgba(255, 0, 255, 0.6)',   // Magenta
            'rgba(0, 255, 255, 0.6)',   // Cyan
        ];

        // Limit the number of colors to the number of labels
        const colors = vibrantColors.slice(0, labels.length);

        return {
            labels: labels,
            datasets: [
                {
                    data: amounts,
                    backgroundColor: colors,
                    borderColor: 'rgba(255, 255, 255, 1)',
                    borderWidth: 2,
                },
            ],
        };
    };

    // Show loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Expense Transactions</h1>
            <button onClick={() => setShowModal(true)}>New Expense</button>
            <h2>Total Expenses: ₹{totalExpenses.toFixed(2)}</h2>

            {/* Combined Charts Container */}
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
                {/* Bar Chart for Expense Amount */}
                <div style={{ width: '45%', height: '300px' }}>
                    <Bar 
                        data={prepareBarChartData()} 
                        options={{ 
                            responsive: true, 
                            maintainAspectRatio: false, 
                            plugins: { legend: { position: 'top' } } 
                        }} 
                    />
                </div>

                {/* Pie Chart for Expense Distribution */}
                <div style={{ width: '45%', height: '300px' }}>
                    <Pie 
                        data={preparePieChartData()} 
                        options={{ 
                            responsive: true, 
                            maintainAspectRatio: false, 
                            plugins: { legend: { position: 'top' } } 
                        }} 
                    />
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Amount (₹)</th>
                        <th>Date</th>
                        <th>Actions</th> {/* New Actions column */}
                    </tr>
                </thead>
                <tbody>
                    {expenseData.map((expense) => (
                        <tr key={expense.id}>
                            <td>{expense.id}</td>
                            <td>{expense.item}</td>
                            <td>{expense.quantity}</td>
                            <td>₹{parseFloat(expense.amount).toFixed(2)}</td>
                            <td>{new Date(expense.date).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => deleteExpense(expense.id)}>
                                    <FaTrash style={{ color: 'red' }} /> {/* Delete icon */}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Expense Modal */}
            <AddExpenseModal 
                showModal={showModal} 
                closeModal={() => setShowModal(false)} 
                addNewExpense={addNewExpense} 
            />
        </div>
    );
};

export default Expenses;
