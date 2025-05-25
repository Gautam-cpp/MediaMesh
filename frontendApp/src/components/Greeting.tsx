import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function Greeting() {
    const greetingAccordingToTime = () => {
        const hours = new Date().getHours();
        if (hours < 12) return "Good Morning";
        if (hours < 18) return "Good Afternoon";
        return "Good Evening";
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello!</Text>
            <Text style={styles.subtitle}>{greetingAccordingToTime()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 35,
        marginVertical: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 24,
        fontWeight: '600',
        // color: '#555',
    },
});
