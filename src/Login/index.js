import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Button, TouchableOpacity, Text, FlatList, SafeAreaView, TextInput, Image } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useSelector, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import {LoggedIn, Loggedout} from '../redux/action'
import Icon from 'react-native-vector-icons/AntDesign';




export default function LogIn() {
  const dispatch = useDispatch()
  GoogleSignin.configure({
    webClientId: '372826195867-p5bs21tin68fl65is3beso6r3ectv3o0.apps.googleusercontent.com',
  });
  const onGoogleButtonPress = async () => {
          try {
            const { idToken } = await GoogleSignin.signIn();
    
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
      // Sign-in the user with the credential
      dispatch(LoggedIn())
      return auth().signInWithCredential(googleCredential);
      } catch (error) {
          console.log(error);
      }
  }
    return (
      <View style={styles.parentView}>
        <Text style={{fontSize: 16, textAlign: 'center', marginBottom: 20}}>You need to sign in with your google account to acces this feature.</Text>
        <TouchableOpacity style={styles.googleBtn} onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
          <Icon name="google" size={30} color="#fff" />
          <Text style={{color: '#fff', fontSize: 20, marginLeft: 10}}>Sign in with google</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleBtn: {
    backgroundColor: '#CB4335',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    shadowColor: "#515A5A",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  }
});

