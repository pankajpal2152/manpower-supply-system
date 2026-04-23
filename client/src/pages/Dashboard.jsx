const Dashboard = () => {
  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Dashboard Overview</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {/* Placeholder Stat Cards */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Total Employees</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0ea5e9' }}>120</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Active Jobs</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>15</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Pending Invoices</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>7</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;