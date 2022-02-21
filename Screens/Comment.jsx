import { Avatar, Box, Button, Icon, Input, ScrollView, Text, View } from 'native-base';
import React, { useRef, useState } from 'react'
import Layout from '../components/Layout'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useGlobalContext } from '../context/GlobalContextProvider';
import { Users } from '../StaticDB/Users';

const Comment = ({ navigation, route }) => {
    // let { item } = route.params;
    // let { posts } = useGlobalContext();

    const inputRef = useRef();
    const [isLiked, setIsLiked] = useState(false);
    const [postComment, setPostComment] = useState('');
    const [isPostCommentLiked, setIsPostCommentLiked] = useState(false);

    return (
        <Layout>
            <View flexDir="row" justifyContent="space-between" alignItems="center">
                <Button textAlign="left" onPress={() => navigation.goBack()} bg="transparent" _pressed={{ bg: '#1B1E3C' }}>
                    <Box flexDir="row">
                        <Ionicons color="white" name="arrow-back-outline" size={25} />
                        <Text color="white">Back</Text>
                    </Box>
                </Button>
                <Box flexDir="row" alignItems="center">
                    <Ionicons name="happy-outline" color="white" size={18} />
                    <Text fontSize="xs" mx="2" color="white">200</Text>
                </Box>
                <Button textAlign="right" bg="transparent" _pressed={{ bg: '#1B1E3C' }}>
                    <Box flexDir="row">
                        <MaterialCommunityIcons color="white" name="thumb-up-outline" size={25} />
                    </Box>
                </Button>
            </View>
            <ScrollView mt="3" mb="20">
                {[...Array(5)].map((_, index) => (
                    <Box key={'person-' + index} px="2" flexDir="row">
                        {Users[index].avatarUrl !== '' ?
                            <Avatar bg="#1B1E3C" size="8" source={{
                                uri: Users[index].avatarUrl
                            }} /> :
                            <Avatar bg="#1B1E3C" size="8" >
                                {(Users[index].fullName).split('')[0].toUpperCase()}
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

export default Comment;