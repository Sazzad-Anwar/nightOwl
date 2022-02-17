import React, { useEffect, useRef, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { NativeBaseProvider, Center, Box, Input, Button, Checkbox, Text, Heading, Avatar, Alert, Modal, ScrollView } from 'native-base';
import { loginStyles } from '../Styles/Login';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Ubuntu_500Medium
} from '@expo-google-fonts/ubuntu';

const HomeScreen = ({ navigation }) => {

    const [isActive, setIsActive] = useState('home-outline');
    const [isVisible, setIsVisible] = useState(false);
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const [search, setSearch] = useState('')

    let [fontsLoaded] = useFonts({
        Ubuntu_500Medium,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <NativeBaseProvider>
            <View style={loginStyles.container}>
                <StatusBar backgroundColor='#242850' />
                <View style={loginStyles.upperBody} />
                <View style={loginStyles.lowerBody} />
                <Box position="absolute" w='100%' top="0" h="100%" left="0" right="0" zIndex="4">
                    <Box mx="3" flexDir="row" justifyContent="space-between" alignItems="center">
                        <Text fontSize="2xl" fontWeight="bold" fontFamily="Ubuntu_500Medium" color="white">NightOwl</Text>
                        <Box flexDir="row" alignItems="center">
                            <Button borderRadius="10" bg="#1B1E3C" mr='2' onBlur={() => setIsSearchClicked(false)} onPress={() => setIsSearchClicked(true)}>
                                <Ionicons name="search-outline" size={25} color="white" />
                                {/* {isSearchClicked &&
                                    <Input
                                        mx="1"
                                        py="2"
                                        pl="5"
                                        placeholder="Search"
                                        w="85%"
                                        type="email"
                                        color="white"
                                        fontSize="md"
                                        onChangeText={text => setSearch(text)}
                                        borderColor={"#444dad"}
                                        maxWidth="400px"
                                    />
                                } */}

                            </Button>
                            <Button borderRadius="10" bg="#1B1E3C" onPress={() => navigation.navigate('ChatList')}>
                                <Ionicons name="chatbubble-ellipses-outline" size={25} color="white" />
                            </Button>
                        </Box>
                    </Box>
                    <Box flexDir="row" mx="3" mt="2" justifyContent="space-between" alignItems="center">
                        {['home-outline', 'logo-youtube', 'flag-outline', 'game-controller-outline', 'notifications-outline', 'menu-outline'].map((icon, index) => (
                            <Button onPress={() => setIsActive(icon)} key={icon} borderRadius="10" bg={isActive === icon ? "#1B1E3C" : "#3b428f"}>
                                <Ionicons name={icon} size={25} color="white" />
                            </Button>
                        ))}
                    </Box>
                    {isActive === 'home-outline' && (
                        <Box mx="3" mt="3" flexDir="row" justifyContent="space-between" alignItems="center">
                            <Avatar bg="green.500" alignSelf="center" size="10" source={{
                                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                            }}></Avatar>
                            {/* <Button variant="outline" borderRadius="20" style={{ backgroundColor: "#444dad", borderColor: "#444dad" }} _text={{ color: 'white' }} py="2" px="5" w="85%">What's on your mind ?</Button> */}
                            <Button py="2" w="85%" borderRadius="full" bg="#444dad" onPress={() => setIsVisible(true)}>
                                What's on your mind ?
                            </Button>
                            <Modal isOpen={isVisible} onClose={() => setIsVisible(false)} size="xl">
                                <Modal.Content style={{ backgroundColor: '#1B1E3C' }} maxH="100%">
                                    <Modal.CloseButton />
                                    <Modal.Body>
                                        <ScrollView>
                                            <Box my="7">
                                                <Text color="white">
                                                    Create a 'Return Request' under “My Orders” section of
                                                    App/Website. Follow the screens that come up after tapping on
                                                    the 'Return’ button. Please make a note of the Return ID that we
                                                    generate at the end of the process. Keep the item ready for pick
                                                    up or ship it to us basis on the return mode.
                                                </Text>
                                            </Box>
                                        </ScrollView>
                                    </Modal.Body>
                                    <Modal.Footer style={{ backgroundColor: '#1B1E3C' }}>
                                        <Button.Group space={2}>
                                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                                setModalVisible(false);
                                            }}>
                                                Cancel
                                            </Button>
                                            <Button onPress={() => {
                                                setModalVisible(false);
                                            }}>
                                                Save
                                            </Button>
                                        </Button.Group>
                                    </Modal.Footer>
                                </Modal.Content>
                            </Modal>
                        </Box>
                    )}
                </Box>
            </View>
        </NativeBaseProvider>
    );
}


export default HomeScreen;