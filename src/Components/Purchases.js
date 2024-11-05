// src/Components/Purchases.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPurchaseModal from './AddPurchaseModal'; // Assuming you have or will create AddPurchaseModal
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

const Purchases = () => {
    const [purchaseData, setPurchaseData] = useState([]);
    const [totalPurchases, setTotalPurchases] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Fetch purchase data from the backend API
    const fetchPurchaseData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/purchases");
            console.log("Purchase data fetched:", response.data); // Add this line
            setPurchaseData(response.data);
            calculateTotalPurchases(response.data);
        } catch (error) {
            console.error("Error fetching purchase data:", error);
        } finally {
            setLoading(false);
        }
    };    

    // Calculate total purchases
    const calculateTotalPurchases = (data) => {
        const total = data.reduce((acc, purchase) => acc + parseFloat(purchase.amount), 0);
        setTotalPurchases(total);
    };

    useEffect(() => {
        fetchPurchaseData(); // Fetch data on component mount
    }, []);

    // Add new purchase from modal form
    const addNewPurchase = async (newPurchase) => {
        const purchaseWithId = { ...newPurchase, transactionId: Date.now() }; // Adding a unique ID
        try {
            await axios.post("http://localhost:8080/purchases", purchaseWithId); // Ensure this is the correct endpoint
            fetchPurchaseData(); // Fetch updated purchase data
        } catch (error) {
            console.error("Error adding new purchase:", error);
        }
    };    

    // Handle deletion of a purchase
    const deletePurchase = async (transactionId) => {
        try {
            await axios.delete(`http://localhost:8080/purchases/${transactionId}`); // Adjust the URL as needed
            const updatedPurchaseData = purchaseData.filter(purchase => purchase.transactionId !== transactionId);
            setPurchaseData(updatedPurchaseData);
            calculateTotalPurchases(updatedPurchaseData);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting purchase:", error);
        }
    };    

    // Prepare data for the bar chart
    const prepareBarChartData = () => {
        const labels = [...new Set(purchaseData.map(purchase => purchase.item))]; // Unique items
        const amounts = labels.map(item => {
            return purchaseData
                .filter(purchase => purchase.item === item)
                .reduce((acc, purchase) => acc + parseFloat(purchase.amount), 0);
        });

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Purchase Amount (₹)',
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
        const labels = [...new Set(purchaseData.map(purchase => purchase.item))];
        const amounts = labels.map(item => {
            return purchaseData
                .filter(purchase => purchase.item === item)
                .reduce((acc, purchase) => acc + parseFloat(purchase.amount), 0);
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
            <h1>Purchase Transactions</h1>
            <button onClick={() => setShowModal(true)}>New Purchase</button>
            <h2>Total Purchases: ₹{totalPurchases.toFixed(2)}</h2>

            {/* Combined Charts Container */}
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
                {/* Bar Chart for Purchase Amount */}
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

                {/* Pie Chart for Purchase Distribution */}
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
                    {purchaseData.map((purchase) => (
                        <tr key={purchase.id}>
                            <td>{purchase.id}</td>
                            <td>{purchase.item}</td>
                            <td>{purchase.quantity}</td>
                            <td>₹{parseFloat(purchase.amount).toFixed(2)}</td>
                            <td>{new Date(purchase.date).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => deletePurchase(purchase.id)}>
                                    <FaTrash style={{ color: 'red' }} /> {/* Delete icon */}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Purchase Modal */}
            <AddPurchaseModal 
                showModal={showModal} 
                closeModal={() => setShowModal(false)} 
                addNewPurchase={addNewPurchase} 
            />
        </div>
    );
};

export default Purchases;
