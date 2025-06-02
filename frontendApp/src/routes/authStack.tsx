import React, { Component } from 'react'
import { Text, View } from 'react-native'

import Signup from '../screens/Signup';
import Login from '../screens/Login';



export type AuthStackParamList = {
    Signup: undefined;
    Login: undefined;
}

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
 
    return (
      <Stack.Navigator
        screenOptions={{
            animation: 'slide_from_right',
            headerShown: false,
        }}>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    )
  
}