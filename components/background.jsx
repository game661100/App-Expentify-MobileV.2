// components/GradientBackground.js
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient
      colors={['#000000','#1F1338','#2A2A2E', '#1F1338', '#000000']} // Example gradient colors
      style={{ flex: 1 }} // Full screen gradient
    >
        {children}
    </LinearGradient>
  );
};

export default GradientBackground;
