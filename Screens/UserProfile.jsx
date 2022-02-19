import { Avatar, Box, Button, Center, Image, Input, Text, View } from 'native-base'
import React from 'react';
import { Dimensions } from 'react-native'
import Layout from '../components/Layout';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const UserProfile = ({ navigation, route }) => {

    let user = route.params;
    const { width, height } = Dimensions.get('window');

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
                        uri: user.photoUrl
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
                <Box mt="2" flexDir="row" justifyContent="center" alignItems="center">
                    <Box flexDir="row" alignItems="center">
                        <Text color="white" fontSize="md" fontFamily="Ubuntu_500Medium">200</Text>
                        <Text ml="1" color="white" fontSize="sm">followers</Text>
                    </Box>
                    <Box p="1" mx="1" style={{ height: .2, width: .2 }} color="white" bg="white" borderRadius="full" />
                    <Box flexDir="row" alignItems="center">
                        <Text color="white" fontSize="md" fontFamily="Ubuntu_500Medium">300</Text>
                        <Text ml="1" color="white" fontSize="sm">following</Text>
                    </Box>
                </Box>
                <View mx="3" mt="10" flexDir="row" alignItems="center" justifyContent="space-between">
                    <Button bg="#242850" _pressed={{ bg: "#1B1E3C" }}>
                        <Box flexDir="row">
                            <MaterialCommunityIcons color="white" name="account-plus" size={20} />
                            <Text color="white" ml="2">Add Friend</Text>
                        </Box>
                    </Button>
                    <Button bg="#242850" _pressed={{ bg: "#1B1E3C" }}>
                        <Box flexDir="row">
                            <MaterialCommunityIcons color="white" name="facebook-messenger" size={20} />
                            <Text color="white" ml="2">Message</Text>
                        </Box>
                    </Button>
                    <Button bg="#242850" _pressed={{ bg: "#1B1E3C" }}>
                        <Box flexDir="row">
                            <MaterialCommunityIcons color="white" name="dots-horizontal" size={20} />
                        </Box>
                    </Button>
                </View>
                <Box my="2" w="100%" style={{ height: 0.2 }} bg="#6c75e0" />
            </View>
        </Layout>
    );
}


export default UserProfile;