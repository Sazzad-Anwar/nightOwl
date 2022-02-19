import { Avatar, Box, Button, Center, Image, Input, Text, View } from 'native-base'
import React from 'react'
import { Dimensions } from 'react-native'
import Layout from '../components/Layout'
import { useGlobalContext } from '../context/GlobalContextProvider'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const Profile = ({ navigation }) => {

    const { width, height } = Dimensions.get('window');
    const { user } = useGlobalContext()

    return (
        <Layout>
            <View flexDir="row" py="2" alignItems="center">
                <Button onPress={() => navigation.goBack()} bg="transparent" _pressed={{ bg: '#1B1E3C' }}>
                    <Ionicons color="white" name="arrow-back-outline" size={25} />
                </Button>
                <Input
                    mx="3"
                    py="1"
                    pl="5"
                    placeholder="Search"
                    w="80%"
                    type="email"
                    color="white"
                    fontSize="md"
                    placeholderTextColor="white"
                    fontFamily="Ubuntu_400Regular"
                    _focus={{ borderColor: '#444dad' }}
                    onChangeText={text => setEmail(text)}
                    borderColor={"#444dad"}
                    maxWidth="400px"
                    borderRadius="50"
                />
            </View>
            <View h="250" position="relative">
                <Box>
                    <Image
                        zIndex="0"
                        source={{
                            uri: `https://picsum.photos/400`,
                        }}
                        alt="profile"
                        w={width}
                        h={height / 3.5}
                    />
                </Box>
                <Box position="absolute" top="35%" left="28%">
                    <Avatar bg="#1B1E3C" alignSelf="center" size={180} source={{
                        uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU`
                    }}></Avatar>
                </Box>
            </View>
            <View mt="8">
                <Center>
                    <Text fontSize="3xl" fontFamily="Ubuntu_500Medium" color="white">{user.userName}</Text>
                    <Text fontSize="lg" fontFamily="Ubuntu_500Medium" color="white">
                        Online media enthusiast
                    </Text>
                </Center>
                <View mx="3" mt="10" flexDir="row" alignItems="center" justifyContent="space-between">
                    <Button bg="#242850" _pressed={{ bg: "#1B1E3C" }}>
                        <Box flexDir="row">
                            <MaterialCommunityIcons color="white" name="plus-circle" size={20} />
                            <Text color="white" ml="2">Add Story</Text>
                        </Box>
                    </Button>
                    <Button bg="#242850" _pressed={{ bg: "#1B1E3C" }}>
                        <Box flexDir="row">
                            <MaterialCommunityIcons color="white" name="circle-edit-outline" size={20} />
                            <Text color="white" ml="2">Edit Profile</Text>
                        </Box>
                    </Button>
                    <Button bg="#242850" _pressed={{ bg: "#1B1E3C" }}>
                        <Box flexDir="row">
                            <MaterialCommunityIcons color="white" name="dots-horizontal" size={20} />
                        </Box>
                    </Button>
                </View>
            </View>
        </Layout>
    )
}

export default Profile