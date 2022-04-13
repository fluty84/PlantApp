import React, { useState, useEffect } from 'react'
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Platform,
    Alert,
    Image
} from 'react-native';
//import {ImagePicker, launchCamera, launchImageLibrary} from 'react-native-image-picker'
//import * as ImagePicker from 'react-native-image-picker'
import * as ImagePicker from 'expo-image-picker'
import storage from '@react-native-firebase/storage'
import * as Progress from 'react-native-progress'
import { firebase } from '../../firebase/config'

import styles from './styles'


const ImageUploader = ({ plantName }) => {

    const [image, setImage] = useState(null)
    const [imageName, setImageName] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [transferred, setTransferred] = useState(0)
    const [galleryPermission, setGalleryPermission] = useState(null)


    const takeImage = async () => {

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            console.log(image)
        }

        setImageName(plantName)

    }

    const uploadImage = async () => {
        //const { uri } = image
        let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : image

        setUploading(true)
        setTransferred(0)

       const task = firebase
            .storage()
            .ref(imageName)
            .putFile(uploadUri)
            .then((snapshot) => {
                //You can check the image is now uploaded in the storage bucket
                console.log(`${imageName} has been successfully uploaded.`)
            })
            .catch((error) => console.log('uploading image error => ', error))

        // const task = storage()
        //     .ref(imageName)
        //     .putFile(uploadUri)

        //set progress state

        task.on('state_changed', snapshot => {
                    setTransferred(
                        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
                    )
                })

        try {
                    await task
                } catch (error) { console.log(error) }

                setUploading(false)

                Alert.alert(
                    'Foto agregada con éxito!',
                )

                setImage(null)
            }

    return (
            <SafeAreaView style={styles.container}>

                <TouchableOpacity style={styles.selectButton} onPress={takeImage}>
                    <Text style={styles.buttonText}>Hacer Foto</Text>
                </TouchableOpacity>

                <View style={styles.imageContainer}>
                    {image && <Image source={{ uri: image }} style={styles.imageBox} />}
                    {uploading ? (
                        <View style={styles.progressBarContainer}>
                            <Progress.Bar progress={transferred} width={300} />
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
                            <Text style={styles.buttonText}>Subir Foto</Text>
                        </TouchableOpacity>
                    )}
                </View>

            </SafeAreaView>
        )

    }

    export default ImageUploader