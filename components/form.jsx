import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView,Pressable,Alert, } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

const Form = (props) => {
  const [selecetedCategory, setSelecetedCategory] = useState('');
  const [selecetedType, setSelecetedType] = useState('');
  const [menu, setMenu] = useState('');
  const [money, setMoney] = useState('');
  const [detail, setDetail] = useState('');
  const [category, setCategory] = useState([]);

  const addCategoryPage = () => {
    props.onSetPageFunction(3);
  };

  const BackHandler = () => {
    props.BackPage();
    props.setIsEdit(false);
  }

  const getCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem('categories');
      const categoriesArray = JSON.parse(storedCategories) || [];
      setCategory(categoriesArray);
    } catch (e) {
      console.log("Failed to fetch categories", e);
    }
  };

  const confirmAdding = () => {
    saveData();
  };

  const saveData = async () => {
    if (!selecetedCategory.trim() || !menu.trim() || !money.trim()) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;}
    try {
      const existingData = await AsyncStorage.getItem('expenseData');
      const newItem = {
        category: selecetedCategory,
        category_type: selecetedType,
        menu: menu,
        money: money,
        detail: detail,
        date: props.date
      };
      let dataArray = JSON.parse(existingData) || [];
      if (props.isEdit) {
        dataArray[props.editIndex] = newItem;
      } else {
        dataArray.push(newItem);
      }
      await AsyncStorage.setItem('expenseData', JSON.stringify(dataArray));
      BackHandler();
      console.log("Data saved successfully");
    } catch (e) {
      console.log("Failed to save data", e);
    }
  };

  const getDatas = async () => {
    if(!props.isEdit) return;
    try {
      const storedDatas = await AsyncStorage.getItem('expenseData');
      const datasArray = JSON.parse(storedDatas) || [];
      const filteredData = datasArray[props.editIndex];
      if (filteredData) {
        setSelecetedCategory(filteredData.category);
        setSelecetedType(filteredData.category_type);
        setMenu(filteredData.menu);
        setMoney(filteredData.money);
        setDetail(filteredData.detail);
      }
    } catch (e) {
      console.log("Failed to fetch categories", e);
    }
  };

  const removeData = async (indexToRemove) => {
    try {
      const storedDatas = await AsyncStorage.getItem('expenseData');
      const datasArray = JSON.parse(storedDatas) || [];
      const updatedData = datasArray.filter((_, index) => index !== indexToRemove);
      await AsyncStorage.setItem('expenseData', JSON.stringify(updatedData));
      BackHandler();
    } catch (e) {
      console.error("Failed to remove data", e);
    }
  };

  const confirmDelete = (indexToRemove) => {
    Alert.alert(
      "ยืนยันการลบ",
      "คุณต้องการลบรายการนี้หรือไม่?",
      [
        {
          text: "ยกเลิก",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "ลบ",
          onPress: () => removeData(indexToRemove),
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    getCategories();
    getDatas();
  }, []);

  return (
    <>
      <View style={styles.navigationContainer}>
        <Pressable style={styles.navigationButton} onPress={BackHandler}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </Pressable>
        <View style={{ flex: 8 }}>
          {props.isEdit === true ? (
            <Text style={styles.textTitle}>แก้ไขรายการ</Text>
          ) : <Text style={styles.textTitle}>เพิ่มรายการ</Text>}
        </View >
        <Pressable style={styles.navigationButton} onPress={confirmAdding}>
          <Ionicons name="checkmark" size={32} color="white" />
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.textBox}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.textWithButton}>หมวดหมู่</Text>
          </View>
          <Dropdown style={{ marginTop: 5, backgroundColor: '#656466', borderRadius: 10 }}
            placeholderStyle={{ paddingVertical: 8, fontSize: 16, color: '#fff', textAlign: 'right', textAlignVertical: 'center' }}
            selectedTextStyle={{ paddingVertical: 8, fontSize: 16, color: '#fff', textAlign: 'right', textAlignVertical: 'center' }}
            containerStyle={{ backgroundColor: '#656466', borderRadius: 10 }}
            itemContainerStyle={{ backgroundColor: '#656466', borderRadius: 10 }}
            itemTextStyle={{ textAlign: 'right', paddingHorizontal: 4 }}
            placeholder='เลือกหมวดหมู่'
            data={category}
            value={selecetedCategory}
            labelField="name"
            valueField="name"
            onChange={item => { setSelecetedCategory(item.name); setSelecetedType(item.type) }} />
          <Pressable style={{backgroundColor: '#6e47b2',alignSelf:'flex-end',padding:10,borderRadius:50,marginTop:5,}} onPress={addCategoryPage}>
            <Ionicons name="add" size={18} color="white" />
          </Pressable>
        </View>

        <View style={styles.textBox}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.textWithButton}>ชื่อรายการ</Text>
          </View>
          <TextInput style={styles.inputLeft}
            value={menu}
            onChangeText={text => setMenu(text)} />
        </View>
        <View style={styles.textBox}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.textWithButton}>จำนวนเงิน</Text>
          </View>
          <TextInput style={styles.inputRight}
            value={money}
            onChangeText={text => setMoney(text)} />
        </View>
        <View style={styles.textBox}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.textWithButton}>รายละเอียด</Text>
          </View>
          <TextInput style={styles.inputLeft} multiline
            value={detail}
            onChangeText={text => setDetail(text)} />
        </View>
      </ScrollView>
      {props.isEdit === true ? (
            <View style={styles.container}>
              <Pressable style={styles.binButton} onPress={() => confirmDelete(props.editIndex)}>
                  <Ionicons name="trash-bin" size={32} color="white" />
              </Pressable>
            </View>
          ) : null}
    </>
  );
};

export default Form;
