import React, { createContext, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import userReducer from './Reducers/UserReducer';
import { io } from "socket.io-client";
const GlobalContext = createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';
import postReducer from './Reducers/PostReducer';
import { Colors } from '../StaticDB/ColorCode';
import { Users } from '../StaticDB/Users'
export const useGlobalContext = () => useContext(GlobalContext);
// let SOCKET_ENDPOINT = 'https://socket-sdk.herokuapp.com/chat'
let SOCKET_ENDPOINT = 'http://localhost:4000/api'

let initialState = {
    user: {},
    posts: []
};


const GlobalContextProvider = ({ children }) => {

    let socketRef = useRef(null)

    useEffect(() => {

        socketRef.current = io(SOCKET_ENDPOINT, {
            transports: ['websocket'], jsonp: false
        })

        const getUser = async () => {
            const user = await AsyncStorage.getItem('user');
            initialState.user = JSON.parse(user)
        }
        getUser()

    }, [])


    Users.map(user => {
        initialState.posts.push({
            "bg": Colors[parseInt(Math.random() * Colors.length)].hex,
            "createdAt": '2022-02-19T11:29:10.767Z',
            "id": (Math.ceil(Math.random() * Colors.length)).toString() + (Math.ceil(Math.random() * Colors.length)).toString() + user.id,
            "isPublic": true,
            "postData": user.recentText,
            "user": {
                "email": user.fullName.split(' ')[0].toLowerCase() + '@gmail.com',
                "isLoggedIn": true,
                "photoUrl": user.avatarUrl,
                "userName": user.fullName,
            },
        })
    })

    const [user, userDispatch] = useReducer(userReducer, initialState.user);
    const [posts, postDispatch] = useReducer(postReducer, initialState.posts)

    return (
        <GlobalContext.Provider value={{ user, userDispatch, socket: socketRef.current, posts, postDispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;