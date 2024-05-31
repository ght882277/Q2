import React, { useState, useEffect, useRef } from 'react';

const UserData = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const intervalId = useRef(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://secret.url/user/${userId}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    intervalId.current = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <div>
      <h1>User Data Component</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <p>Timer: {seconds} seconds</p>
    </div>
  );
};

export default UserData;