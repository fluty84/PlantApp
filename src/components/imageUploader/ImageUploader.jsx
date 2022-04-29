import React, { useState, } from 'react'
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../../firebase/config'

import * as MediaLibrary from 'expo-media-library'

import styles from './styles'


const ImageUploader = ({ plantName, plant }) => {

    const [image, setImage] = useState(null)
    const [imageName, setImageName] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [transferred, setTransferred] = useState(0)
    const [photo, setPhoto] = useState(null)
    const [galleryPermission, setGalleryPermission] = useState(null)
    const [status, requestPermission] = MediaLibrary.usePermissions();

    let source = {}

    const entityRef = firebase.firestore().collection('plants')

    const takeImage = async () => {

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.cancelled) {


            const uri = result.uri
            const type = result.type
            const name = plantName.replace(/\s+/g, '').toLowerCase() + ".jpg"

            source = {
                uri,
                type,
                name
            }


            setImage(result.uri);
        }

        setImageName(plantName)

    }


    const saveImg = async () => {
        const permision = await MediaLibrary.requestPermissionsAsync()

        if (permision) {
            const asset = await MediaLibrary.createAssetAsync(image);
            setPhoto(asset)
            setImage(null)
            
            entityRef
                .doc(plant.id)
                .update({ imgUri: asset.uri })
                .catch((error) => alert(error))
            
        } else {
            Alert.alert("necesitas dar permiso para poder guardar la imagen")
        }
    }


    return (
        <SafeAreaView style={styles.container}>

            <TouchableOpacity style={styles.selectButton} onPress={takeImage}>
                {!plant.imgUri ? (<Text style={styles.buttonText}>Hacer Foto</Text>) : (<Text style={styles.buttonText}>📸</Text>)}
            </TouchableOpacity>

            <View style={styles.imageContainer}>
                {image && <Image source={{ uri: image }} style={styles.imageBox} />}
                {image &&
                    <TouchableOpacity style={styles.uploadButton} onPress={saveImg}>
                        <Text style={styles.buttonText}>¿Guardar Foto?</Text>
                    </TouchableOpacity>
                }
                {plant.imgUri && <Image source={{ uri: plant.imgUri }} style={styles.imageBox} />}
            </View>

        </SafeAreaView>
    )

}

export default ImageUploader