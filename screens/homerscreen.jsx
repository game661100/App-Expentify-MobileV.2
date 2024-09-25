import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import GradientBackground from '../components/background'
import CustomCalendar from '../components/Calendar';

export default function HomeScreen() {
  return (

    <GradientBackground>
      <SafeAreaView>
        <Text style={styles.container}>My Payment</Text>
        <Text style={styles.textTitle}>Schedule</Text>
        <CustomCalendar />
      </SafeAreaView>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'poppins-bold',
    fontSize: 25
  },
  textTitle: {
    color: '#fff',
    fontFamily: 'poppins-regular',
    fontSize: 16,
    textAlign: 'center',
    borderWidth: 2, // Border thickness
    borderColor: '#fff', // Border color
    borderRadius: 10, // Rounded corners
    paddingHorizontal: 12, // Horizontal padding for inner spacing
    paddingVertical: 6, // Vertical padding for inner spacing
    alignSelf: 'center', // Center the "Schedule" text
    marginTop: 10, // Space from the top
  }
});
