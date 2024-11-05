import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Sales = () => {
  const [invoices, setInvoices] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getAllInvoices`);
        setInvoices(response.data); 
        setLoading(false); 
      } catch (err) {
        console.error(err); 
        setError("Failed to fetch invoice data"); 
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []); 

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>{error}</p>; 

  // Calculate Total Invoice Amount
  const totalInvoiceAmount = invoices.reduce((total, invoice) => total + invoice.invoiceTotal, 0);

  // Line Chart Data (Total Sales Over Time)
  const lineData = {
    labels: invoices.map(invoice => invoice.date),
    datasets: [
      {
        label: 'Total Sales',
        data: invoices.map(invoice => invoice.invoiceTotal),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  // Pie Chart Data (Payment Method Distribution)
  const paymentMethodCounts = invoices.reduce((acc, invoice) => {
    acc[invoice.paymentMethod] = (acc[invoice.paymentMethod] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(paymentMethodCounts),
    datasets: [
      {
        data: Object.values(paymentMethodCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>All Sales</h2>
      <h3>Total Invoice Amount: ${totalInvoiceAmount.toFixed(2)}</h3>

      {/* Charts Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ width: '48%' }}>
          <h3>Total Sales Over Time</h3>
          <Line data={lineData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
        <div style={{ width: '35%' }}>
          <h3>Payment Method Distribution</h3>
          <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: 'right' } } }} />
        </div>
      </div>

      {/* Invoice Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Transaction ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Customer Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Phone Number</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Invoice Total</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Payment Method</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.transactionId}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{invoice.transactionId}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{invoice.customerName}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{invoice.phonenumber}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>${invoice.invoiceTotal}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{invoice.paymentMethod}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{invoice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
