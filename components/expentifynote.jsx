import React, { useEffect, useState } from 'react';
import { Text,View, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const ExpentifyNote = (props) => {
    const isFocused = useIsFocused();
    const AddHandler = () =>
    {
        props.onSetPageFunction(2);
    }

    const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]

    const [data, setData] = useState([]);

    const getDatas = async () => {
        try {
          const storedDatas = await AsyncStorage.getItem('expenseData');
          const datasArray = JSON.parse(storedDatas) || [];
          const filteredData = datasArray.filter((item) => {
            return (
              item.date === props.date
            );
          });
          setData(filteredData);
        } catch (e) {
          console.log("Failed to fetch categories", e);
        }
      };

      useEffect(() => {
        if (isFocused) {
            getDatas();
          }
          
        },[isFocused])

    return (
        <>
        <View style={styles.navigationContainer}>
            <TouchableOpacity style={styles.navigationButton} onPress={props.BackPage}>
                <Ionicons name="arrow-back" size={32} color="white" />
            </TouchableOpacity>
            <View style={{flex:8}}>
                <Text style={styles.textTitle}>{Number(props.date.split("-")[2])+" "+ monthNames[Number(props.date.split("-")[1]-1)]+" "+((Number(props.date.split("-")[0]))+543)}</Text>
            </View>
            <View style={{flex:1}}></View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((item, index) => (
                <View key={index} style={styles.menuBox}>
                <Text style={styles.menuText}>{item.category}: {item.menu}</Text>
                {(() => {
                if (item.category_type == 'รายรับ'){
                  return (
                    <Text style={styles.greenMenuText}>{item.money}</Text>
                  )
                }
                else if (item.category_type == 'รายจ่าย'){
                    return (
                        <Text style={styles.redMenuText}>{item.money}</Text>
                    )
                  }
                return null;
                })()}
                {(() => {
                if (item.detail.trim()){
                  return (
                    <Text style={styles.menuText}>รายละเอียด: {item.detail}</Text>
                  )
                }
                return null;
                })()}
                </View>
            ))}
        </ScrollView>
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={AddHandler}>
                <Ionicons name="add" size={32} color="white" />
            </TouchableOpacity>
        </View>
        </>
    );
};

export default ExpentifyNote;