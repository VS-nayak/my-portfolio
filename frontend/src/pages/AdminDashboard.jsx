
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function AdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  async function fetchContacts() {
    if (!token) {
      navigate('/admin');
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load messages');
      }

      setContacts(data.contacts || []);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  async function updateStatus(id, isRead) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ isRead })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Status update failed');
      }

      await fetchContacts();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteMessage(id) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this message?'
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Delete failed');
      }

      await fetchContacts();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleLogout() {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  }

  const unreadCount = contacts.filter(
    contact => !contact.isRead
  ).length;
const totalMessages = contacts.length;

const readMessages = contacts.filter(
  contact => contact.isRead
).length;

const unreadMessages = contacts.filter(
  contact => !contact.isRead
).length;

const chartData = [
  { name: 'Total', messages: totalMessages },
  { name: 'Read', messages: readMessages },
  { name: 'Unread', messages: unreadMessages }
];

const recentMessages = contacts.slice(0, 5);
  
return (
  <div className="admin-dashboard">

    <header className="dashboard-header">
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </header>

    <div className="dashboard-content">

      {/* Statistics Cards */}
      <div className="stats-container">

        <div className="dashboard-card">
          <h2>Total Messages</h2>
          <p>{totalMessages}</p>
        </div>

        <div className="dashboard-card">
          <h2>Read Messages</h2>
          <p>{readMessages}</p>
        </div>

        <div className="dashboard-card">
          <h2>Unread Messages</h2>
          <p>{unreadMessages}</p>
        </div>

      </div>

      {/* Analytics Chart */}
      <div className="analytics-section">
        <h2>Messages Analytics</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" allowDecimals={false} />
            <Tooltip />
            <Bar
              dataKey="messages"
              fill="#a855f7"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Messages */}
      <div className="recent-section">
        <h2>Recent Messages</h2>

        {recentMessages.length === 0 ? (
          <p>No recent messages.</p>
        ) : (
          recentMessages.map(contact => (
            <div className="message-card" key={contact._id}>
              <h3>{contact.name}</h3>
              <p>{contact.email}</p>
              <p>{contact.message}</p>
              <small>
                {new Date(contact.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>

      {/* All Contact Messages */}
      <h2>All Contact Messages</h2>

      {error && (
        <p className="dashboard-error">{error}</p>
      )}

      {contacts.length === 0 && !error ? (
        <p>No contact messages found.</p>
      ) : (
        <div className="messages-list">

          {contacts.map(contact => (
            <div
              className={`message-card ${
                contact.isRead ? 'read' : 'unread'
              }`}
              key={contact._id}
            >
              <h3>{contact.name}</h3>

              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Message:</strong> {contact.message}</p>
              <p>
                <strong>Status:</strong>{' '}
                {contact.isRead ? 'Read' : 'Unread'}
              </p>

              <small>
                {new Date(contact.createdAt).toLocaleString()}
              </small>

              <div className="message-actions">
                <button
                  onClick={() =>
                    updateStatus(contact._id, !contact.isRead)
                  }
                >
                  Mark as {contact.isRead ? 'Unread' : 'Read'}
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteMessage(contact._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  </div>
);
}

export default AdminDashboard;