import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
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
      const newItem = {
        category: selecetedCategory,
        category_type: selecetedType,
        menu: menu,
        money: money,
        detail: detail,
        date: props.date
      };
      const existingData = await AsyncStorage.getItem('expenseData');
      let dataArray = JSON.parse(existingData) || [];
      dataArray.push(newItem);
      await AsyncStorage.setItem('expenseData', JSON.stringify(dataArray));
      props.BackPage();
      console.log("Data saved successfully");
    } catch (e) {
      console.log("Failed to save data", e);
    }
  };

  const getDatas = async () => {
    try {
      const storedDatas = await AsyncStorage.getItem('expenseData');
      const datasArray = JSON.parse(storedDatas) || [];
    } catch (e) {
      console.log("Failed to fetch categories", e);
    }
  };

  useEffect(() => {
    getCategories();
    getDatas();
  }, []);

  return (
    <>
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navigationButton} onPress={props.BackPage}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 8 }}>
          <Text style={styles.textTitle}>เพิ่มรายการ</Text>
        </View>
        <TouchableOpacity style={styles.navigationButton} onPress={confirmAdding}>
          <Ionicons name="checkmark" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.textBox}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.text}>หมวดหมู่</Text>
            <TouchableOpacity style={{backgroundColor: '#6e47b2',borderRadius: 50,padding: 15}} onPress={addCategoryPage}>
              <Text style={{}}>เพิ่ม</Text>
            </TouchableOpacity>
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
        </View>

        <View style={styles.textBox}>
          <Text style={styles.text}>ชื่อรายการ</Text>
          <TextInput style={styles.inputLeft}
            value={menu}
            onChangeText={text => setMenu(text)} />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>จำนวนเงิน</Text>
          <TextInput style={styles.inputRight}
            value={money}
            onChangeText={text => setMoney(text)} />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>รายละเอียด</Text>
          <TextInput style={styles.inputLeft} multiline
            value={detail}
            onChangeText={text => setDetail(text)} />
        </View>
      </ScrollView>
    </>
  );
};

export default Form;
