import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [userData, setUserData] = useState('');

  useEffect(() => {
    // Read the ACCESS_TOKEN from cookies
    const jwt_token = document.cookie.replace(
      /(?:(?:^|.*;\s*)app_token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    //console.log(jwt_token)

    if (jwt_token) {
      // Verify the token using the same secret key used during token generation
      try {
    axios.post('/api/verify_user', {"token" : jwt_token}, {
        headers: {
          'Content-Type': 'application/json', // Set the appropriate content type for form data
        },
      })
      .then(function (response) {
    if(response.status === 200) {
          const [encodedHeader, encodedPayload] = jwt_token.split('.');
          const payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString('utf-8'));
          setUserData(payload);
    }
    else window.location.href = '/login';
  })
  .catch(function (error) {
    console.log(error);
  });
    //console.log(userData['userId'])
      } catch (error) {
        // Handle token verification errors
        // If the token verification fails, the user is not authenticated
        window.location.href = '/login';
        console.log(error)
      }
    } else {
      // If the ACCESS_TOKEN cookie is not available, the user is not authenticated
      window.location.href = '/login';
    }
  }, []);

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      {userData['userId'] ? <p>Hello, User {userData['userId']}</p> : <p>Loading...</p>}
      {/* Your dashboard content goes here */}
    </div>
  );
}
