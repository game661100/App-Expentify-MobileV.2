import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import GradientBackground from '../components/background'
import CustomCalendar from '../components/Calendar';
import ExpentifyNote from '../components/expentifynote';
import Form from '../components/form';
import Category from '../components/category';
import styles from '../styles/styles';

export default function HomeScreen() {

  const [page, setPage] = useState(0);
  const [date, setDate] = useState();
  const [editIndex, setEditIndex] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const BackPage = () => {
    setPage(page - 1);
  }

  const RenderPage = () => {
    if (page == 0)
      return (
        <>
          <View style={styles.navigationContainer}>
            <View style={{ flex: 8 }}>
              <Text style={styles.textTitle}>Schedule</Text>
            </View>
          </View>
          <CustomCalendar onSetPageFunction={setPage} onSetDateFunction={setDate} />
        </>
      );
    else if (page == 1)
      return (
        <ExpentifyNote date={date} onSetPageFunction={setPage} BackPage={BackPage} setEditIndex={setEditIndex} setIsEdit={setIsEdit}/>
    );
    else if (page == 2)
      return (
        <Form date={date} onSetPageFunction={setPage} BackPage={BackPage} isEdit={isEdit} setIsEdit={setIsEdit} editIndex={editIndex}/>
    );
    else if (page == 3)
      return (
        <Category onSetPageFunction={setPage} BackPage={BackPage} />
    );
    else return null;
  }

  const HomePageHandler = () => {
    setIsEdit(false);
    setPage(0);
  }

  return (

    <GradientBackground>
      <View style={styles.mainContainer}>
        <Text style={styles.titleContainer} onPress={HomePageHandler}>My Payment</Text>
        {RenderPage()}
      </View>
    </GradientBackground>
  )
}