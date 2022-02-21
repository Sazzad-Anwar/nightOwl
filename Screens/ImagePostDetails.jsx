import { Avatar, Box, Button, FlatList, Image, NativeBaseProvider, ScrollView, Text, View } from 'native-base'
import React, { useState } from 'react'
import moment from 'moment';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions, TouchableOpacity } from 'react-native';
import Layout from '../components/Layout';


const ImagePostDetails = ({ route, navigation }) => {

    let item = route.params;

    const [isLiked, setIsLiked] = useState(false);

    const { height, width } = Dimensions.get('window');

    return (

        <Layout>
            <View flexDir="row" justifyContent="space-between" alignItems="center">
                <Button textAlign="left" onPress={() => navigation.goBack()} bg="transparent" _pressed={{ bg: '#1B1E3C' }}>
                    <Box flexDir="row">
                        <Ionicons color="white" name="arrow-back-outline" size={25} />
                        <Text color="white">Back</Text>
                    </Box>
                </Button>
            </View>
            <View my="2" borderRadius="5" bg="#020629">
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate({
                        name: 'UserProfile',
                        params: item.user
                    })}>

                        <Box p="2.5" flexDir="row" alignItems="center">
                            {item.user.photoUrl !== '' ?
                                <Avatar bg="#1B1E3C" alignSelf="center" size="12" source={{
                                    uri: item.user.photoUrl
                                }} /> :
                                <Avatar bg="#1B1E3C" alignSelf="center" size="12" >
                                    {(item.user.userName).split('')[0].toUpperCase()}
                                </Avatar>
                            }
                            <Box ml="2">
                                <Text onPress={() => navigation.navigate({
                                    name: 'UserProfile',
                                    params: item.user
                                })} fontSize="lg" color="white">{item.user.userName}</Text>
                                <Box flexDir="row" alignItems="center">
                                    <Text fontSize="10" color="white">
                                        {moment().startOf(item.createdAt).fromNow()}
                                    </Text>
                                    <Box px="2">
                                        <Ionicons mb="0" name="globe-outline" size={13} color="white" />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </TouchableOpacity>
                    <Box my="2" w="100%" style={{ height: 0.2 }} bg="#6c75e0" />
                    <Box mb="0" mb="3" w="100%" bg={item.images.length ? 'transparent' : item.bg}>
                        <Text mx="2" mt="3" fontFamily="Ubuntu_400Regular" fontSize={12} color="white">
                            {item.postDataDetails}
                        </Text>
                    </Box>
                    <Box p="2" pb="0" flexDir="row" justifyContent="space-between" alignItems="center">
                        <Box flexDir="row" alignItems="center">
                            <MaterialCommunityIcons name="thumb-up-outline" size={18} color="white" />
                            <Text pl="1" fontSize="10" color="white">200</Text>
                        </Box>
                        <Box flexDir="row" alignItems="center">
                            <Text pr="1" fontSize="10" color="white">21 comments</Text>
                            <Box p="1" mx="1" style={{ height: .2, width: .2 }} color="white" bg="white" borderRadius="full" />
                            <Text pr="1" fontSize="10" color="white">21 shares</Text>
                        </Box>
                    </Box>
                    <Box my="2" py='.2' w="100%" style={{ height: 0.1 }} bg="#6c75e0" />
                    <Box p="2" pt="0" flexDir="row" justifyContent="space-between" alignItems="center">
                        <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
                            <Box flexDir="row" alignItems="center">
                                <MaterialCommunityIcons name={isLiked ? "thumb-up" : "thumb-up-outline"} size={20} color="white" />
                                <Text pl="1" color="white">Like</Text>
                            </Box>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate({
                            name: 'Comment',
                            params: {
                                item: item.id
                            }
                        })}>
                            <Box flexDir="row" alignItems="center">
                                <MaterialCommunityIcons name="comment" size={20} color="white" />
                                <Text pl="1" color="white">Comment</Text>
                            </Box>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Box flexDir="row" alignItems="center">
                                <MaterialCommunityIcons name="share" size={20} color="white" />
                                <Text pl="1" color="white">Share</Text>
                            </Box>
                        </TouchableOpacity>
                    </Box>
                </View>

                {item.images.length > 0 ?
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 310 }}
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        data={item.images}
                        keyExtractor={(item) => item.url.regular + '-' + parseInt(Math.random() * 100000)}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate({
                                    name: 'ViewFullImage',
                                    params: {
                                        urls: item.url,
                                        isMyDay: false
                                    }
                                })
                            }}>
                                <Box>
                                    <Image source={{
                                        uri: item.url.small,
                                        height: 400,
                                        width: width / 2
                                    }}
                                        alt="Alternate Text"
                                        size="xl"
                                        w={width}
                                        h={400}
                                        borderTopLeftRadius={8}
                                        borderTopRightRadius={8}
                                    />
                                    <Box p="2" pb="0" flexDir="row" justifyContent="space-between" alignItems="center">
                                        <Box flexDir="row" alignItems="center">
                                            <MaterialCommunityIcons name="thumb-up-outline" size={18} color="white" />
                                            <Text pl="1" fontSize="10" color="white">200</Text>
                                        </Box>
                                        <Box flexDir="row" alignItems="center">
                                            <Text pr="1" fontSize="10" color="white">21 comments</Text>
                                            <Box p="1" mx="1" style={{ height: .2, width: .2 }} color="white" bg="white" borderRadius="full" />
                                            <Text pr="1" fontSize="10" color="white">21 shares</Text>
                                        </Box>
                                    </Box>
                                    <Box my="2" py='.2' w="100%" style={{ height: 0.1 }} bg="#6c75e0" />
                                    <Box p="2" pt="0" flexDir="row" justifyContent="space-between" alignItems="center">
                                        <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
                                            <Box flexDir="row" alignItems="center">
                                                <MaterialCommunityIcons name={isLiked ? "thumb-up" : "thumb-up-outline"} size={20} color="white" />
                                                <Text pl="1" color="white">Like</Text>
                                            </Box>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => navigation.navigate({
                                            name: 'Comment',
                                            params: {
                                                item: item.id
                                            }
                                        })}>
                                            <Box flexDir="row" alignItems="center">
                                                <MaterialCommunityIcons name="comment" size={20} color="white" />
                                                <Text pl="1" color="white">Comment</Text>
                                            </Box>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Box flexDir="row" alignItems="center">
                                                <MaterialCommunityIcons name="share" size={20} color="white" />
                                                <Text pl="1" color="white">Share</Text>
                                            </Box>
                                        </TouchableOpacity>
                                    </Box>
                                </Box>
                            </TouchableOpacity>
                        )}
                    /> : null}
            </View>
        </Layout>
    )
}

export default ImagePostDetails;