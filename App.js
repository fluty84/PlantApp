import 'react-native-gesture-handler'
import { registerRootComponent } from 'expo'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import { decode, encode } from 'base-64'
import AppLoading from "expo-app-loading"
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter'

import * as Font from 'expo-font'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator()


export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  // useEffect(() => { //to load the fonts async

  //   const loadFonts = async () => {
  //     await Font.loadAsync({
  //       'Montserrat-Bold': require('./assets/fonts/Montserrat-ExtraBold.otf'),
  //     }).then(res => {
  //       console.log("FONTS LOADED!", res);
  //     }).catch(Err => {
  //       console.log(Err);
  //     });
  //   }

  //   loadFonts()
  //   console.log(user);
  // }, [])

  // const [fontLoaded, setFontLoaded] = useState(false)

  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={loadFonts}
  //       onFinish={setFontLoaded(true)}
  //       onError={console.warn}
  //       autoHideSplash={false}
  //     />
  //   ) 
  // } else {

  let [fontLoaded] = useFonts({
    Inter_900Black,
  })

  if(!fontLoaded){
    return <AppLoading></AppLoading>
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ?
          (
            <Stack.Screen name="Home">
              {props => <HomeScreen {...props} extraData={user}></HomeScreen>}
            </Stack.Screen>
          )
          :
          (
            <>
              <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
              <Stack.Screen name="Registration" component={RegistrationScreen}></Stack.Screen>
              <Stack.Screen name="Home">
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