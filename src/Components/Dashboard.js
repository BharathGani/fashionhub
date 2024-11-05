
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import InvoiceGenerator from './InvoiceGenerator';
import { FaUserCircle } from 'react-icons/fa';
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


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const navigate=useNavigate()
  
  
  const location = useLocation();
  const { identifier:email } = location.state || {};
  // const { identifier: email } = location.state || {};
  
  const [customerDetails,setCustomerDetails]=useState([]);
  const handleClick = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`http://localhost:8080/getCustomer/${email}`); // Use backticks for template literals
        console.log(response.data);
        setCustomerDetails(response.data); // Store customer details
        navigate('/profile', { state: { customerDetails: response.data } });
    } catch (error) {
        console.error("Error fetching customer details:", error);
    } finally {
        setLoading(false);
    }
};

  // const [transactions, setTransactions] = useState([
  //   {
  //     id: 1,
  //     user: "Alice",
  //     amount: 2000,
  //     date: "2024-10-20",
  //     status: "Completed",
  //     type: "Sales"
  //   },
  //   {
  //     id: 2,
  //     user: "Bob",
  //     amount: 500,
  //     date: "2024-10-21",
  //     status: "Completed",
  //     type: "Expenses"
  //   },
  //   {
  //     id: 3,
  //     user: "Charlie",
  //     amount: 300,
  //     date: "2024-10-22",
  //     status: "Completed",
  //     type: "Purchases"
  //   }
  // ]);

  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [filterType, setFilterType] = useState('All');

  const [invoices, setInvoices] = useState([]);
  const [error,setError]=useState(null); 

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


  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get('/api/dashboard');
  //       setTransactions(response.data.transactions); // Uncomment when API is ready
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   // Uncomment to fetch data from API
  //   // fetchData();
  // }, []);

  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  //   setCurrentPage(1);
  // };

  // const handleFilterChange = (e) => {
  //   setFilterType(e.target.value);
  //   setCurrentPage(1);
  // };

  // const filteredTransactions = transactions.filter(transaction => {
  //   const matchesSearch = transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     transaction.status.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesType = filterType === 'All' || transaction.type === filterType;
  //   return matchesSearch && matchesType;
  // });

  // const sortTransactions = (key) => {
  //   let direction = 'ascending';

  //   if (sortConfig.key === key && sortConfig.direction === 'ascending') {
  //     direction = 'descending';
  //   }

  //   const sortedTransactions = [...filteredTransactions].sort((a, b) => {
  //     if (key === 'transactionId') {
  //       return direction === 'ascending' ? a.id - b.id : b.id - a.id;
  //     } else if (key === 'date') {
  //       return direction === 'ascending'
  //         ? new Date(a.date) - new Date(b.date)
  //         : new Date(b.date) - new Date(a.date);
  //     } else if (key === 'amount') {
  //       return direction === 'ascending'
  //         ? a.amount - b.amount
  //         : b.amount - a.amount;
  //     } else if (key === 'type') {
  //       return direction === 'ascending'
  //         ? a.type.localeCompare(b.type)
  //         : b.type.localeCompare(a.type);
  //     }
  //     return 0;
  //   });

  //   setSortConfig({ key, direction });
  //   setTransactions(sortedTransactions);
  // };

  // const indexOfLastTransaction = currentPage * transactionsPerPage;
  // const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  // const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  // const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  // const prepareBarChartData = () => {
  //   const types = ['Sales', 'Expenses', 'Purchases'];
  //   const amounts = types.map(type => {
  //     return filteredTransactions
  //       .filter(transaction => transaction.type === type)
  //       .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
  //   });

  //   return {
  //     labels: types,
  //     datasets: [
  //       {
  //         label: 'Transaction Amount (₹)',
  //         data: amounts,
  //         backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'],
  //         borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
  //         borderWidth: 1,
  //       },
  //     ],
  //   };
  // };

  // const preparePieChartData = () => {
  //   const types = ['Sales', 'Expenses', 'Purchases'];
  //   const amounts = types.map(type => {
  //     return filteredTransactions
  //       .filter(transaction => transaction.type === type)
  //       .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
  //   });

  //   return {
  //     labels: types,
  //     datasets: [
  //       {
  //         data: amounts,
  //         backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
  //         borderColor: 'rgba(255, 255, 255, 1)',
  //         borderWidth: 2,
  //       },
  //     ],
  //   };
  // };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Fashion Hub</h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 0' }}>
          <FaUserCircle size={80} color="#888" />
          <Link 
            to="/profile" onClick={handleClick}
            style={{ fontSize: '18px', color: 'white', textDecoration:'none', textAlign: 'center' }}
          >
            <p style={{color:'white'}}>{email}</p>
          </Link>

          {/* <div>
            <h1>Dashboard</h1>
            {identifier ? (
                <p>Welcome, {identifier}!</p> // Display the identifier
            ) : (
                <p>No user data found.</p>
            )}
        </div> */}


        </div>
        <nav>
          <ul>
            <li><Link to="/sales">Sales</Link></li>
            <li><Link to="/purchases">Purchases</Link></li>
            <li><Link to="/expenses">Expenses</Link></li>
            {/* <li><Link to="/reports">Reports</Link></li> */}
            {/* <li><Link to="/settings">Settings</Link></li> */}
            {/* <li><Link to="/profile">Profile</Link></li> */}
          </ul>
        </nav>
        <Link
          to="/settings"
          style={{
            position: 'fixed',
            bottom: '80px',
            left: '98px',
            fontSize: '18px',
            color: '#333',
            textDecoration: 'none',color:'white'
          }}
        >
          Settings
        </Link>
        <button
  onClick={() => navigate('/landingpage')} // Redirect to landing page
  style={{
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    padding: '10px 20px',
    backgroundColor: '#ff4d4d',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    width: "200px",
    color: 'white'
  }}
>
  Logout
</button>


      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1 style={{fontSize:"40px"}}>Welcome</h1>
          <p>Here's an overview of your application activity.</p>
        </header>
        <button  onClick={() => navigate('/InvoiceGenerator')} style={{width:"200px",borderRadius:"20px"}}>New Invoice</button>
        <section className="transactions-section">
          <h2>Recent Transactions</h2>

          <div className="filters">
            {/* <select value={filterType} onChange={handleFilterChange}>
                            <option value="All">All</option>
                            <option value="Sales">Sales</option>
                            <option value="Purchases">Purchases</option>
                            <option value="Expenses">Expenses</option>
                        </select> */}
            {/* <input
              type="text"
              placeholder="Search by user or status"
              value={searchTerm}
              onChange={handleSearchChange}
            /> */}
          </div>

          {/* <table className="transaction-table">
            <thead>
              <tr>
                <th onClick={() => sortTransactions('transactionId')} style={{ cursor: 'pointer' }}>
                  Transaction ID {sortConfig.key === 'transactionId' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th onClick={() => sortTransactions('user')} style={{ cursor: 'pointer' }}>
                  User {sortConfig.key === 'user' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th onClick={() => sortTransactions('amount')} style={{ cursor: 'pointer' }}>
                  Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th onClick={() => sortTransactions('date')} style={{ cursor: 'pointer' }}>
                  Date {sortConfig.key === 'date' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th onClick={() => sortTransactions('type')} style={{ cursor: 'pointer' }}>
                  Type {sortConfig.key === 'type' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.user}</td>
                    <td>₹{transaction.amount}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.status}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6">No transactions found.</td></tr>
              )}
            </tbody> */}
          {/* </table> */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px"}}>Transaction ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Customer Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Phone Number</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Invoice Total</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Payment Method</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
          </tr>
        </thead>
        <tbody>
    {invoices.slice(0, 5).map(invoice => (  // Show only first 5 invoices
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

          {/* <div className="pagination">
                        <button
                            onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div> */}
        </section>

        {/* <section className="charts-section">
                    <div className="charts-container">
                        <div className="chart-container">
                            <h2>Transaction Summary</h2>
                            <Bar data={prepareBarChartData()} options={{ responsive: true }} />
                        </div>

                        <div className="chart-container">
                            <h2>Transaction Distribution</h2>
                            <Pie data={preparePieChartData()} options={{ responsive: true }} />
                        </div>
                    </div>
                </section> */}
      </main>
    </div>
  );
};

export default Dashboard;