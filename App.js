import 'react-native-gesture-handler'
import { registerRootComponent } from 'expo'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import { decode, encode } from 'base-64'
import AppLoading from "expo-app-loading"
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter'
import { firebase } from './src/firebase/config'


if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator()


export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  let [fontLoaded] = useFonts({
    Inter_900Black,
  })

  useEffect( () => {
    const  usersRef = firebase.firestore().collection('users')
      firebase.auth().onAuthStateChanged(user => {
      if(user){
        usersRef
          .doc(user.uid)
          .get()
          .then((document)=> {
            const userData = document.data()
            setUser(userData)
            setLoading(false)
          })
          .catch((error)=>{
            setLoading(false)
          })
      } else {
        setLoading(false)
        console.log('no user')
      }
    })
  }, [user])


  if (!fontLoaded || loading) {
    return <AppLoading></AppLoading>
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user != null ?
          ( <>
            <Stack.Screen name="Home">
              {props => <HomeScreen {...props} userLoged={user} extraData={user}></HomeScreen>}
            </Stack.Screen>
            {/* <Stack.Screen name="Login">
              {props => <LoginScreen {...props} setUser={setUser} extraData={user}></LoginScreen>}
            </Stack.Screen>
            <Stack.Screen name="Registration" component={RegistrationScreen}></Stack.Screen> */}

            </>
          )
          :
          (
            <>
              <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
              <Stack.Screen name="Registration" component={RegistrationScreen}></Stack.Screen>
              <Stack.Screen name="Home"
              >
                {props => <HomeScreen {...props} extraData={user}></HomeScreen>}
              </Stack.Screen>
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )

  //} 
}
registerRootComponent(App);