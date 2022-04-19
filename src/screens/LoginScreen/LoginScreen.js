import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { firebase } from '../../firebase/config'

import styles from './styles'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLoginPress = () => {

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((res) => {

                if (res.user.uid) {

                    const uid = res.user.uid
                    const usersRef = firebase.firestore().collection('users')

                    usersRef
                        .doc(uid)
                        .get()
                        .then(firestoreDocument => {
                            if (!firestoreDocument.exists) alert("User does not exist anymore")

                            const user = firestoreDocument.data()
                            navigation.navigate('Home', { user })
                            
                        })
                        .catch(error => Alert.alert(error.message))
                }
                else { Alert.alert("Contraseña incorrecta") }

            })
            .catch(error => Alert.alert(error))
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Text
                    style={styles.title}>Happy Plant</Text>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/happyP.png')}
                ></Image>
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                ></TextInput>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                ></TextInput>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { onLoginPress() }}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>¿No tienes cuenta?
                        <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text>
                    </Text>
                </View>

            </KeyboardAwareScrollView>
        </View>
    )
}

export default LoginScreen