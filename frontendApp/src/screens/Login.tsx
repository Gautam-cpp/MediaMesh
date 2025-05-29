import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import AuthImage from '../components/AuthImage';
import Greeting from '../components/Greeting';
import AuthInput from '../components/AuthInput';
import CustomButton, { buttonWidth } from '../components/CustomButton';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import { BACKEND_URL } from '@env';


export default function Login({navigation}: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const toast = useToast();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/auth/login`, {
                email,
                password,
            });
            if (response.status === 200) {
                await login(response.data.access_token, response.data.user);
                toast.show('Login successful! Welcome back!', {
                    type: 'success',
                });

                setLoading(false);
            }
            else {
                toast.show('Login failed. Please check your credentials.', {
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
                <ScrollView contentContainerStyle={styles.container}>
                    <AuthImage />
                    <Greeting />
                    <Text style={styles.title}>Login Your Account</Text>
                    <AuthInput placeholder="Email" value={email} setValue={setEmail} />
                    <AuthInput placeholder="Password" value={password} setValue={setPassword} />
                    <CustomButton text="Login" width={buttonWidth.LARGE} onPress={handleLogin} loading={loading} />
                    <Text style={styles.footer}>Don't have an account? <Text style={{color: 'blue'}}  onPress={() => navigation.replace('Signup')}>Sign Up</Text></Text> 

                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        // paddingBottom: 60,
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
