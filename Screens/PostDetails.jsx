import { Avatar, Box, Button, Icon, Input, ScrollView, Text, View } from 'native-base';
import React, { useRef, useState } from 'react'
import Layout from '../components/Layout'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useGlobalContext } from '../context/GlobalContextProvider';

const PostDetails = ({ navigation, route }) => {
    let { item } = route.params;
    let { posts } = useGlobalContext();
    let post = posts.find(post => post.id === item);

    const inputRef = useRef();
    const [isLiked, setIsLiked] = useState(false);
    const [postComment, setPostComment] = useState('');
    const [isPostCommentLiked, setIsPostCommentLiked] = useState(false);

    return (
        <Layout>
            <Button justifyContent="flex-start" onPress={() => navigation.goBack()} bg="transparent" _pressed={{ bg: '#1B1E3C' }}>
                <Box flexDir="row">
                    <Ionicons color="white" name="arrow-back-outline" size={25} />
                    <Text color="white">Back</Text>
                </Box>
            </Button>
            <View onPress={() => navigation.navigate({
                name: 'UserProfile',
                params: item.user
            })} my="2" borderRadius="5" bg="#020629">
                <Box p="2.5" flexDir="row" alignItems="center">
                    {post.user.photoUrl !== '' ?
                        <Avatar bg="#1B1E3C" alignSelf="center" size="12" source={{
                            uri: post.user.photoUrl
                        }} /> :
                        <Avatar bg="#1B1E3C" alignSelf="center" size="12" >
                            {(post.user.userName).split('')[0].toUpperCase()}
                        </Avatar>
                    }
                    <Box ml="2">
                        <Text fontSize="lg" color="white">{post.user.userName}</Text>
                        <Box flexDir="row" alignItems="center">
                            <Text fontSize="10" color="white">
                                {moment().startOf(post.createdAt).fromNow()}
                            </Text>
                            <Box px="2">
                                <Ionicons mb="0" name="globe-outline" size={13} color="white" />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box my="2" w="100%" style={{ height: 0.2 }} bg="#6c75e0" />
                <Box flexDir="row" justifyContent="center" alignItems="center" textAlign="center" px="3" py="4" w="100%" minH="200" bg={post.bg}>
                    <Text fontWeight="semibold" fontSize="20" color="white">{post.postData}</Text>
                </Box>
                <Box my="2" py='.2' w="100%" style={{ height: 0.1 }} bg="#6c75e0" />
                <Box p="2" pt="0" flexDir="row" justifyContent="space-between" alignItems="center">
                    <Box flexDir="row" alignItems="center">
                        <Ionicons name="happy-outline" size={18} color="white" />
                        <Text pl="1" fontSize="10" color="white">200</Text>
                    </Box>
                    <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
                        <Box flexDir="row" alignItems="center">
                            <MaterialCommunityIcons name={isLiked ? "thumb-up" : "thumb-up-outline"} size={20} color="white" />
                            <Text pl="1" color="white">Like</Text>
                        </Box>
                    </TouchableOpacity>
                </Box>
            </View>
            <ScrollView mt="3" mb="20">
                {[...Array(5)].map((_, index) => (
                    <Box key={'person-' + index} px="2" flexDir="row">
                        {post.user.photoUrl !== '' ?
                            <Avatar bg="#1B1E3C" size="8" source={{
                                uri: post.user.photoUrl
                            }} /> :
                            <Avatar bg="#1B1E3C" size="8" >
                                {(post.user.userName).split('')[0].toUpperCase()}
                            </Avatar>
                        }
                        <Box ml="2" w="85%">
                            <Box p="3" bg="#020629" borderRadius="10" >
                                <Text fontFamily="Ubuntu_400Regular" color="white">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio accusantium quia laborum necessitatibus veniam voluptate, commodi deserunt! Ab, fuga rem!
                                </Text>
                            </Box>
                            <Box flexDir="row" justifyContent="space-between" alignItems="center">
                                <Button onPress={() => setIsPostCommentLiked(!isPostCommentLiked)} bg="transparent" _pressed={{ bg: '#242850' }}>
                                    <Box>
                                        <Text color="white" fontFamily="Ubuntu_400Regular">{isPostCommentLiked ? "Liked" : "Like"}</Text>
                                    </Box>
                                </Button>
                                <Button onPress={() => inputRef.current.focus()} bg="transparent" _pressed={{ bg: '#242850' }}>
                                    <Box>
                                        <Text color="white" fontFamily="Ubuntu_400Regular">Comment</Text>
                                    </Box>
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </ScrollView>
            <View position="absolute" bottom='0'>
                <Box flexDir="row" justifyContent="space-between" alignItems="center">
                    <Input
                        ref={inputRef}
                        my="2"
                        bg="#242850"
                        placeholder="Type a message"
                        ontSize="lg"
                        w="85%"
                        color="white"
                        fontSize="md"
                        autoFocus={true}
                        value={postComment}
                        borderColor="#242850"
                        _focus={{ borderColor: '#242850' }}
                        borderRadius="full"
                        onChangeText={text => setPostComment(text)}
                        InputLeftElement={<Icon color="white" size="sm" mx="3" as={<Ionicons name="happy-outline" />} />}
                    />
                    <Button borderRadius="50" py="2.5" bg="#242850" mr='2'>
                        <Ionicons name="send-outline" size={18} color="white" />
                    </Button>
                </Box>
            </View>
        </Layout>
    )
}

export default PostDetails;