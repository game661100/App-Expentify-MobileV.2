import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView,Pressable,Alert, } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

const Form = (props) => {
  const [selecetedCategory, setSelecetedCategory] = useState('');
  const [categoryIndex, setCategoryIndex] = useState('');
  const [menu, setMenu] = useState('');
  const [money, setMoney] = useState('');
  const [detail, setDetail] = useState('');
  const [category, setCategory] = useState([]);
  const [selecetedCategoryType, setSelecetedCategoryType] = useState('');

  const categoryType = [
    { type: 'รายรับ'},
    { type: 'รายจ่าย'},
  ];

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
      const datasArrayIndex = categoriesArray.map((item, index) => ({ 
        ...item, 
        index: index,
      }));
      const filteredData = datasArrayIndex.filter((item) => item.type === selecetedCategoryType)
      setCategory(filteredData);
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
    if(money<=0){
      alert('กรุณากรอกข้อมูลจำนวนเงินเป็นจำนวนเต็มบวก');
      return;
    }
    try {
      const existingData = await AsyncStorage.getItem('expenseData');
      const newItem = {
        category: selecetedCategory,
        category_type: selecetedCategoryType,
        menu: menu,
        money: parseFloat(money).toFixed(2),
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
        setSelecetedCategoryType(filteredData.category_type);
        getCategories();
        setSelecetedCategory(filteredData.category);
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

  const removeCategory = async () => {
    try {
      const storedDatas = await AsyncStorage.getItem('categories');
      const datasArray = JSON.parse(storedDatas) || [];
      const updatedData = datasArray.filter((_, index) => index !== categoryIndex);
      await AsyncStorage.setItem('categories', JSON.stringify(updatedData));
      setSelecetedCategory('');
      getCategories();
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

  const confirmDeleteCategory = () => {
    Alert.alert(
      "ยืนยันการลบ",
      "คุณต้องการลบหมวดหมู่นี้หรือไม่?",
      [
        {
          text: "ยกเลิก",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "ลบ",
          onPress: () => removeCategory(),
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    getCategories();
  }, [selecetedCategoryType]);

  useEffect(() => {
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
            <Text style={styles.textWithButton}>ประเภท</Text>
          </View>
          <Dropdown style={{paddingVertical:2, marginTop: 5, backgroundColor: '#656466', borderRadius: 10 }}
            placeholderStyle={{ padding: 8, fontSize: 16, color: '#fff', textAlign: 'left', textAlignVertical: 'center' }}
            selectedTextStyle={{ padding: 8, fontSize: 16, color: '#fff', textAlign: 'left', textAlignVertical: 'center' }}
            containerStyle={{ backgroundColor: '#656466', borderRadius: 10 }}
            itemContainerStyle={{ backgroundColor: '#656466', borderRadius: 10 }}
            itemTextStyle={{ textAlign: 'left', paddingHorizontal: 4 }}
            placeholder='เลือกหมวดหมู่'
            data={categoryType}
            value={selecetedCategoryType}
            labelField="type"
            valueField="type"
            iconColor='white'
            onChange={item => { setSelecetedCategoryType(item.type); setSelecetedCategory('');}} />
          </View>
        <View style={styles.textBox}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.textWithButton}>หมวดหมู่</Text>
          </View>
          <Dropdown style={{paddingVertical:2, marginTop: 5, backgroundColor: '#656466', borderRadius: 10 }}
            placeholderStyle={{ padding: 8, fontSize: 16, color: '#fff', textAlign: 'left', textAlignVertical: 'center' }}
            selectedTextStyle={{ padding: 8, fontSize: 16, color: '#fff', textAlign: 'left', textAlignVertical: 'center' }}
            containerStyle={{ backgroundColor: '#656466', borderRadius: 10 }}
            itemContainerStyle={{ backgroundColor: '#656466', borderRadius: 10 }}
            itemTextStyle={{ textAlign: 'left', paddingHorizontal: 4 }}
            placeholder='เลือกหมวดหมู่'
            data={category}
            value={selecetedCategory}
            labelField="name"
            valueField="name"
            iconColor='white'
            onChange={item => { setSelecetedCategory(item.name); setCategoryIndex(item.index); }} />
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={{flex:1}}>
                {selecetedCategory !== '' ? (
                    <Pressable style={{backgroundColor: '#B20000',alignSelf:'flex-start',padding:10,borderRadius:50,marginTop:5,}} onPress={confirmDeleteCategory}>
                    <Ionicons name="trash-bin" size={18} color="white" />
                    </Pressable>
                  ): null}
              </View>
              <View style={{flex:1}}>
                <Pressable style={{backgroundColor: '#6e47b2',alignSelf:'flex-end',padding:10,borderRadius:50,marginTop:5,}} onPress={addCategoryPage}>
                <Ionicons name="add" size={18} color="white" />
                </Pressable>
              </View>
            </View>
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
          <TextInput style={styles.inputLeft}
            value={money}
            keyboardType={"numeric"}
            onChangeText={text => setMoney(text)} />
        </View>
        <View style={styles.textBox}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.textWithButton}>รายละเอียด(ตัวเลือก)</Text>
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
