import React, { useEffect, useRef, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { NativeBaseProvider, Center, Box, Input, Button, Checkbox, Text, Heading, Avatar, Alert, Modal, ScrollView } from 'native-base';
import { loginStyles } from '../Styles/Login';

const Layout = ({ children }) => {
    return (
        <NativeBaseProvider>
            <View style={loginStyles.container}>
                <StatusBar backgroundColor='#242850' />
                <View style={loginStyles.upperBody} />
                <View style={loginStyles.lowerBody} />
                <Box position="absolute" w='100%' top="0" h="100%" left="0" right="0" zIndex="4">
                    {children}
                </Box>
            </View>
        </NativeBaseProvider>
    );
}


export default Layout;