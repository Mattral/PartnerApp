'use client';

import { DialogActions } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/navigation'; // Import next/navigation for redirects

// Keyframes for twinkling and falling stars
const twinkle = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

const fall = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(100vh); }
`;

// Styled overlay for the modal background
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0.8));
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 1000;
`;

// Styled modal container
const Modal = styled.div`
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
  border-radius: 20px;
  border: 2px solid rgba(255, 215, 0, 0.6);
  box-shadow: 0 12px 50px rgba(255, 215, 0, 0.3);
  padding: 40px;
  max-width: 600px;
  width: 90%;
  z-index: 1001;
  text-align: center;
`;

// Title with shimmering gradient
const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  background: linear-gradient(90deg, #ffdd6b, #ffcf00, #ffe899);
  -webkit-background-clip: text;
  color: transparent;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

// Close button styling
const CloseButton = styled.button`
  background-color: #ffd700;
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 12px 30px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  font-weight: bold;
  font-size: 18px;
  margin-top: 30px; /* Add margin to space it from the text */

  &:hover {
    background-color: #ffcf33;
    transform: scale(1.05);
    box-shadow: 0 8px 30px rgba(255, 215, 0, 0.7);
  }
`;

// Particle component for stars
const Star = styled.div`
  position: absolute;
  background-color: rgba(255, 215, 0, 0.6);
  border-radius: 50%;
  opacity: 0.8;
  pointer-events: none;
  animation: ${twinkle} infinite alternate, ${fall} linear infinite;
`;

// Particle generator
const generateStars = (numStars) => {
  return Array.from({ length: numStars }).map((_, i) => {
    const size = Math.random() * 4 + 2; // Size between 2 and 6
    const x = Math.random() * 100; // Random horizontal position
    const animationDuration = Math.random() * 3 + 2; // Random falling duration

    return (
      <Star
        key={i}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${x}vw`,
          top: `${Math.random() * -10}vh`, // Start above the view
          animationDuration: `${animationDuration}s`,
          animationDelay: `${Math.random() * 5}s`, // Stagger the stars
        }}
      />
    );
  });
};

const Welcome: React.FC = () => {
  const [data, setData] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const storedData = localStorage.getItem('authData');

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const welcomeData = {
          msg: parsedData.data.primaryData.msg,
          userName: `${parsedData.data.secondaryData.userInfos.person._person.pers_fName} ${parsedData.data.secondaryData.userInfos.person._person.pers_lName}`,
          email: parsedData.data.secondaryData.userInfos.person._person.email,
          authorization: parsedData.data.primaryData.authorization,
          companyName: parsedData.data.secondaryData.userInfos.person.companyInfos._company.mc_name,
          accountType: parsedData.data.secondaryData.userInfos.person.persType,
        };

        setData(welcomeData);
        setIsOpen(true);
      } catch (error) {
        console.error("Failed to parse stored data:", error);
        setIsOpen(true);
      }
    }
  }, []);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRedirect = (path: string) => {
    router.push(path); // Use the router to redirect the user
  };

  const stars = generateStars(100); // Generate 100 stars for the shower

  return (
    <Overlay className="flex justify-center items-center">
      <Modal className="bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-300 p-6 max-w-lg w-full rounded-lg shadow-lg">
        <TitleBox className="text-2xl font-bold text-yellow-600 mb-4">
          Welcome, New User
        </TitleBox>
  
        <p className="text-xl font-semibold text-yellow-700 mb-4">
          <strong>Company Name:</strong> Example
        </p>
        <p className="text-xl font-semibold text-yellow-700 mb-6">
          <strong>Account Type:</strong> Normal User
        </p>
  
        <div className="text-lg mb-6">
          <h3 className="font-bold text-yellow-600 mb-2"> Please click on the Checklist:</h3>
          <ul className="space-y-4">
            {/* List items with better spacing and larger font size */}
            <li 
              onClick={() => handleRedirect("/apps/profiles/account/personal")} 
              className="cursor-pointer text-yellow-500 font-semibold hover:text-yellow-600 hover:scale-105 transition-all duration-300">
              Complete your profile
            </li>
            <li 
              onClick={() => handleRedirect("/apps/Dossier")} 
              className="cursor-pointer text-yellow-500 font-semibold hover:text-yellow-600 hover:scale-105 transition-all duration-300">
              Verify as Normal User
            </li>
            <li 
              onClick={() => handleRedirect("/apps/Dossier")} 
              className="cursor-pointer text-yellow-500 font-semibold hover:text-yellow-600 hover:scale-105 transition-all duration-300">
              Verify as Advisor
            </li>
          </ul>
        </div>
  
        <DialogActions sx={{ justifyContent: 'center', paddingBottom: 3 }}>
          <CloseButton onClick={handleClose} className="px-8 py-3 text-lg">
            Close
          </CloseButton>
        </DialogActions>
      </Modal>
      {stars}
    </Overlay>
  );  
  
};

export default Welcome;
