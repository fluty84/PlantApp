import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';
import { backgroundColor, shadowColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        marginBottom:10
    },
    formContainer: {
        flexDirection: 'column',
        height: 200,
        width: 350,
        marginTop: 20,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },

    list : {
        height: 500,
        alignItems: 'center'
    },    

    input: {
        height: 44,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5,
        marginTop:5
    },
    inputs: {
        height: 90,
        width: 200
    }, 
    button: {
        height: 44,
        borderRadius: 5,
        backgroundColor: 'green',
        width: 100,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonDry: {
        height: 44,
        borderRadius: 5,
        backgroundColor: 'chocolate',
        width: 100,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16, 
        justifyContent: 'center',
        textAlign: 'center'
    },
    buttonFloor: {
        height: 47,
        borderRadius: 5,
        backgroundColor: 'green',
        width: 100,
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 20,
        marginRight: 250,
    },
    listContainer: {
        marginTop: 20,
        padding: 20,      
        height: 430,
        width: 350,
        alignItems: 'center'
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 25,
        color: 'darkgreen', 
        fontFamily: "Inter_900Black"
        
    }, 
    redText: {
        fontSize: 16,
        fontWeight:"bold",
        color: 'crimson'
    } 

})
