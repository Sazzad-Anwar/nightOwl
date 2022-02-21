import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useReducer, useState } from 'react';
import ChatScreen from '../Screens/ChatScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';
import HomeScreen from '../Screens/HomeScreen';
import IntroScreen from '../Screens/IntroScreen';
import LoginScreen from '../Screens/LoginScreen';
import MessageScreen from '../Screens/MessageScreen';
import RegistrationScreen from '../Screens/RegistrationScreen';
import { useGlobalContext } from '../context/GlobalContextProvider';
import AddPostScreen from '../Screens/AddPostScreen';
import Profile from '../Screens/Profile';
import Comment from '../Screens/Comment';
import UserProfile from '../Screens/UserProfile';
import ImagePostDetails from '../Screens/ImagePostDetails';
import ViewFullImage from '../Screens/ViewFullImage';

const Stack = createNativeStackNavigator();


const NavigationComponent = () => {

    const { user } = useGlobalContext()

    return (
        <>
            <Stack.Navigator initialRouteName={user?.isLoggedIn ? "Home" : "Intro"}>
                {!user.isLoggedIn ? <>
                    <Stack.Screen
                        name="Intro"
                        component={IntroScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            headerShown: false,
                            animation: 'fade_from_bottom'
                        }}
                    />
                    <Stack.Screen
                        name="Registration"
                        component={RegistrationScreen}
                        options={{
                            headerShown: false,
                            animation: 'fade_from_bottom'
                        }}
                    />
                    <Stack.Screen
                        name="ForgotPassword"
                        component={ForgotPasswordScreen}
                        options={{
                            headerShown: false,
                            animation: 'slide_from_right'
                        }}
                    />
                </> : <>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            headerShown: false,
                            animation: 'fade'
                        }}
                    />
                    <Stack.Screen
                        name="ChatList"
                        component={MessageScreen}
                        options={{
                            headerShown: false,
                            animation: 'slide_from_right'
                        }}
                    />
                    <Stack.Screen
                        name="Chat"
                        component={ChatScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="CreatePost"
                        component={AddPostScreen}
                        options={{
                            headerShown: false,
                            animation: 'slide_from_bottom'
                        }}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            headerShown: false,
                            animation: 'fade_from_bottom'
                        }}
                    />
                    <Stack.Screen
                        name="Comment"
                        component={Comment}
                        options={{
                            headerShown: false,
                            animation: 'slide_from_bottom'
                        }}
                    />
                    <Stack.Screen
                        name="UserProfile"
                        component={UserProfile}
                        options={{
                            headerShown: false,
                            animation: 'fade_from_bottom'
                        }}
                    />
                    <Stack.Screen
                        name="ImagePostDetails"
                        component={ImagePostDetails}
                        options={{
                            headerShown: false,
                            animation: 'slide_from_bottom'
                        }}
                    />
                    <Stack.Screen
                        name="ViewFullImage"
                        component={ViewFullImage}
                        options={{
                            headerShown: false,
                            animation: 'slide_from_bottom'
                        }}
                    />
                </>
                }

            </Stack.Navigator>
        </>
    )
}

export default NavigationComponent