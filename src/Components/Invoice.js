import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
} from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PaymentIcon from '@mui/icons-material/Payment';
import { TimeScale } from 'chart.js';

const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { state } = location;

  const [isGenerating, setIsGenerating] = useState(false);

  const fromAddress = "Fashion Mart\n123 Fashion St.\nFashion City, FC 12345";

  if (!state) {
    return (
      <Container style={styles.container}>
        <Typography variant="h6" color="error" style={styles.errorText}>
          No invoice data available
        </Typography>
      </Container>
    );
  }

  const { customerName, phonenumber, items, invoiceTotal, paymentMethod, transactionId } = state;

  const generatePDF = () => {
    setIsGenerating(true);
    const input = document.getElementById('invoice');

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;
      const todayDate = new Date().toLocaleDateString();
      const presentTime=new Date().toLocaleTimeString();
      
      pdf.setFontSize(12);
      pdf.text(`Date: ${todayDate}`, 10, 20);
      pdf.text(`Time: ${presentTime}`,10,29);
      pdf.text(`Transaction ID: ${transactionId}`, 10, 38);
      pdf.addImage(imgData, 'PNG', 0, position + 40, imgWidth, imgHeight);

      pdf.save('invoice.pdf');
      setIsGenerating(false);
      
      // Navigate to the dashboard page after generating the PDF
      navigate('/dashboardd'); // Change the path to your dashboard route
    }).catch(() => {
      setIsGenerating(false);
    });
  };

  return (
    <Container style={styles.container}>
      <Card elevation={3} style={styles.card} id="invoice">
        <Typography variant="h4" align="center" gutterBottom style={{
          fontFamily: "'Roboto', sans-serif", 
          marginTop: '20px', 
          color: 'blue' // Change text color to blue
        }}>
          Fashion Hub
        </Typography>

        <div style={styles.addressSection}>
          <Typography variant="h6" gutterBottom style={{
            fontFamily: "'Roboto', sans-serif", 
            color: 'blue' // Change text color to blue
          }}>
            From:
          </Typography>
          <Typography variant="body1" style={styles.addressText}>
            {fromAddress}
          </Typography>
        </div>

        <div style={styles.addressSection}>
          <Typography variant="h6" gutterBottom style={{
            fontFamily: "'Roboto', sans-serif",
            color: 'blue' // Change text color to blue
          }}>
            To:
          </Typography>
          <Typography variant="body1" style={styles.addressText}>
          </Typography>
        </div>

        <Typography variant="h6" style={{
          fontFamily: "'Times New Roman', sans-serif",
          color: 'blue' // Change text color to blue
        }}>
          Customer Name: <span style={styles.highlight}>{customerName}</span>
        </Typography>
        <Typography variant="h6" style={{
          fontFamily: "'Times New Roman', sans-serif",
          color: 'blue'}}>
          Mobile Number: <span style={styles.highlight}>{phonenumber}</span>
        </Typography>

        <Typography variant="h6" style={{
          fontFamily: "'Times New Roman', sans-serif",
          color: 'blue'}}>
          Total: <span style={styles.highlight}>${invoiceTotal.toFixed(2)}</span>
        </Typography>

        <Typography variant="h6" style={{
          fontFamily: "'Times New Roman', sans-serif",
          color: 'blue'}} >
          <PaymentIcon fontSize="small" /> Payment Method: <span style={styles.highlight}>{paymentMethod}</span>
        </Typography>

        <Typography variant="h6" style={{
          fontFamily: "'Times New Roman', sans-serif",
          color: 'blue'}} >
          Transaction ID: <span style={styles.highlight}>{transactionId}</span>
        </Typography>

        <Typography variant="h6" gutterBottom style={{
          fontFamily: "'Times New Roman', sans-serif",
          color: 'red'}} >
          Items:
        </Typography>

        {/* Table for Items */}
        <TableContainer style={{ maxWidth: '600px' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ padding: '5px', fontSize: '0.875rem' }}>Serial No.</TableCell>
                <TableCell style={{ padding: '5px', fontSize: '0.875rem' }}>Product</TableCell>
                <TableCell style={{ padding: '5px', fontSize: '0.875rem' }}>Quantity</TableCell>
                <TableCell style={{ padding: '5px', fontSize: '0.875rem' }}>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell style={{ padding: '5px', fontSize: '0.875rem' }}>{index + 1}</TableCell>
                  <TableCell style={{ padding: '5px', fontSize: '0.875rem' }}>{item.description}</TableCell>
                  <TableCell style={{ padding: '5px', fontSize: '0.875rem' }}>{item.quantity}</TableCell>
                  <TableCell style={{ padding: '5px', fontSize: '0.875rem' }}>{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Button to Generate PDF */}
        <Button
          variant="contained"
          color="primary"
          onClick={generatePDF}
          style={{ marginTop: '20px' }}
          className="no-print"
          sx={{
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          }}
        >
          {isGenerating ? 'Generating PDF...' : 'Print Invoice'}
        </Button>
      </Card>

      {/* Style block for print media */}
      <style>
        {`
          @media print {
            .no-print {
              display: none;
            }
            #invoice {
              border: 10px solid #007bff; /* Adding border */
              border-width: thick; /* Border thickness */
              border-radius: 8px; /* Rounded corners */
              margin: 20px;
              box-sizing: border-box,
              padding: 10px; /* Padding inside the border */
            }
          }
        `}
      </style>
    </Container>
  );
};

// Inline styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"Arial", sans-serif', // Clean and modern font
    color: '#333',
  },
  card: {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    textAlign: 'left',
    borderColor: '#007bff', // Border color for card
    borderStyle: 'solid',
    borderWidth: '1px',
  },
};

export default Invoice;
