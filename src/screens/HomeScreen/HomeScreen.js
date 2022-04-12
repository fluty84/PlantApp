import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native'
import styles from './styles'
import { firebase } from '../../firebase/config'
import { NavigationContainer } from '@react-navigation/native'



const HomeScreen = ({ props, userLoged, navigation }) => {

    const [entityText, setEntityText] = useState({
        name: "",
        days: ""
    })
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('plants')

    let userID
    userLoged ? userID = userLoged.id : userID = props.route.params.user.id

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
       
        const { name, days } = entityText
       
        const timestamp = firebase.firestore.FieldValue.serverTimestamp()

        if (name.length > 0) {

            const data = {
                authorID: userID,
                createdAt: timestamp,
                name,
                days
            }
            console.log('data', data)
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => alert(error))
        }
    }

    const renderEntity = ({ item, index }) => { //new plant form

        const letWater = (item) => {
            
            entityRef
                .doc(item)
                .update({ lastWater: Date() })
                .catch((error) => alert(error))
        }

        let daysLeft = ""

        const restDays = () => {
            console.log('date', item.lastWater)    

            let lastWater = new Date(item.lastWater)
            let now = new Date()

            let substract = now.getTime() - lastWater.getTime() 
            
            daysLeft =  item.days - Math.round(substract / (1000 * 60 * 60 * 24))
   
        }

        restDays()


        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {item.name}
                </Text>
                <Text>Regar cada: {item.days} dias </Text>
                {item.lastWater ? <Text>Quedan:{daysLeft} dias</Text> :
                 <Text> ¡Riégame!</Text>}
                <TouchableOpacity style={styles.button} onPress={() => letWater(item.id)}>
                    <Text style={styles.buttonText}>Regada :)</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const backLoggin = () => {
        navigation.navigate('Login')
    }


    return (
        <>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.formContainer}>
                    <View style={styles.inputs}>
                        <TextInput
                            style={styles.input}
                            name='name'
                            placeholder='Nombre'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => {
                                setEntityText({
                                    ...entityText,
                                    name: text
                                })
                            }}
                            value={entityText.name}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none">
                        </TextInput>
                        <TextInput
                            style={styles.input}
                            placeholder='regar cada'
                            name='days'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => {
                                setEntityText({
                                    ...entityText,
                                    days: text
                                })
                                console.log(entityText)
                            }}
                            value={entityText.days}//cambiar
                            underlineColorAndroid="transparent"
                            autoCapitalize="none">
                        </TextInput>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                        <Text style={styles.buttonText}>Agregar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.list}>
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
                <TouchableOpacity style={styles.buttonFloor} onPress={backLoggin} >
                    <Text style={styles.buttonText} onPress={backLoggin}>Cambiar de usuario</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </>
    )

}

export default HomeScreen