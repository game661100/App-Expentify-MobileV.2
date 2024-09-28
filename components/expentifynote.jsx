import React, { useState } from 'react';
import { Text,View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles';

const ExpentifyNote = (props) => {

    const AddHandler = () =>
    {
        props.onSetPageFunction(2);
    }

    const [data,setData] = useState(null);

    const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]

    return (
        <>
        <View style={styles.navigationContainer}>
            <TouchableOpacity style={styles.navigationButton} onPress={props.BackPage}>
                <Ionicons name="arrow-back" size={32} color="white" />
            </TouchableOpacity>
            <View style={{flex:8}}>
                <Text style={styles.textTitle}>{props.date.split("-")[0]+" "+ monthNames[props.date.split("-")[1]-1]+" "+(Number(props.date.split("-")[2])+543)}</Text>
            </View>
            <View style={{flex:1}}></View>
        </View>
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={AddHandler}>
                <Ionicons name="add" size={32} color="white" />
            </TouchableOpacity>
        </View>
        </>
    );
};

export default ExpentifyNote;