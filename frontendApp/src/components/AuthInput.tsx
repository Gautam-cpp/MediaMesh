import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

type inputProps = {
    placeholder: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
};

export default function AuthInput(props: inputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <TextInput 
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={props.placeholder}
            placeholderTextColor="#888" 
            value={props.value}
            onChangeText={props.setValue}
            style={[styles.input, isFocused && styles.inputFocused]}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        height: 48,
        marginHorizontal: 35,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#f8f8f8',
    },
    inputFocused: {
        borderColor: 'indigo',
        backgroundColor: '#fff',
    },
});
