import React, { useState } from 'react'
import { Text, StyleSheet, View, Image, Pressable, TouchableOpacity, Keyboard } from 'react-native'
import AddContent from './AddContent';

export default function TopBar() {
    const [isBottomVisible, setIsBottomVisible] = useState(false);
    const toggleBottomSheet = () => {
        setIsBottomVisible(!isBottomVisible);
    };
    
  return (
    <>
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image source={require('../assets/image.png')} style={styles.image} />
        <Text style={styles.title}>MediaMesh</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {
        Keyboard.dismiss(); 
        toggleBottomSheet();
      }}>
        <Text style={styles.buttonText}>
          <Text style={styles.buttonplus}>+  </Text>Add Content
        </Text>
      </TouchableOpacity>
    </View>

    <AddContent visible={isBottomVisible} onClose={toggleBottomSheet} />
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingBottom: 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderBottomColor: '#6B3DFF',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#6C3DFF',
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
    buttonplus: {
        color: '#D3D3D3',
        fontWeight: 'bold',
    }
})
