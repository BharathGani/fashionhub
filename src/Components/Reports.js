import React, { useState } from 'react';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const Reports = () => {
  const [customerName, setCustomerName] = useState('');
  const [startDate, setStartDate] = useState('2024-10-01');
  const [endDate, setEndDate] = useState('2024-10-31');
  const [totalSpent, setTotalSpent] = useState(5000);
  const [categoryExpenses, setCategoryExpenses] = useState({ clothing: 3000, accessories: 2000 });

  const customerData = {
    'JohnDoe': { totalSpent: 5000, categoryExpenses: { clothing: 3000, accessories: 2000 } },
    'JaneDoe': { totalSpent: 7000, categoryExpenses: { clothing: 4000, accessories: 3000 } }
  };

  const handleGenerateReport = () => {
    const customerInfo = customerData[customerName];
    if (customerInfo) {
      setTotalSpent(customerInfo.totalSpent);
      setCategoryExpenses(customerInfo.categoryExpenses);
    } else {
      setTotalSpent(0);
      setCategoryExpenses({ clothing: 0, accessories: 0 });
      alert('Customer not found');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(24);
    doc.setTextColor("#3d45a0");
    doc.text('FashionCart Invoice', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.setTextColor("#000");
    doc.text(`Customer Name: ${customerName}`, 20, 40);
    doc.text(`Date Range: ${startDate} to ${endDate}`, 20, 50);
    doc.text(`Total Spent: ₹${totalSpent}`, 20, 60);
    doc.text('Category Breakdown:', 20, 70);
    doc.text(`Clothing: ₹${categoryExpenses.clothing}`, 30, 80);
    doc.text(`Accessories: ₹${categoryExpenses.accessories}`, 30, 90);
    doc.setFontSize(12);
    doc.setTextColor("#3d45a0");
    doc.text('Thank you for your business!', 20, 110);

    doc.save(`${customerName}_Invoice.pdf`);
  };

  const generateExcel = () => {
    const invoiceData = [
      ["FashionCart Invoice"],
      ["Customer Name", customerName],
      ["Date Range", `${startDate} to ${endDate}`],
      [],
      ["Total Spent", `₹${totalSpent}`],
      ["Category Breakdown"],
      ["Clothing", `₹${categoryExpenses.clothing}`],
      ["Accessories", `₹${categoryExpenses.accessories}`]
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(invoiceData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoice");

    XLSX.writeFile(workbook, `${customerName}_Invoice.xlsx`);
  };

  return (
    <div className="reports-container">
      {/* Header Section */}
      <div className="header">
        <h2>Customer Purchase History</h2>
        <div className="period-filter">
          <label>Customer Name or ID:</label>
          <input 
            type="text" 
            value={customerName} 
            onChange={(e) => setCustomerName(e.target.value)} 
            placeholder="Enter Customer Name or ID"
          />
          <label>Period:</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
          <button className="generate-report" onClick={handleGenerateReport}>
            Generate Report
          </button>
        </div>
        <div className="export-buttons">
          <button className="pdf-button" onClick={generatePDF}>Download Invoice (PDF)</button>
          <button className="excel-button" onClick={generateExcel}>Download Invoice (Excel)</button>
        </div>
      </div>

      {/* Summary Section */}
      <div className="summary-section">
        <div className="summary-item">
          <h3>Total Spent</h3>
          <p>₹{totalSpent}</p>
        </div>
        <div className="summary-item">
          <h3>Category Breakdown</h3>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
              <span>Clothing:</span>
              <span>₹{categoryExpenses.clothing.toFixed(2)}</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
              <span>Accessories:</span>
              <span>₹{categoryExpenses.accessories.toFixed(2)}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reports;
