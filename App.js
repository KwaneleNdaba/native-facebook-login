import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import {
  getAuth,
  FacebookAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { firebase } from './config';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'; // Import AccessToken

import React, { useState, useEffect } from 'react';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const signInWithFB = async () => {
    try {
      await LoginManager.logInWithPermissions(['public_profile']);
      const accessToken = await AccessToken.getCurrentAccessToken();
      if (!accessToken) {
        return;
      }

      const facebookCredential = FacebookAuthProvider.credential(
        accessToken.accessToken
      );
      const auth = getAuth();
      const response = await signInWithCredential(auth, facebookCredential);
      console.log('response: ', response);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: 'bold' }}>Facebook Auth with Native</Text>
        <Button title="Sign in with Facebook" onPress={signInWithFB} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold' }}>Facebook Auth with Native</Text>
      <StatusBar style="auto" />
      <Text>Welcome {user.displayName}</Text> 
      <Text>Welcome {user.email}</Text> 
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
