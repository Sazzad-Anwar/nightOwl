import React from 'react';
import { loginStyles } from '../Styles/Login';
import { Box, View, StatusBar, Button, Center, Heading, Image, NativeBaseProvider, Text } from 'native-base';
import { useFonts, Ubuntu_500Medium, Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';
import AppLoading from 'expo-app-loading';

const IntroScreen = ({ navigation }) => {

    const [fontsLoaded] = useFonts({
        Ubuntu_500Medium,
        Ubuntu_400Regular,
    })

    if (!fontsLoaded) {
        return <AppLoading />
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
                    <Box position="absolute" top="50%" left="0" right="0">
                        <Center>
                            <Text color="white" fontSize="4xl" fontFamily="Ubuntu_500Medium">Night Owl</Text>
                            <Text color="white" textAlign="center" fontFamily="Ubuntu_400Regular" fontSize="md" mx="10">
                                Stop counting the stars and fall asleep with our help.
                            </Text>
                            <Box w="90%" mt="10">
                                <Button fontFamily="Ubuntu_400Regular" mt="3" py="4" mt="10" bg="#242850" _pressed={{ bg: '#1B1E3C', borderColor: '#1B1E3C' }} onPress={() => navigation.navigate('Login')}>Login</Button>
                                <Button fontFamily="Ubuntu_400Regular" mt="3" py="4" bg="#242850" _pressed={{ bg: '#1B1E3C', borderColor: '#1B1E3C' }} onPress={() => navigation.navigate('Registration')}>Register</Button>
                            </Box>
                        </Center>
                    </Box>
                </View>
            </View>
        </NativeBaseProvider>
    );
}

export default IntroScreen;