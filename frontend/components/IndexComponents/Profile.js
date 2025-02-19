import React, { Component, useContext } from 'react';
import { View, ScrollView,StyleSheet,Text,Button,Image,TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import { AuthContext } from '../../context/AuthContext';


export default function Profile({navigation}){

  const authContext = useContext(AuthContext);

  const logout = async () => {
      AsyncStorage.removeItem("user");
      await SecureStore.deleteItemAsync("token");
      authContext.logoutUser();
  };

    return (
        <ScrollView>
            <View style={Styles.container}>
                <Text>Profile</Text>
            <TouchableOpacity onPress={logout}><Text style={Styles.icon}> Sign out</Text></TouchableOpacity>
            </View>
        </ScrollView>
    );
  }
const Styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
})


