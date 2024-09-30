import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

const Category = (props) => {
  const categoryType = [
    { type: 'รายรับ'},
    { type: 'รายจ่าย'},
  ];
  const [newCategory, setNewCategory] = useState('');
  const [selecetedCategoryType, setSelecetedCategoryType] = useState('');

  const addCategory = async () => {
    if (!newCategory.trim() || !selecetedCategoryType.trim()) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
    }
    try {
      const existingCategories = await AsyncStorage.getItem('categories');
      let categoriesArray = JSON.parse(existingCategories) || [];
      categoriesArray.push({ name: newCategory, type: selecetedCategoryType });
      await AsyncStorage.setItem('categories', JSON.stringify(categoriesArray));
      props.BackPage();
      console.log("Category added successfully");
    } catch (e) {
      console.log("Failed to add category", e);
    }
  };

  return (
    <>
      <View style={styles.navigationContainer}>
        <Pressable style={styles.navigationButton} onPress={props.BackPage}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </Pressable>
        <View style={{ flex: 8 }}>
          <Text style={styles.textTitle}>เพิ่มหมวดหมู่</Text>
        </View>
        <Pressable style={styles.navigationButton} onPress={addCategory}>
          <Ionicons name="checkmark" size={32} color="white" />
        </Pressable>
      </View>
        <View style={styles.textBox}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.text}>ชื่อหมวดหมู่</Text>
          </View>
          <TextInput style={styles.inputLeft}
            value={newCategory}
            onChangeText={text => setNewCategory(text)} />
        </View>
        <View style={styles.textBox}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.text}>ประเภท</Text>
          </View>
          <Dropdown style={{ marginTop: 5, backgroundColor: '#656466', borderRadius: 10 }}
            placeholderStyle={{ paddingVertical: 8, fontSize: 16, color: '#fff', textAlign: 'right', textAlignVertical: 'center' }}
            selectedTextStyle={{ paddingVertical: 8, fontSize: 16, color: '#fff', textAlign: 'right', textAlignVertical: 'center' }}
            containerStyle={{ backgroundColor: '#656466', borderRadius: 10 }}
            itemContainerStyle={{ backgroundColor: '#656466', borderRadius: 10 }}
            itemTextStyle={{ textAlign: 'right', paddingHorizontal: 4 }}
            placeholder='เลือกหมวดหมู่'
            data={categoryType}
            value={selecetedCategoryType}
            labelField="type"
            valueField="type"
            onChange={item => { setSelecetedCategoryType(item.type); }} />
        </View>
    </>
  );
};

export default Category;
