import { View, Text } from 'react-native';
import styles from '../styles/styles';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DailySummary = (props) => {
    const [income,setIncome] = useState(0);
    const [expense,setExpense] = useState(0);

    const getDatas = async () => {
    try {
        const storedDatas = await AsyncStorage.getItem('expenseData');
        const datasArray = JSON.parse(storedDatas) || [];
        const filteredData = datasArray.filter((item) => item.date === props.date)
        const totalIncome = filteredData
        .filter((item) => item.category_type === 'รายรับ')
        .reduce((sum, item) => sum + parseFloat(item.money), 0);
        const totalExpense = filteredData
        .filter((item) => item.category_type === 'รายจ่าย')
        .reduce((sum, item) => sum + parseFloat(item.money), 0);
        setIncome(totalIncome);
        setExpense(totalExpense);
    } catch (e) {
        console.log("Failed to fetch categories", e);
        }
    };

    useEffect(() => {
        getDatas();
    }, [props.date]);

    return (
        <>
            <View style={styles.navigationContainer}>
                <View style={{flex:1}}>
                    <Text style={styles.textTitle}>สรุปวันนี้</Text>
                </View>
            </View>
            <View style={styles.menuBox}>
                <View style={{ flexDirection: 'row'}}>
                  <Text style={styles.textWithButton}>รายรับ</Text>
                  <Text style={styles.greenMenuText}>{income ? income.toFixed(2) : '0.00'}</Text>
                  <Text style={styles.text}>บาท</Text>
                </View>
                <View style={{ flexDirection: 'row'}}>
                  <Text style={styles.textWithButton}>รายจ่าย</Text>
                  <Text style={styles.redMenuText}>{expense ? expense.toFixed(2) : '0.00'}</Text>
                  <Text style={styles.text}>บาท</Text>
                </View>
                <View style={{ flexDirection: 'row'}}>
                  <Text style={styles.textWithButton}>ทั้งหมด</Text>
                  { income - expense >= 0 ? (
                    <Text style={styles.greenMenuText}>{(income - expense).toFixed(2)}</Text>
                  ) : income - expense < 0 ? (
                    <Text style={styles.redMenuText}>{(income - expense).toFixed(2)}</Text>
                  ) : null}
                  <Text style={styles.text}>บาท</Text>
                </View>
            </View>
        </>
    )
}

export default DailySummary;