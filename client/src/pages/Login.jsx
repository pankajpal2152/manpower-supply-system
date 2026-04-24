import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Using our configured Axios instance

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f9', fontFamily: '"Public Sans", sans-serif', position: 'relative', overflow: 'hidden', padding: '20px' },
    card: { backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 6px 0 rgba(67, 89, 113, 0.12)', padding: '40px', width: '100%', maxWidth: '400px', zIndex: 1 },
    logoContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px', gap: '8px' },
    logoImage: { maxHeight: '60px', objectFit: 'contain' }, // Slightly adjusted for standard logos
    welcomeText: { fontSize: '1.25rem', fontWeight: '500', color: '#566a7f', marginBottom: '8px', marginTop: 0 },
    subText: { fontSize: '0.9375rem', color: '#697a8d', marginBottom: '24px', lineHeight: '1.5' },
    formGroup: { marginBottom: '16px' },
    labelContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
    label: { fontSize: '0.75rem', fontWeight: '600', color: '#566a7f', textTransform: 'uppercase', letterSpacing: '0.25px' },
    linkText: { fontSize: '0.8125rem', color: '#696cff', textDecoration: 'none', cursor: 'pointer' },
    input: { width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #d9dee3', fontSize: '0.9375rem', color: '#697a8d', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border-color 0.2s', backgroundColor: '#fff' },
    passwordContainer: { position: 'relative', display: 'flex', alignItems: 'center' },
    eyeIcon: { position: 'absolute', right: '14px', cursor: 'pointer', color: '#a1acb8', backgroundColor: 'transparent', border: 'none', padding: 0, display: 'flex', fontSize: '0.8rem', fontWeight: 'bold' },
    checkboxContainer: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' },
    checkbox: { width: '16px', height: '16px', cursor: 'pointer' },
    checkboxLabel: { fontSize: '0.9375rem', color: '#697a8d', cursor: 'pointer' },
    submitBtn: { width: '100%', backgroundColor: '#696cff', color: '#fff', border: 'none', borderRadius: '6px', padding: '10px 20px', fontSize: '0.9375rem', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s', marginBottom: '16px' },
    footerText: { textAlign: 'center', fontSize: '0.9375rem', color: '#697a8d', margin: 0 },
    footerLink: { color: '#696cff', textDecoration: 'none', cursor: 'pointer', fontWeight: '600' },
    errorText: { color: '#dc3545', fontSize: '0.875rem', marginBottom: '15px', textAlign: 'center', backgroundColor: '#f8d7da', padding: '8px', borderRadius: '4px' },
    successText: { color: '#198754', fontSize: '0.875rem', marginBottom: '15px', textAlign: 'center', backgroundColor: '#d1e7dd', padding: '8px', borderRadius: '4px' }
};

// Standard roles mapped from our architecture diagram
const availableRoles = ['Superadmin', 'HR Admin', 'Employee', 'Client'];

// ==========================================
// LOGIN FORM COMPONENT
// ==========================================
const LoginForm = ({ onToggleView }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [credentials, setCredentials] = useState({ role: '', email: '', password: '' });

    const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!credentials.email || !credentials.password) {
            setError('Please fill in all required fields.');
            return;
        }

        try {
            // Talk to our backend API!
            const response = await api.post('/auth/login', { 
                email: credentials.email, 
                password: credentials.password 
            });

            // Save the JWT token and User data securely
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            // Redirect to our secure layout
            navigate('/dashboard');
        } catch (err) {
            console.error("Login failed:", err);
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
        }
    };

    return (
        <div style={styles.card}>
            <div style={styles.logoContainer}>
                {/* Fallback to text if logo.png is missing */}
                <h2 style={{ color: '#696cff', fontWeight: 'bold', margin: 0 }}>ManpowerApp</h2>
            </div>
            <h3 style={styles.welcomeText}>Welcome! 👋</h3>
            <p style={styles.subText}>Please sign in to your account to continue.</p>

            {error && <div style={styles.errorText}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <div style={styles.labelContainer}>
                        <label htmlFor="role" style={styles.label}>Select Role (Optional)</label>
                    </div>
                    <select
                        id="role"
                        name="role"
                        style={{ ...styles.input, cursor: 'pointer' }}
                        value={credentials.role}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select your role...</option>
                        {availableRoles.map((r, i) => (
                            <option key={i} value={r}>{r}</option>
                        ))}
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <div style={styles.labelContainer}>
                        <label htmlFor="email" style={styles.label}>Email Address</label>
                    </div>
                    <input type="email" id="email" name="email" placeholder="admin@manpower.com" style={styles.input} value={credentials.email} onChange={handleChange} autoFocus required />
                </div>

                <div style={styles.formGroup}>
                    <div style={styles.labelContainer}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                    </div>
                    <div style={styles.passwordContainer}>
                        <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="············" style={styles.input} value={credentials.password} onChange={handleChange} required />
                        <button type="button" style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "HIDE" : "SHOW"}
                        </button>
                    </div>
                </div>

                <button type="submit" style={styles.submitBtn}>Sign in</button>
            </form>

            <p style={styles.footerText}>
                New on our platform? <span onClick={onToggleView} style={styles.footerLink}>Create an account</span>
            </p>
        </div>
    );
};

// ==========================================
// SIGNUP FORM COMPONENT
// ==========================================
const SignupForm = ({ onToggleView }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    // Splitting username into firstName and lastName to match our DB!
    const [credentials, setCredentials] = useState({
        role: '', firstName: '', lastName: '', email: '', password: ''
    });

    const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!credentials.firstName || !credentials.lastName || !credentials.email || !credentials.password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            await api.post('/auth/register', {
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                email: credentials.email,
                password: credentials.password
            });

            setSuccess('Account created successfully! You can now log in.');
            setTimeout(() => {
                onToggleView(); // Switch back to login after 2 seconds
            }, 2000);
            
        } catch (err) {
            console.error("Signup failed:", err);
            setError(err.response?.data?.message || 'Error creating account.');
        }
    };

    return (
        <div style={styles.card}>
            <div style={styles.logoContainer}>
                <h2 style={{ color: '#696cff', fontWeight: 'bold', margin: 0 }}>ManpowerApp</h2>
            </div>

            <h3 style={styles.welcomeText}>Create Account 🚀</h3>
            <p style={styles.subText}>Make your management easy and efficient.</p>

            {error && <div style={styles.errorText}>{error}</div>}
            {success && <div style={styles.successText}>{success}</div>}

            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label htmlFor="role" style={styles.label}>Select Role</label>
                    <select
                        id="role"
                        name="role"
                        style={{ ...styles.input, marginTop: '8px', cursor: 'pointer' }}
                        value={credentials.role}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select your role...</option>
                        {availableRoles.map((r, i) => (
                            <option key={i} value={r}>{r}</option>
                        ))}
                    </select>
                </div>

                {/* Using a split layout for First/Last name to match DB */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ ...styles.formGroup, flex: 1 }}>
                        <label htmlFor="firstName" style={styles.label}>First Name</label>
                        <input type="text" id="firstName" name="firstName" placeholder="John" style={{ ...styles.input, marginTop: '8px' }} value={credentials.firstName} onChange={handleChange} required />
                    </div>
                    <div style={{ ...styles.formGroup, flex: 1 }}>
                        <label htmlFor="lastName" style={styles.label}>Last Name</label>
                        <input type="text" id="lastName" name="lastName" placeholder="Doe" style={{ ...styles.input, marginTop: '8px' }} value={credentials.lastName} onChange={handleChange} required />
                    </div>
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" style={{ ...styles.input, marginTop: '8px' }} value={credentials.email} onChange={handleChange} required />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="password" style={styles.label}>Password</label>
                    <div style={{ ...styles.passwordContainer, marginTop: '8px' }}>
                        <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="············" style={styles.input} value={credentials.password} onChange={handleChange} required />
                        <button type="button" style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "HIDE" : "SHOW"}
                        </button>
                    </div>
                </div>

                <div style={styles.checkboxContainer}>
                    <input type="checkbox" id="terms" style={styles.checkbox} required />
                    <label htmlFor="terms" style={styles.checkboxLabel}>
                        I agree to <span style={styles.linkText}>privacy policy & terms</span>
                    </label>
                </div>

                <button type="submit" style={styles.submitBtn}>Sign up</button>
            </form>

            <p style={styles.footerText}>
                Already have an account? <span onClick={onToggleView} style={styles.footerLink}>Sign in instead</span>
            </p>
        </div>
    );
};

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
const Login = () => {
    const [isLoginView, setIsLoginView] = useState(true);

    return (
        <div style={styles.container}>
            {isLoginView ? (
                <LoginForm onToggleView={() => setIsLoginView(false)} />
            ) : (
                <SignupForm onToggleView={() => setIsLoginView(true)} />
            )}
        </div>
    );
};

export default Login;