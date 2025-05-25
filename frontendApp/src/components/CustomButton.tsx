import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import LoadingIcon from './LoadingIcon';

export enum buttonWidth {
    SMALL,
    MEDIUM, 
    LARGE
}

type buttonProps = {
    text: string,
    width: buttonWidth,
    loading?: boolean,
    onPress: () => void
};

export default function CustomButton(props: buttonProps) {
    const getWidthStyle = () => {
        switch (props.width) {
            case buttonWidth.SMALL: return styles.small;
            case buttonWidth.MEDIUM: return styles.medium;
            case buttonWidth.LARGE: return styles.large;
            default: return styles.large;
        }
    };

    return (
        <TouchableOpacity style={[styles.button, getWidthStyle(), {opacity: props.loading ? 0.5 : 1}]} onPress={props.onPress} disabled={props.loading}>
            <View style={styles.inside}>
                {props.loading ? <LoadingIcon size="small" color="#fff" centered={false} /> : null}
                <Text style={styles.buttonText}>{props.text}</Text>

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#6C3DFF',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    inside: {
        flexDirection: 'row',
        gap: 8,
    },
    small: {
        width: 120,
    },
    medium: {
        width: 200,
    },
    large: {
        width: 300,
    },
});
