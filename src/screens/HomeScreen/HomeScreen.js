import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native'
import styles from './styles'
import { firebase } from '../../firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import ImageUploader from '../../components/imageUploader/ImageUploader'
import { Image } from 'react-native-web'


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
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => alert(error))
        }
    }

    const renderEntity = ({ item }) => { //new plant form

        const letWater = (item) => {

            entityRef
                .doc(item)
                .update({ lastWater: Date() })
                .catch((error) => alert(error))
        }

        let daysLeft = 0

        const restDays = () => {

            let lastWater = new Date(item.lastWater)
            let now = new Date()

            let substract = now.getTime() - lastWater.getTime()

            daysLeft = item.days - Math.round(substract / (1000 * 60 * 60 * 24))

        }

        restDays()


        return (
            <View style={styles.entityContainer}>

                <Text style={styles.entityText}>
                    {item.name}
                </Text>

                <View style={styles.container}>
                    <Text>Regar cada: {item.days} dias </Text>
                    {
                        item.lastWater && daysLeft > 0 ?
                            <Text>Quedan:{daysLeft} dias</Text> :
                            <Text style={styles.redText} > Seca hace {(daysLeft || 0)  * -1} dias</Text>
                    }
                    {
                        item.lastWater && daysLeft > 0 ?
                            <TouchableOpacity style={styles.button} onPress={() => letWater(item.id)}>
                                <Text style={styles.buttonText}>Regada (•‿•)</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.buttonDry} onPress={() => letWater(item.id)}>
                                <Text style={styles.buttonText}>Riegame! (._.)</Text>
                            </TouchableOpacity>
                    }
                </View>

                <ImageUploader plantName={item.name} plant={item}></ImageUploader>
            </View>
        )
    }



    return (
        <>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.formContainer}>
                    <View style={styles.inputs}>
                        <TextInput
                            style={styles.input}
                            name='name'
                            placeholder='Nombre de la planta'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => {
                                setEntityText({
                                    ...entityText,
                                    name: text
                                })
                            }}
                            value={entityText.name}
                            underlineColorAndroid="transparent"
                            autoCapitalize="sentences">
                        </TextInput>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            placeholder='Regar cada'
                            name='days'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => {
                                setEntityText({
                                    ...entityText,
                                    days: text
                                })

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


                {/* plant list */}
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
                {/* <TouchableOpacity style={styles.buttonFloor} onPress={backLoggin} >
                    <Text style={styles.buttonText} onPress={backLoggin}>Cambiar de usuario</Text>
                </TouchableOpacity> */}
            </KeyboardAvoidingView>
        </>
    )

}

export default HomeScreen