import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import {getAuth, FacebookAuthProvider, signInWithCredential} from 'firebase/auth'
import {firebase} from './config'
import { LoginManager } from 'react-native-fbsdk-next';
import React, {useState, useEffect} from "react"
export default function App() {

  const[initializing , seInitializing] = useState(true)
  const [user, setUser] = useState();

  function onAuthStateChange(user){
    setUser(user);
    if(initializing){
      seInitializing(false)
    }
  }

  useEffect(() => {
    const subscriber = firebase.auth.onAuthStateChanged(onAuthStateChanged)
    return subscriber ;
  }, []) 

  const signInWithFB = async () => {
    try {
      await LoginManager.logInWithPermissions(['public_profile', "email"]);
      const data = await AcccessToken.getCurrentToken();
      if(!data) {
        return;
      }

      const facebookCredential = FacebookAuthProvider.credential(data.acccessToken);
      const auth = getAuth();
      const response = await signInWithCredential(auth, facebookCredential);
      console.log("response: ", response)
    } catch (error) {
      console.log(error)
    }

    const signOut = async () => {
      try {
        await firebase.auth().signOut();
      } catch (error) {
        console.log(error)
      }
    }
  }

  if(initializing) return null;  

  if(!user){
    return (
      <View style={styles.container}>
        <Text style = {{fontWeight:"bold"}}>Facebook Auth with Native</Text>
        <Button title='sign in with Facebook' onPress = {signInWithFB}/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
        <Text style = {{fontWeight:"bold"}}>Facebook Auth with Native</Text>
      <StatusBar style="auto" />
      <View>
        <View>
          <Text>Welceme {user.displayname}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
