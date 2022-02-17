import React, { useEffect, useRef, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { NativeBaseProvider, Center, Box, Input, Button, Checkbox, Text, Heading } from 'native-base';
import { loginStyles } from '../Styles/Login';

const ForgotPasswordScreen = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <StatusBar backgroundColor='#242850' />
            <View style={loginStyles.upperBody} />
            <View style={loginStyles.lowerBody} />
            <Box position="absolute" top="25%" left="0" right="0" zIndex="2">
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
                <Text color="white" textAlign="left" fontSize="sm" mb="5" ml="5" >
                    Forgot password ? Enter your email address and we will send you a link to reset your password.
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
                    <Box flexDir="row" justifyContent="space-between" w="85%" alignItems="center">
                        <Button mt="30" py="3" bg="#242850" w="45%" onPress={() => console.log("hello world")}>Send</Button>
                        <Button mt="30" py="3" bg="#242850" w="45%" onPress={() => navigation.goBack()}>Back</Button>
                    </Box>
                </Center>
            </Box>
        </NativeBaseProvider>
    );
}

export default ForgotPasswordScreen;