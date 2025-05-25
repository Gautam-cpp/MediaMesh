import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default function AuthImage() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/SignUpImage.png')}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 6  ,
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 8,
    },
});
