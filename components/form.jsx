import React,{useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles';

const Form = (props) => {
  const [selecetedCatagory,setSelecetedCatagory] = useState();
  const [menu,setMenu] = useState();
  const [money,setMoney] = useState();
  const [detail,setDetail] = useState();
  const catagory = [
    { label: 'อาหาร', value: 'food' },
    { label: 'เครื่องดื่ม', value: 'drink' },
  ];
  return (
    <>
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navigationButton} onPress={props.BackPage}>
            <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <View style={{flex:8}}>
            <Text style={styles.textTitle}>เพิ่มรายการ</Text>
        </View>
        <TouchableOpacity style={styles.navigationButton}>
            <Ionicons name="checkmark" size={32} color="white" />   
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.textBox}>
          <Text style={styles.text}>หมวดหมู่</Text>
          <Dropdown style={{marginTop:5,backgroundColor:'#656466',borderRadius:10}}
            placeholderStyle={{paddingVertical:8,fontSize:16,color:'#fff',textAlign:'right',textAlignVertical:'center'}}
            selectedTextStyle={{paddingVertical:8,fontSize:16,color:'#fff',textAlign:'right',textAlignVertical:'center'}}
            containerStyle={{backgroundColor:'#656466',borderRadius:10}}
            itemContainerStyle={{backgroundColor:'#656466',borderRadius:10}}
            itemTextStyle={{textAlign:'right',paddingHorizontal:4}}
            placeholder='เลือกหมวดหมู่'
            data={catagory}
            value={selecetedCatagory}
            labelField="label"
            valueField="value"
            onChange={item => {setSelecetedCatagory(item.value);}}/>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>ชื่อรายการ</Text>
          <TextInput style={styles.inputLeft}
          value={menu}
          onChangeText={text => setMenu(text)}/>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>จำนวนเงิน</Text>
          <TextInput style={styles.inputRight}
          value={money}
          onChangeText={text => setMoney(text)}/>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>รายละเอียด</Text>
          <TextInput style={styles.inputLeft} multiline
          value={detail}
          onChangeText={text => setDetail(text)}/>
        </View>
      </ScrollView>
    </>
  );
};

export default Form;
