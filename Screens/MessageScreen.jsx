import { StatusBar, TouchableOpacity } from 'react-native';
import { Avatar, Box, Button, FlatList, Icon, Input, Pressable, Text, View } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { Ionicons } from '@expo/vector-icons';
import { Users } from '../StaticDB/Users';

const MessageScreen = ({ navigation }) => {


    const [userData, setUserData] = useState(Users);
    const [search, setSearch] = useState('');
    let flatListRef;

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
                        ref={(ref) => flatListRef = ref}
                        contentContainerStyle={{ paddingTop: 200 }}
                        keyExtractor={(item) => item.id.toString()}
                        extraData={userData}
                        data={userData}
                        inverted={true}
                        removeClippedSubviews={true}
                        maxToRenderPerBatch={10}
                        updateCellsBatchingPeriod={100}
                        initialNumToRender={10}
                        initialScrollIndex={userData.length - 1}
                        progressViewOffset={100}
                        onEndReachedThreshold={0.1}
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