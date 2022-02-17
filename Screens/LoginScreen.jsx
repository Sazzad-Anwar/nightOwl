import React, { useEffect, useRef, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { NativeBaseProvider, Center, Box, Input, Button, Checkbox, Text, Heading } from 'native-base';
import { loginStyles } from '../Styles/Login';
import { Snackbar } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState("")

    const handleClick = () => setShow(!show);

    const handleSubmit = () => {

        if (email !== '' && password !== '') {
            navigation.navigate('Home');
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
                    <Text color="red.500" textAlign="center">{error}</Text>
                </Snackbar>
                <StatusBar backgroundColor='#242850' />
                <View style={loginStyles.upperBody} />
                <View style={loginStyles.lowerBody} />
                <Box position="absolute" w='100%' top="25%" left="0" right="0" zIndex="2">
                    <Heading
                        ml="6"
                        mb="3"
                        textAlign="left"
                        color="#5159B3"
                        fontSize="4xl"
                        style={{ fontFamily: 'Ubuntu_300Light', }}
                    >
                        Night Owl
                    </Heading>
                    <Text color="white" textAlign="left" fontSize="lg" mb="5" ml="5" >
                        Welcome back !
                    </Text>
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
                            onChangeText={text => setPassword(text)}
                            borderColor={"#444dad"}
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
                                <Text style={{ color: 'white', marginLeft: 3 }}>Remember</Text>
                            </Checkbox>
                            <Text onPress={() => navigation.navigate('ForgotPassword')} fontWeight="bold" color="white" mt='2' pb='0'>Forgot Password?</Text>
                        </Box>
                        <Button mt="30" py="4" bg="#242850" w="85%" onPress={handleSubmit}>Login</Button>
                    </Center>


                </Box>
            </View>
        </NativeBaseProvider>
    );
}


export default LoginScreen;