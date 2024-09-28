import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar,loca } from 'react-native-calendars';
import { styled } from 'nativewind';

const StyledCalendar = styled(Calendar);

const CustomCalendar = (props) => {

  const PageHandler = () =>
  {
    props.onSetPageFunction(1);
  }

  const DateHandler = (date) =>
  {
    props.onSetDateFunction(date);
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];

  // Set default selected date to today
  const [selectedDate, setSelectedDate] = useState(formattedToday);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString); // Update selected date
    if(day.dateString == selectedDate)
    {
      PageHandler();
      DateHandler(Number(selectedDate.split("-")[2])+"-"+ Number(selectedDate.split("-")[1])+"-"+Number(selectedDate.split("-")[0]));
    }
  };

  // Function to get the marked dates for Sundays
  const getMarkedDates = () => {
    const marked = {};
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    // Loop through the days of the current month
    for (let day = 1; day <= 31; day++) {
      const date = new Date(currentYear, currentMonth, day);
      if (date.getMonth() === currentMonth) {
        const dateString = date.toISOString().split('T')[0];
        const isSunday = date.getDay() === 1; // 0 is Sunday
        marked[dateString] = {
          customStyles: {
            text: {
              color: isSunday ? 'red' : '#ffffff', // Set Sunday text color to red
            },
          },
        };
      }
    }

    // Include the selected date
    marked[selectedDate] = {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: '#7E64FF',
          borderRadius: 50,
        },
        text: {
          color: '#060011',
        },
      },
    };

    return marked;
  };

  return (
    <View>
      <StyledCalendar
        onDayPress={onDayPress}
        markingType={'custom'}
        enableSwipeMonths={true} // Enable swipe gesture for changing months
        hideArrows={true} // Hide arrows to remove them completely
        theme={{
          calendarBackground: 'transparent',
          textSectionTitleColor: '#ffffff',
          todayTextColor: '#ffffff',
          dayTextColor: '#ffffff',
          textDisabledColor: '#7E7E7E',
          dotColor: '#ffffff',
          selectedDotColor: '#ffffff',
          monthTextColor: '#ffffff',
          indicatorColor: '#ffffff',
          // Change font family here
          textDayFontFamily: 'poppins-bold', // Change this to your custom font
          textMonthFontFamily: 'poppins-bold', // Change this to your custom font
          textDayHeaderFontFamily: 'poppins-bold', // Change this to your custom font
        }}
        markedDates={getMarkedDates()} // Use the marked dates function
      />
    </View>
  );
};

export default CustomCalendar;
