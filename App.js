import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import * as Font from 'expo-font';

const getFonts = () => Font.loadAsync({
  'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
  'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf')
});

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await getFonts();
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View><Text>Loading Fonts...</Text></View>;
  }

  return (
    <AppNavigation />
  );
}

export default App;
