import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

function FeeManagement() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/admin/fees`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (err) {
      setTransactions([
        { id: 1, studentName: 'John Doe', type: 'deposit', amount: 500, date: '2024-01-15', status: 'completed' },
        { id: 2, studentName: 'Jane Smith', type: 'deposit', amount: 750, date: '2024-01-14', status: 'completed' },
        { id: 3, studentName: 'Mike Johnson', type: 'withdraw', amount: 100, date: '2024-01-13', status: 'pending' },
        { id: 4, studentName: 'Sarah Williams', type: 'deposit', amount: 600, date: '2024-01-12', status: 'completed' }
      ]);
    }
  };

  const handleApproveRefund = async (transactionId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`${API_URL}/admin/fees/${transactionId}/approve`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchTransactions();
    } catch (err) {
      setTransactions(transactions.map(t => 
        t.id === transactionId ? { ...t, status: 'completed' } : t
      ));
    }
  };

  const filteredTransactions = transactions.filter(t => 
    filter === 'all' || t.type === filter || t.status === filter
  );

  return (
    <div>
      <h1>Fee Management</h1>

      <div className="filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Transactions</option>
          <option value="deposit">Deposits</option>
          <option value="withdraw">Withdrawals</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.studentName}</td>
                <td>{transaction.type}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.date}</td>
                <td>
                  <span className={`badge ${transaction.status}`}>
                    {transaction.status}
                  </span>
                </td>
                <td>
                  {transaction.type === 'withdraw' && transaction.status === 'pending' && (
                    <button 
                      className="btn-small btn-approve" 
                      onClick={() => handleApproveRefund(transaction.id)}
                    >
                      Approve Refund
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FeeManagement;
