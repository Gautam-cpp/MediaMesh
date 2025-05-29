import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, Text, TouchableOpacity, Alert } from 'react-native';
import AuthImage from '../components/AuthImage';
import Greeting from '../components/Greeting';
import AuthInput from '../components/AuthInput';
import CustomButton, { buttonWidth } from '../components/CustomButton';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from 'react-native-toast-notifications';
import { BACKEND_URL } from '@env';

export default function Signup({navigation}: any) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} =useAuth();
    const [loading, setLoading] = useState(false);
    const toast = useToast()

    const handleSignup = async () => {
        setLoading(true);
        if (!email || !username || !password) {
            toast.show('Please fill in all fields.', {
                type: 'warning',
            });
            setLoading(false);
            return;
        }
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signup`, {
                email,
                username,
                password,
            });
            if (response.status === 201) {
                await login(response.data.access_token, response.data.user);
                toast.show('Signup successful! Welcome!', {
                    type: 'success',
                });
                setLoading(false);
            }
            else {
                toast.show('Signup failed. Please try again.', {
                    type: 'danger',
                });
                setLoading(false);
            }
        } catch (error) {
            
            toast.show('An error occurred. Please try again.', {
                type: 'danger',
            });
            setLoading(false);
        }
    };
      
      
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <AuthImage />
                    <Greeting />
                    <Text style={styles.title}>Create Account</Text>
                    <AuthInput placeholder="Email" value={email} setValue={setEmail} />
                    <AuthInput placeholder="Username" value={username} setValue={setUsername} />
                    <AuthInput placeholder="Password" value={password} setValue={setPassword} />
                    <CustomButton text="Sign Up" width={buttonWidth.LARGE} onPress={handleSignup} loading={loading} />
                    <Text style={styles.footer}>Already Signed Up? 
                        <Text style={{color: 'blue'}} onPress={() => navigation.replace('Login')}> Login</Text>  
                    </Text> 
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        
        backgroundColor: '#fff',
        paddingVertical: 20,
        flexGrow: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 35,
        marginVertical: 10,
    },
    footer: {
        color: '#888',
        marginTop: 16,
        textAlign: 'center',
    },
});
