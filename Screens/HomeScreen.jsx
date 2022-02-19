import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeTabScreen from './Tabs/HomeTabScreen';
import { Box, Button, NativeBaseProvider, Text } from 'native-base';
import VideoTabScreen from './Tabs/VideoTabScreen';
import PagesTabScreen from './Tabs/PagesTabScreen';
import GamesTabScreen from './Tabs/GamesTabScreen';
import NotificationsTabScreen from './Tabs/NotificationsTabScreen';
import MenuTabScreen from './Tabs/MenuTabScreen';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = ({ navigation }) => {

    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const [search, setSearch] = useState('')

    return (
        <NativeBaseProvider>
            <Box px="3" bg="#242850" flexDir="row" justifyContent="space-between" alignItems="center">
                <Text fontSize="2xl" fontWeight="bold" fontFamily="Ubuntu_500Medium" color="white">NightOwl</Text>
                <Box flexDir="row" alignItems="center">
                    <Button borderRadius="10" _pressed={{ bg: '#1B1E3C', color: '#242850' }} bg="transparent" mr='2' onBlur={() => setIsSearchClicked(false)} onPress={() => setIsSearchClicked(true)}>
                        <Ionicons name="search-outline" size={25} color="#6c75e0" />
                    </Button>
                    <Button borderRadius="10" _pressed={{ bg: '#1B1E3C', color: '#242850' }} bg="transparent" onPress={() => navigation.navigate('ChatList')}>
                        <Ionicons name="chatbubble-ellipses-outline" size={25} color="#6c75e0" />
                    </Button>
                </Box>
            </Box>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        size = 25;
                        if (route.name === 'HomeTab') {
                            iconName = 'home-outline'
                        } else if (route.name === 'Videos') {
                            iconName = 'logo-youtube'
                        } else if (route.name === 'Pages') {
                            iconName = 'flag-outline'
                        } else if (route.name === 'Games') {
                            iconName = 'game-controller-outline'
                        } else if (route.name === 'Notifications') {
                            iconName = 'notifications-outline'
                        } else if (route.name === 'Menu') {
                            iconName = 'menu-outline'
                        }

                        // You can return any component that you like here!

                        return <Box borderRadius="10" p="0">
                            <Ionicons name={iconName} size={size} color={color} />
                        </Box>;
                    },
                    tabBarActiveTintColor: '#fff',
                    tabBarInactiveTintColor: '#6c75e0',
                    tabBarStyle: { backgroundColor: '#242850' },
                })}
            >
                <Tab.Screen name="HomeTab" component={HomeTabScreen} />
                <Tab.Screen name="Videos" component={VideoTabScreen} />
                <Tab.Screen name="Pages" component={PagesTabScreen} />
                <Tab.Screen name="Games" component={GamesTabScreen} />
                <Tab.Screen name="Notifications" component={NotificationsTabScreen} />
                <Tab.Screen name="Menu" component={MenuTabScreen} />
            </Tab.Navigator>
        </NativeBaseProvider>
    );
}


export default HomeScreen;