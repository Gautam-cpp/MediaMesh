import React, { Component, useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './authStack';
import AppNavigation from './appStack';
import { useAuth } from '../context/AuthContext';




export default function Router() {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, checkAuth } = useAuth();

  useEffect(() => {
    const init = async () => {
      await checkAuth();
      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    
    return null;
  }

    return (

      <NavigationContainer>
        {isLoggedIn ? <AppNavigation /> : <AuthStack />}
      </NavigationContainer>    
    )
  
}