import { Avatar, Box, Text, View } from 'native-base'
import React, { useState } from 'react'
import moment from 'moment';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const PostCard = ({ item, setCardHeight, navigation }) => {

    const [isLiked, setIsLiked] = useState(false);

    const onLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setCardHeight(height)
    }

    return (

        <View my="2" borderRadius="5" bg="#020629" onLayout={onLayout}>
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
            <Box flexDir="row" justifyContent="center" alignItems="center" textAlign="center" px="3" py="4" w="100%" minH="200" bg={item.bg}>
                <Text fontWeight="semibold" fontSize="20" color="white">{item.postData}</Text>
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
                    name: 'PostDetails',
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
    )
}

export default PostCard