import { StatusBar, TouchableOpacity } from 'react-native';
import { Avatar, Box, Button, FlatList, Icon, Input, Pressable, Text, View } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { Ionicons } from '@expo/vector-icons';

const MessageScreen = ({ navigation }) => {

    const data = [{
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        fullName: "Aafreen Khan",
        timeStamp: "12:47 PM",
        recentText: "Good Day!",
        avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }, {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        fullName: "Sujitha Mathur",
        timeStamp: "11:11 PM",
        recentText: "Cheer up, there!",
        avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        fullName: "Anci Barroco",
        timeStamp: "6:22 PM",
        recentText: "Good Day!",
        avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
    }, {
        id: "68694a0f-3da1-431f-bd56-142371e29d72",
        fullName: "Aniket Kumar",
        timeStamp: "8:56 PM",
        recentText: "All the best",
        avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
    }, {
        id: "28694a0f-3da1-471f-bd96-142456e29d72",
        fullName: "Kiara",
        timeStamp: "12:47 PM",
        recentText: "I will call today.",
        avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
    }, {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1",
        fullName: "Aafreen Khan",
        timeStamp: "12:47 PM",
        recentText: "Good Day!",
        avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }, {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f632",
        fullName: "Sujitha Mathur",
        timeStamp: "11:11 PM",
        recentText: "Cheer up, there!",
        avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d723",
        fullName: "Anci Barroco",
        timeStamp: "6:22 PM",
        recentText: "Good Day!",
        avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
    }, {
        id: "68694a0f-3da1-431f-bd56-142371e29d724",
        fullName: "Aniket Kumar",
        timeStamp: "8:56 PM",
        recentText: "All the best",
        avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
    }, {
        id: "28694a0f-3da1-471f-bd96-142456e29d725",
        fullName: "Kiara",
        timeStamp: "12:47 PM",
        recentText: "I will call today.",
        avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
    }];

    const [userData, setUserData] = useState(data);
    const [search, setSearch] = useState('');

    const searchHandler = (text) => {
        setSearch(text);
        let searchData = data.filter(item => item.fullName.toLowerCase().includes(text.toLowerCase()));
        if (searchData.length > 0) {
            setUserData(searchData);
        }
    }

    return (
        <Layout>
            <View mx="3" mt="1">
                <Box flexDir="row" alignItems="center" justifyContent="space-between">
                    <Box flexDir="row" alignItems="center">
                        <Avatar bg="#1B1E3C" size="sm" source={{
                            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                        }}></Avatar>
                        <Text color="white" ml="3" fontSize="2xl" fontWeight="bold">Chats</Text>
                    </Box>
                    <Box flexDir="row" alignItems="center">
                        <Button borderRadius="50" py="2.5" bg="#1B1E3C" mr='2'>
                            <Ionicons name="camera-outline" size={20} color="white" />
                        </Button>
                        <Button borderRadius="50" py="2.5" bg="#1B1E3C" mr='2'>
                            <Ionicons name="pencil-outline" size={20} color="white" />
                        </Button>
                    </Box>
                </Box>

                <Input
                    my="2"
                    bg="#1B1E3C"
                    placeholder="Search"
                    ontSize="lg"
                    color="white"
                    fontSize="md"
                    value={search}
                    borderColor="#1B1E3C"
                    onChangeText={text => searchHandler(text)}
                    _focus={{ borderColor: '#1B1E3C' }}
                    borderRadius="full"
                    InputLeftElement={<Icon color="white" size="sm" mx="3" as={<Ionicons name="search-outline" />} />}
                />

                <Box mt="2">
                    <FlatList
                        data={userData}
                        renderItem={({ item }) => (
                            <TouchableOpacity key={item.id} onPress={() => navigation.navigate({
                                name: 'Chat',
                                params: item,
                            })}>
                                <Box bg="#020629" w="100%" px="3" py="3" borderRadius="xl" flexDir="row" alignItems="center" justifyContent="space-between" mb="2">
                                    <Box flexDir="row" alignItems="center">
                                        <Avatar bg="#1B1E3C" size="md" source={{
                                            uri: item.avatarUrl
                                        }}>
                                            {((item.fullName).split(' ')[0]).split('')[0].toUpperCase() + ((item.fullName).split(' ')[0]).split('')[1].toUpperCase()}
                                            <Avatar.Badge bg="green.500" />
                                        </Avatar>
                                        <Box ml="3">
                                            <Text fontSize="lg" fontWeight="bold" color="white">{item.fullName}</Text>
                                            <Text fontSize="sm" color="white">{item.recentText}</Text>
                                        </Box>
                                    </Box>
                                    <Box mr="3">
                                        <Text fontSize="sm" color="white">{item.timeStamp}</Text>
                                    </Box>
                                </Box>
                            </TouchableOpacity>
                        )}
                    />

                </Box>

            </View>
        </Layout>
    );
}

export default MessageScreen;