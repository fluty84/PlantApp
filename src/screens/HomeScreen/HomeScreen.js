import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { firebase } from '../../firebase/config'
import { NavigationContainer } from '@react-navigation/native'

const HomeScreen = ({props, userLoged, navigation}) => {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('entities')

    let userID 
    userLoged ? userID = userLoged : userID = props.route.params.user.id

    useEffect(() => {
        entityRef
            .where('authorID', "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    })
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onAddButtonPress = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp()

            const data = {
                text: entityText,
                authorID: userID,
                createdAt: timestamp
            }
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => alert(error))
        }
    }

    const renderEntity = ({ item, index }) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {index}. {item.text}
                </Text>
            </View>
        )
    }

    const backLoggin = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='añade nueva planta'
                    placeholderTextColor="#aaaaaa"
                    onChange={(text) => setEntityText(text)}
                    value={entityText}
                    underlineColorAndroid="trasparent"
                    autoCapitalize="none">
                </TextInput>
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Agregar</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                <Text style={styles.buttonText} onPress={backLoggin}>Cambiar de usuario</Text>
            </TouchableOpacity>
            {
                entities && (
                    <View style={styles.listContainer}>

                        <FlatList
                            data={entities}
                            renderItem={renderEntity}
                            keyExtractor={(item) => item.id}
                            removeClippedSubviews={true} >
                        </FlatList>

                    </View>
                )
            }
        </View>
    )

}

export default HomeScreen