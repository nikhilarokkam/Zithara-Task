import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import searchIcon from './search.png';
import arrowUpIcon from './up-arrow.png';
import arrowDownIcon from './down-arrow.png';

function formatDate(dateString) {
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString(), 
    time: date.toLocaleTimeString() 
  };
}

function App() {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState({ column: null, order: null });
  const recordsPerPage = 20;

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/customers')
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  
  const sortedCustomers = customers.slice().sort((a, b) => {
    if (sortBy.column === 'date') {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortBy.order === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortBy.column === 'time') {
      const timeA = formatDate(a.created_at).time;
      const timeB = formatDate(b.created_at).time;
      return sortBy.order === 'asc' ? timeA.localeCompare(timeB) : timeB.localeCompare(timeA);
    }
    return 0;
  });

  
  const filteredCustomers = sortedCustomers.filter(customer =>
    customer.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const currentRecords = filteredCustomers.slice(indexOfFirstRecord, indexOfLastRecord);

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

 
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
  };

  
  const handleSortBy = (column) => {
    if (sortBy.column === column) {
      setSortBy({ column, order: sortBy.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortBy({ column, order: 'asc' });
    }
  };

  return (
    <div>
      <Header />
      
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by Name or Location..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <div className="search-icon">
          <img src={searchIcon} alt="Search" />
        </div>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Location</th>
              <th colSpan={2} style={{ paddingLeft: '90px' }}>Created At</th>
              </tr>
              <tr>
                <th style={{ backgroundColor: 'hsl(0, 0%, 99%)', color: 'black' }}></th>
                <th style={{ backgroundColor: 'hsl(0, 0%, 99%)', color: 'black' }}></th>
                <th style={{ backgroundColor: 'hsl(0, 0%, 99%)', color: 'black' }}></th>
                <th style={{ backgroundColor: 'hsl(0, 0%, 99%)', color: 'black' }}></th>
                <th style={{ backgroundColor: 'hsl(0, 0%, 99%)', color: 'black' }}></th>
                
              <th style={{ backgroundColor: 'hsl(0, 0%, 99%)', color: 'black' }}>
                Date
                <button onClick={() => handleSortBy('date')}>
                  <img src={sortBy.column === 'date' && sortBy.order === 'asc' ? arrowUpIcon : arrowDownIcon} alt="Sort" />
                </button>
              </th>
              <th style={{ backgroundColor: 'hsl(0, 0%, 99%)', color: 'black' }}>
                Time
                <button onClick={() => handleSortBy('time')}>
                  <img src={sortBy.column === 'time' && sortBy.order === 'asc' ? arrowUpIcon : arrowDownIcon} alt="Sort" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((customer, index) => (
              <tr key={index}>
                <td>{customer.sno}</td>
                <td>{customer.customer_name}</td>
                <td>{customer.age}</td>
                <td>{customer.phone}</td>
                <td>{customer.location}</td>
                <td>{formatDate(customer.created_at).date}</td> 
                <td>{formatDate(customer.created_at).time}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="pagination-container">
        {Array.from({ length: Math.ceil(filteredCustomers.length / recordsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;

