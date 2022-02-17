import React, { useEffect, useRef, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { NativeBaseProvider, Center, Box, Input, Button, Checkbox, Text, Heading, Flex } from 'native-base';
import { loginStyles } from '../Styles/Login';

const RegistrationScreen = ({ navigation }) => {

    const [show, setShow] = React.useState(false);

    const handleClick = () => setShow(!show);

    return (
        <NativeBaseProvider>
            <View style={loginStyles.container}>
                <StatusBar backgroundColor='#242850' />
                <View style={loginStyles.upperBody} />
                <View style={loginStyles.lowerBody} />
                <Box position="absolute" top="15%" left="0" right="0" zIndex="2">
                    <Heading ml="6" mb="3" textAlign="left" color="#5159B3" fontSize="4xl" style={{ fontFamily: 'Ubuntu_300Light', }}>Night Owl</Heading>
                    <Text color="white" textAlign="left" fontSize="xl" mb="5" ml="5" >
                        Sign Up !
                    </Text>
                    <Center mt="10">
                        <Input
                            mx="3"
                            py="3"
                            pl="5"
                            placeholder="Email"
                            w="85%"
                            color="white"
                            borderColor="#444dad"
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
                            borderColor="#444dad"
                            InputRightElement={
                                <Button bg="#242850" size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
                                    {show ? "Hide" : "Show"}
                                </Button>
                            }
                            placeholder="Password"
                        />
                        <Input
                            type={show ? "text" : "password"}
                            mt="3"
                            py="3"
                            pl="5"
                            w="85%"
                            color="white"
                            maxW="400px"
                            borderColor="#444dad"
                            InputRightElement={
                                <Button bg="#242850" size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
                                    {show ? "Hide" : "Show"}
                                </Button>
                            }
                            placeholder="Retype Password"
                        />
                        <Box style={loginStyles.rememberPanel} mt="5">
                            <Text textAlign="center" color="white" mt='2' pb='0'>By continuing you are agree to terms of service and privacy policy.</Text>
                        </Box>
                        <Button mt="30" py="4" bg="#242850" w="85%" onPress={() => console.log("hello world")}>Sign up</Button>
                        <Box flexDir="row" justify="space-between" alignItems="center" w="80%">
                            <Text fontSize="sm" color="white" mt='2' mr="8" pb='0'>Already have an account ?</Text>
                            <Text onPress={() => navigation.navigate('Login')} fontSize="md" fontWeight="bold" color="#727bd6" mt='2' pb='0'>Login</Text>
                        </Box>
                    </Center>
                </Box>
            </View>
        </NativeBaseProvider>
    );
}


export default RegistrationScreen;