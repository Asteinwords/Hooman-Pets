import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const GoogleAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const userData = searchParams.get('user');

    if (token && userData) {
      try {
        const user = JSON.parse(decodeURIComponent(userData));
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/profile/pet-experience');
      } catch (error) {
        console.error('Error parsing Google auth response:', error);
        navigate('/login?error=auth_failed');
      }
    } else {
      navigate('/login?error=auth_failed');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#E95744] mx-auto"></div>
        <p className="mt-4">Processing Google authentication...</p>
      </div>
    </div>
  );
};

export default GoogleAuthCallback;