import React, { useState } from 'react'
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Platform,
    Alert,
    Image
} from 'react-native';
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer';
import storage from '@react-native-firebase/storage'
import * as Progress from 'react-native-progress'
import styles from './styles'

const ImageUploader = ({ plantId }) => {

    const [image, setImage] = useState(null)
    const [imageName, setImageName] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [transferred, setTransferred] = useState(0)

    const selectImage = () => {
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }

        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('image picker error', response.error)
            } else if (response.customButton) {
                console.log('user tapped custom button: ', response.customButton)
            } else {
                const source = { uri: response.uri }
                console.log('source: ', response.uri)
                setImage(source)
            }
        })

        //resize options below:

        let maxWidth = 600
        let maxHeight = 400
        let compressFormat = 'png'
        let quality = 80
        let rotation = 0
        let outputPath = null
        let imageURI = source.uri

        ImageResizer.createResizedImage(imageURI,
            maxWidth,
            maxHeight,
            compressFormat,
            quality,
            rotation,
            outputPath)
            .then((response) => {
                let uri = response.uri
                let imageName = 'plant' + plantId

                const source = { uri }
                console.log('Compressed source: ', source)
                setImage(source)
                setImageName(imageName)
            })
    }

    const uploadImage = async () => {
        const { uri } = image
        let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri

        setUploading(true)
        setTransferred(0)

        const task = storage()
            .ref(imageName)
            .putFile(uploadUri)

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

            <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
                <Text style={styles.selectButton}>Seleccionar Foto</Text>
            </TouchableOpacity>

            <View style={styles.imageContainer}>
                {image !== null ? (
                    <Image source={{ uri: image.uri }} style={styles.imageBox}></Image>) : null}
                {uploading ? (
                    <View style={styles.progressBarContainer}>
                        <Progress.Bar progress={transferred} width={300} />
                    </View>
                ) : (
                    <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
                        <Text style={styles.buttonText}>uploadImage</Text>
                    </TouchableOpacity>
                )}
            </View>

        </SafeAreaView>
    )

}

export default ImageUploader