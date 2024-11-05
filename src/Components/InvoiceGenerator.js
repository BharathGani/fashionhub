import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Container, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InvoiceGenerator = () => {
  const [transactionId,setTransactionId]=useState('');
  const [customerName, setCustomerName] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [items, setItems] = useState([{ description: '', quantity: '', price: '' }]);
  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleItemChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
  };

  const isLastItemFilled = () => {
    const lastItem = items[items.length - 1];
    return lastItem.description && lastItem.quantity && lastItem.price;
  };

  const handleAddItem = () => {
    if (isLastItemFilled()) {
      setItems([...items, { description: '', quantity: '', price: '' }]);
    }
  };

  const calculateTotal = () => {
    const total = items.reduce((acc, item) => {
      return acc + (parseFloat(item.price) * parseInt(item.quantity || 0, 10));
    }, 0);
    setInvoiceTotal(total);
  };

  const handleProceedToPay = async () => {
    if (!customerName || !phonenumber || items.some(item => !item.description || !item.quantity || !item.price)) {
      setError('Please fill out all required fields.');
      return;
    }
    
    setError('');
    
    // Prepare the data for the transaction
    const transactionData = {
      customerName,
      phonenumber,
      transactionId,
      invoiceTotal, // Ensure invoice total is correct
      paymentMethod: "Cash", // You can set this dynamically if needed
      invoiceBy: "Your Company Name", // Set appropriately
      items: items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          price: item.price,
      })), // Transform items to the expected format
  };

  console.log('Transaction Data:', transactionData); // Log the data being sent

  try {
      const response = await axios.post('http://localhost:8080/saveInvoice', transactionData);
      const transactionId = response.data.transactionId; // Assuming the response contains a transaction ID
      navigate('/BillDetails', { state: { customerName, phonenumber, items, invoiceTotal, transactionId } });
  } catch (error) {
      setError('Transaction failed. Please try again.');
      console.error(error);
  }
    //   try {
    //     const response = await axios.post('http://localhost:8080/api/sales', transactionData); // Save to sales
    //     const transactionId = response.data.transactionId; // Assuming the response contains a transaction ID
    //     navigate('/BillDetails', { state: { customerName, phonenumber, items, invoiceTotal, transactionId } }); // Include transaction ID in state
    // } catch (error) {
    //     setError('Transaction failed. Please try again.'); // Handle error
    //     console.error(error);
    // }
   // try {
      // const response = await axios.post('/api/transactions', transactionData); // Make API call
      // const transactionId = response.data.transactionId; // Assuming the response contains a transaction ID
    //   navigate('/BillDetails', { state: { customerName, phonenumber, items, invoiceTotal } }); // Include transaction ID in state
    // } catch (error) {
    //   setError('Transaction failed. Please try again.'); // Handle error
    //   console.error(error);
    // }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom style={{ fontFamily: "'Roboto', sans-serif", marginTop: '20px',color:"blue" }}>
        New Invoice
      </Typography>
      
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', borderRadius: '10px' }}>
        <TextField
          label="Customer Name"
          fullWidth
          variant="outlined"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          margin="normal"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        />
        <TextField
          label="Phone Number"
          fullWidth
          variant="outlined"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          margin="normal"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        />

        <Table style={{ marginTop: '20px' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Item Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    name="description"
                    placeholder="Item name"
                    variant="outlined"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, e)}
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="quantity"
                    placeholder="Quantity"
                    type="number"
                    variant="outlined"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="price"
                    placeholder="Price"
                    type="number"
                    variant="outlined"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, e)}
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button
          onClick={handleAddItem}
          variant="contained"
          color="primary"
          style={{ marginTop: '20px', borderRadius: '20px' }}
          disabled={!isLastItemFilled()}
        >
          Add Item
        </Button>

        <Button onClick={calculateTotal} variant="contained" color="secondary" style={{ marginTop: '20px', borderRadius: '20px' }}>
          Calculate Total
        </Button>

        <Typography variant="h6" style={{ marginTop: '20px', fontFamily: "'Roboto', sans-serif" }}>
          Total: ${invoiceTotal.toFixed(2)}
        </Typography>

        {error && (
          <Typography color="error" style={{ marginTop: '15px', fontFamily: "'Roboto', sans-serif" }}>
            {error}
          </Typography>
        )}

        <Button 
          style={{ marginTop: "25px", borderRadius: '20px' }} 
          variant="contained" 
          color="success" 
          onClick={handleProceedToPay}
        >
          Proceed To Pay
        </Button>
      </Paper>
    </Container>
  );
};

export default InvoiceGenerator;