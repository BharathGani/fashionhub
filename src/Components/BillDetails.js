import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Container, Paper, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';

const BillDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [paymentMethod, setPaymentMethod] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

  if (!state) {
    return (
      <Container style={styles.container}>
        <Typography variant="h6" color="error" style={styles.errorText}>
          No data available
        </Typography>
      </Container>
    );
  }

  const { customerName, phonenumber, items, invoiceTotal, transactionId } = state;

  const handlePaymentMethodChange = (event) => {
    const method = event?.target?.value || '';
    setPaymentMethod(method);
    setShowQRCode(method !== 'Cash');
  };

  const handlePayment = () => {
    navigate('/invoice', {
      state: { 
        customerName,
        phonenumber,
        transactionId,
        items, 
        invoiceTotal, 
        paymentMethod 
      },
    });
  };

  return (
    <Container style={styles.container}>
      <Paper elevation={3} style={styles.paper}>
      <Typography 
    variant="h4" 
    align="center" 
    gutterBottom 
    style={{
        fontFamily: "'Roboto', sans-serif", 
        marginTop: '20px', 
        color: 'blue' // Change text color to blue
    }}
>
    Bill Details
</Typography>

        <Typography variant="h6" style={styles.customerName}>
          Customer Name: <span style={styles.highlight}>{customerName}</span>
        </Typography>
        <Typography variant="h6" style={styles.customerName}>
          Mobile Number: <span style={styles.highlight}>{phonenumber}</span>
        </Typography>
        <Typography variant="h6" style={styles.total}>
          Total: <span style={styles.highlight}>${invoiceTotal.toFixed(2)}</span>
        </Typography>

        {/* Transaction ID Display */}
        {transactionId && (
          <Typography variant="h6" style={styles.transactionId}>
            Transaction ID: <span style={styles.highlight}>{transactionId}</span>
          </Typography>
        )}

        <Typography variant="h6" gutterBottom style={styles.itemsTitle}>
          Items:
        </Typography>
        {items.map((item, index) => (
          <Typography key={index} style={styles.item}>
            {item.description} - Quantity: <span style={styles.highlight}>{item.quantity}</span>, 
            Price: <span style={styles.highlight}>${item.price}</span>
          </Typography>
        ))}

        <FormControl fullWidth style={{ marginTop: '20px' }}>
          <InputLabel>Select Payment Method</InputLabel>
          <Select
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            variant="outlined"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            <MenuItem value="Paytm">Paytm</MenuItem>
            <MenuItem value="Google Pay">Google Pay</MenuItem>
            <MenuItem value="PhonePe">PhonePe</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
          </Select>
        </FormControl>

        {showQRCode && paymentMethod !== 'Cash' && (
          <div style={styles.qrContainer}>
            <Typography variant="h6" style={styles.qrTitle}>
              Scan this QR code to pay with {paymentMethod}:
            </Typography>
            <QRCodeCanvas value={`Payment of $${invoiceTotal.toFixed(2)} via ${paymentMethod}`} size={200} />
          </div>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handlePayment}
          disabled={!paymentMethod}
          style={{ marginTop: '20px', borderRadius: '20px' }}
        >
          Complete Payment
        </Button>
      </Paper>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px', // Limit the width for better readability
  },
  title: {
    marginBottom: '20px',
    color: '#333',
    fontFamily: "'Roboto', sans-serif",
  },
  customerName: {
    fontWeight: 'bold',
    marginBottom: '10px',
    fontFamily: "'Roboto', sans-serif",
  },
  total: {
    fontWeight: 'bold',
    marginBottom: '20px',
    fontFamily: "'Roboto', sans-serif",
  },
  transactionId: {
    fontWeight: 'bold',
    marginBottom: '20px',
    fontFamily: "'Roboto', sans-serif",
  },
  itemsTitle: {
    marginBottom: '10px',
    fontWeight: 'bold',
    fontFamily: "'Roboto', sans-serif",
  },
  item: {
    marginBottom: '8px',
    color: '#555',
    fontFamily: "'Roboto', sans-serif",
  },
  highlight: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#d9534f',
    textAlign: 'center',
  },
  qrContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  qrTitle: {
    marginBottom: '10px',
    fontWeight: 'bold',
    fontFamily: "'Roboto', sans-serif",
  },
};

export default BillDetails;