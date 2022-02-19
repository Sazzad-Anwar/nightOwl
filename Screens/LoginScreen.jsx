import React, { useEffect, useRef, useState } from 'react';
import { NativeBaseProvider, View, StatusBar, Center, Box, Input, Button, Checkbox, Text, Heading, KeyboardAvoidingView } from 'native-base';
import { loginStyles } from '../Styles/Login';
import { Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from '../context/GlobalContextProvider';
import { USER_LOGIN } from '../context/Constants/UserConstants';

const LoginScreen = ({ navigation }) => {

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState("")
    const { userDispatch, user } = useGlobalContext()

    const handleClick = () => setShow(!show);

    const handleSubmit = async () => {

        if (email !== '' && password !== '') {

            userDispatch({
                type: USER_LOGIN, payload: {
                    email,
                    userName: email.split('@')[0],
                    isLoggedIn: true,
                    photoUrl: ''
                }
            })

            if (user) {
                await AsyncStorage.setItem('user', JSON.stringify({
                    email,
                    userName: email.split('@')[0],
                    isLoggedIn: true,
                    photoUrl: ''
                }))
                navigation.navigate('Home');
            } else {
                setVisible(true)
                setError("Email and password are invalid")
            }
        }
        else if (email === '' || password === '') {
            setVisible(true)
            setError("Email and password are required")
        }
    }

    return (
        <NativeBaseProvider>
            <View style={loginStyles.container}>
                <Snackbar
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 4,
                        backgroundColor: '#242850'
                    }}
                    action={{
                        label: 'OK',
                        onPress: () => {
                            setVisible(false)
                        },
                    }}>
                    <Text fontFamily="Ubuntu_400Regular" color="red.500" textAlign="center">{error}</Text>
                </Snackbar>
                <StatusBar backgroundColor='#242850' />
                <View style={loginStyles.upperBody} />
                <View style={loginStyles.lowerBody} />
                <Box position="absolute" w='100%' top="25%" left="0" right="0" zIndex="2">
                    <Text
                        ml="6"
                        mb="3"
                        fontFamily="Ubuntu_500Medium"
                        textAlign="left"
                        color="#5159B3"
                        fontSize="4xl"
                    >
                        Night Owl
                    </Text>
                    <Text color="white" fontFamily="Ubuntu_400Regular" textAlign="left" fontSize="lg" mb="5" ml="5" >
                        Welcome back !
                    </Text>
                    <KeyboardAvoidingView h={{
                        base: "400px",
                        lg: "auto"
                    }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <Center mt="20">
                            <Input
                                mx="3"
                                py="3"
                                pl="5"
                                placeholder="Email"
                                w="85%"
                                type="email"
                                color="white"
                                fontSize="md"
                                fontFamily="Ubuntu_400Regular"
                                _focus={{ borderColor: '#444dad' }}
                                onChangeText={text => setEmail(text)}
                                borderColor={"#444dad"}
                                maxWidth="400px"
                            />
                            <Input
                                type={show ? "text" : "password"}
                                mt="3"
                                py="3"
                                pl="5"
                                w="85%"
                                color="white"
                                maxW="400px"
                                fontSize="md"
                                fontFamily="Ubuntu_400Regular"
                                onChangeText={text => setPassword(text)}
                                borderColor={"#444dad"}
                                _focus={{ borderColor: '#444dad' }}
                                borderColor="#444dad"
                                InputRightElement={
                                    <Button bg="#242850" size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
                                        {show ? "Hide" : "Show"}
                                    </Button>
                                }
                                placeholder="Password"
                            />
                            <Box style={loginStyles.rememberPanel} mt="5">
                                <Checkbox colorScheme="info" mt="3" value="rememberPassword" accessibilityLabel="Remember this password">
                                    <Text fontFamily="Ubuntu_400Regular" style={{ color: 'white', marginLeft: 3 }}>Remember</Text>
                                </Checkbox>
                                <Text onPress={() => navigation.navigate('ForgotPassword')} fontFamily="Ubuntu_500Medium" color="white" mt='2' pb='0'>Forgot Password?</Text>
                            </Box>
                            <Button fontFamily="Ubuntu_400Regular" mt="30" py="4" bg="#242850" w="85%" _pressed={{ bg: '#1B1E3C', borderColor: '#1B1E3C' }} onPress={handleSubmit}>Login</Button>
                        </Center>
                    </KeyboardAvoidingView>


                </Box>
            </View>
        </NativeBaseProvider>
    );
}


export default LoginScreen;