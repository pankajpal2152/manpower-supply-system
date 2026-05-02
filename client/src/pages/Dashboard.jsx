import { useState, useEffect } from "react";
// Go up one level (..) to 'src', then into 'api', then import 'axios.js'
import api from "../api/axios"; 

const Dashboard = () => {
   // ... rest of your code
  // 1. Set up state to hold our data, loading status, and any potential errors
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeJobs: 0,
    pendingInvoices: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Fetch the data when the component first loads
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        // Replace '/dashboard/stats' with your actual backend endpoint
        const response = await api.get('/dashboard/stats'); 
        setStats(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
        setError("Could not load dashboard statistics at this time.");
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []); // The empty array ensures this only runs once when the page loads

  // 3. Handle the loading state visually
  if (isLoading) {
    return <div style={{ padding: '20px' }}>Loading your dashboard...</div>;
  }

  // 4. Handle potential errors visually
  if (error) {
    return <div style={{ padding: '20px', color: '#ef4444' }}>{error}</div>;
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Dashboard Overview</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        
        {/* Dynamic Stat Cards */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Total Employees</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0ea5e9' }}>
            {stats.totalEmployees}
          </p>
        </div>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Active Jobs</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
            {stats.activeJobs}
          </p>
        </div>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Pending Invoices</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>
            {stats.pendingInvoices}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;