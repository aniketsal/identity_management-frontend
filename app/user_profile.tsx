import React, { useState } from 'react';

const ProfilePage = ({  user, onLogout }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Simulate logout process, like clearing local storage, etc.
    setTimeout(() => {
      setIsLoggingOut(false);
      onLogout();
    }, 1000);
  };

  return (
    <div className="profile-container">
      <style>{`
        .profile-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .profile-card {
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
          width: 100%;
          animation: fadeInUp 0.5s ease;
        }

        .logout-button {
          background-color: #ff4c4c;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 10px 20px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .logout-button:hover {
          background-color: #d43f3f;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="profile-card">
        <h2>Welcome, {user.name}!</h2>
        <p>Email: {user.email}</p>
        <p>Age: {user.age}</p>
        {/* Add more user details here */}

        <button className="logout-button" onClick={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
