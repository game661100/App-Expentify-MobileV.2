import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpentifyNote = (props) => {
    const [expandedIndex, setExpandedIndex] = useState(null);
    
    const AddHandler = () => {
        props.onSetPageFunction(2);
    };
    
    const EditHandler = (indexToEdit) => {
        props.onSetPageFunction(2);
        props.setIsEdit(true);
        props.setEditIndex(indexToEdit);
    };

    const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

    const [data, setData] = useState([]);

    const getDatas = async () => {
      try {
        const storedDatas = await AsyncStorage.getItem('expenseData');
        const datasArray = JSON.parse(storedDatas) || [];
        const datasArrayIndex = datasArray.map((item, index) => ({ 
          ...item, 
          index: index,
        }));
        const filteredData = datasArrayIndex.filter((item) => item.date === props.date)
        setData(filteredData);
      } catch (e) {
        console.log("Failed to fetch categories", e);
      }
    };

    useEffect(() => {
      getDatas();
    }, []);

    const toggleExpand = (index) => {
      setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
      <>
      <View style={styles.navigationContainer}>
          <Pressable style={styles.navigationButton} onPress={props.BackPage}>
              <Ionicons name="arrow-back" size={32} color="white" />
          </Pressable>
          <View style={{ flex: 8 }}>
              <Text style={styles.textTitle}>{Number(props.date.split("-")[2])} {monthNames[Number(props.date.split("-")[1]) - 1]} {((Number(props.date.split("-")[0])) + 543)}</Text>
          </View>
          <View style={{ flex: 1 }}></View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
          {data.map((item, index) => (
            <Pressable key={index} onPress={() => toggleExpand(index)}>
              <View style={styles.menuBox}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.textWithButton}>{item.menu}</Text>
                  {item.category_type === 'รายรับ' ? (
                    <Text style={styles.greenMenuText}>{item.money}</Text>
                  ) : item.category_type === 'รายจ่าย' ? (
                    <Text style={styles.redMenuText}>{item.money}</Text>
                  ) : null}
                  <Text style={styles.text}>บาท</Text>
                </View>
                {expandedIndex === index && (
                  <>
                      <Text style={styles.menuText}>หมวดหมู่: {item.category}</Text>
                    {item.detail.trim() && (
                      <Text style={styles.menuText}>รายละเอียด: {item.detail}</Text>
                    )}
                      <View>
                        <Pressable style={{backgroundColor: '#6e47b2',alignSelf:'flex-end',padding:10,borderRadius:50}} onPress={() => EditHandler(item.index)}>
                          <Ionicons name="pencil" size={18} color="white" />
                        </Pressable>
                      </View>
                  </>
                )}
              </View>
            </Pressable>
          ))}
      </ScrollView>
      <View style={styles.container}>
          <Pressable style={styles.addButton} onPress={AddHandler}>
              <Ionicons name="add" size={32} color="white" />
          </Pressable>
      </View>
      </>
    )
};

export default ExpentifyNote;
