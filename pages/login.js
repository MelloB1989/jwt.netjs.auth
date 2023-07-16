import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Read the ACCESS_TOKEN from cookies
    const jwt_token = document.cookie.replace(
      /(?:(?:^|.*;\s*)app_token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    if (jwt_token) {
      window.location.href = '/dashboard';
    }
    
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Create form data with the username and password
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      // Make a POST request to your API route in the pages/api directory
      const response = await axios.post('/api/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
        },
      });

      if (response.status === 200 && response.data.success) {
        // Redirect to the dashboard page upon successful authentication
        router.push('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('An error occurred during login');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
