import React, { useEffect, useRef, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { NativeBaseProvider, Center, Box, Input, Button, Checkbox, Text, Heading, Avatar, Alert, Modal, ScrollView } from 'native-base';
import { loginStyles } from '../Styles/Login';
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

const Layout = ({ children }) => {

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
        return <NativeBaseProvider>
            <View style={loginStyles.container}>
                <StatusBar backgroundColor='#242850' />
                <View style={loginStyles.upperBody} />
                <View style={loginStyles.lowerBody} />
                <Box position="absolute" fontFamily="Ubuntu_400Regular" w='100%' top="0" h="100%" left="0" right="0" zIndex="4">
                    <AppLoading />
                </Box>
            </View>
        </NativeBaseProvider>;
    }

    return (
        <NativeBaseProvider>
            <View style={loginStyles.container}>
                <StatusBar backgroundColor='#242850' />
                <View style={loginStyles.upperBody} />
                <View style={loginStyles.lowerBody} />
                <Box position="absolute" fontFamily="Ubuntu_400Regular" w='100%' top="0" h="100%" left="0" right="0" zIndex="4">
                    {children}
                </Box>
            </View>
        </NativeBaseProvider>
    );
}


export default Layout;