import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer:{
      padding: 30,
      flex:1
    },
    titleContainer:{
      color: '#fff',
      fontWeight: 'bold',
      fontFamily: 'poppins-bold',
      fontSize: 32,
      marginVertical: 20,
    },
    navigationContainer:{
        flexDirection:'row',
        paddingVertical:10,
    },
    textTitle: {
      color: '#fff',
      fontFamily: 'poppins-regular',
      fontSize: 24,
      borderWidth: 2,
      borderColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 8,
      alignSelf:'center',
      textAlignVertical:'center',
      textAlign: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButton: {
      backgroundColor: '#6e47b2',
      borderRadius: 50,
      padding: 15,
      position: 'absolute',
      right: 20,
      bottom: 20,
    },
    navigationButton: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flex:1,
    },
    textBox: {
        borderRadius: 10,
        backgroundColor: "#ccc2fe",
        padding:5,
        marginBottom:10,
    },
    text:{
        color: '#000',
        fontSize: 18,
        textAlignVertical:'center',
        textAlign: 'left',
        paddingVertical:8,
        paddingHorizontal:4,
    },
    inputLeft:{
        color: '#fff',
        fontSize: 16,
        textAlignVertical:'center',
        textAlign: 'left',
        backgroundColor: '#656466',
        marginTop:5,
        paddingVertical:5,
        paddingHorizontal:20,
        borderRadius:10
    },
    inputRight:{
        color: '#fff',
        fontSize: 16,
        textAlignVertical:'center',
        textAlign: 'right',
        backgroundColor: '#656466',
        marginTop:5,
        paddingVertical:5,
        paddingHorizontal:20,
        borderRadius:10
    }
});

export default styles;