import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page reload
        setError(''); // Clear previous errors

        try {
            // Send login request to our backend
            const response = await api.post('/auth/login', { email, password });

            // Save the token and user data to local storage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Redirect to the dashboard
            navigate('/dashboard');
        } catch (err) {
            // If the backend sends an error (like wrong password), display it
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
            <div style={{ border: '1px solid #ccc', padding: '30px', borderRadius: '8px', width: '300px' }}>
                <h2>System Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </div>
                    <button type="submit" style={{ padding: '10px', backgroundColor: '#0056b3', color: 'white', border: 'none', cursor: 'pointer' }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;