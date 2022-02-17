import React from 'react';
import { View, StatusBar } from 'react-native';
import { loginStyles } from '../Styles/Login';
import { Box, Button, Center, Heading, Image, NativeBaseProvider, Text } from 'native-base';
import AppLoading from 'expo-app-loading';

import {
    useFonts,
    Ubuntu_300Light,
    Ubuntu_300Light_Italic,
    Ubuntu_400Regular,
    Ubuntu_400Regular_Italic,
    Ubuntu_500Medium,
    Ubuntu_500Medium_Italic,
    Ubuntu_700Bold,
    Ubuntu_700Bold_Italic,
} from '@expo-google-fonts/ubuntu';

const IntroScreen = ({ navigation }) => {

    let [fontsLoaded] = useFonts({
        Ubuntu_300Light,
        Ubuntu_300Light_Italic,
        Ubuntu_400Regular,
        Ubuntu_400Regular_Italic,
        Ubuntu_500Medium,
        Ubuntu_500Medium_Italic,
        Ubuntu_700Bold,
        Ubuntu_700Bold_Italic,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <NativeBaseProvider>
            <View style={loginStyles.container}>
                <StatusBar backgroundColor='#242850' />
                <View style={loginStyles.upperBody}>
                    <Image
                        style={loginStyles.loginImage}
                        source={require('../assets/login-img.png')}
                        alt="Login Image"
                    />
                </View>
                <View style={loginStyles.lowerBody}>
                    <Box position="absolute" top="55%" left="0" right="0">
                        <Center>
                            <Heading color="white" fontSize="4xl" style={{ fontFamily: 'Ubuntu_300Light', }}>Night Owl</Heading>
                            <Text color="white" textAlign="center" fontSize="md" mx="10" >
                                Stop counting the sheep and fall asleep with our help.
                            </Text>
                            <Box w="90%" mt="10">
                                <Button mt="3" py="4" mt="10" bg="#242850" onPress={() => navigation.navigate('Login')}>Login</Button>
                                <Button mt="3" py="4" bg="#242850" onPress={() => navigation.navigate('Registration')}>Register</Button>
                            </Box>
                        </Center>
                    </Box>
                </View>
            </View>
        </NativeBaseProvider>
    );
}

export default IntroScreen;