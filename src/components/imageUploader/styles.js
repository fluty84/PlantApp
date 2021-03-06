import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        
    },
    selectButton: {
        borderRadius: 5,
        width: 100,
        height: 50,
        backgroundColor: 'darkseagreen',
        alignItems: 'center',
        justifyContent: 'center'
    },
    uploadButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#ffb6b9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -150,
        marginBottom: 100
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    imageContainer: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center'
    },
    progressBarContainer: {
        marginTop: 20
    },
    imageBox: {
        width: 300,
        height: 300
    }
});
