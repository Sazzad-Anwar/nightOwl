import { Avatar, Box, Button, FlatList, Icon, Input, Text } from 'native-base';
import Layout from '../components/Layout';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

const ChatScreen = ({ route, navigation }) => {

    const { id, fullName, timeStamp, recentText, avatarUrl } = route.params;
    let msgArea;
    const [message, setMessage] = useState('');
    const [chatArray, setChatArray] = useState([
        {
            id: Date.now(),
            message: recentText,
            sender: fullName
        }
    ]);

    const messageSendHandler = () => {
        if (message !== '') {
            setMessage('');
            setChatArray([...chatArray, { id: Date.now(), sender: 'me', message: message }]);
            msgArea.scrollToIndex({
                index: chatArray.length - 1,
                animated: true
            });
        }
    }

    return (
        <Layout>
            <Box mx="3" mt="1" flexDir="row" justifyContent="space-between" alignItems="center">
                <Box flexDir="row" alignItems="center">
                    <Ionicons onPress={() => navigation.goBack()} name="arrow-back-outline" size={25} color="white" />
                    <Avatar bg="#1B1E3C" size="sm" ml="2" source={{
                        uri: avatarUrl
                    }}>
                        {((fullName).split(' ')[0]).split('')[0].toUpperCase() + ((fullName).split(' ')[0]).split('')[1].toUpperCase()}
                        <Avatar.Badge bg="green.500" />
                    </Avatar>
                    <Box ml="3">
                        <Text fontSize="sm" fontWeight="bold" color="white">{fullName}</Text>
                        <Text fontSize="xs" color="white">{timeStamp}</Text>
                    </Box>
                </Box>
                <Box flexDir="row" alignItems="center" justifyContent='space-between'>
                    <Button borderRadius="50" py="2.5" bg="#1B1E3C" mr='2'>
                        <Ionicons name="call-outline" size={15} color="white" />
                    </Button>
                    <Button borderRadius="50" py="2.5" bg="#1B1E3C" mr='2'>
                        <Ionicons name="videocam-outline" size={15} color="white" />
                    </Button>
                    <Button borderRadius="50" py="2.5" bg="#1B1E3C" mr='2'>
                        <Ionicons name="information-outline" size={15} color="white" />
                    </Button>
                </Box>
            </Box>

            <Box flex="1">
                <FlatList
                    contentContainerStyle={{
                        marginBottom: 50
                    }}
                    keyExtractor={(item) => item.id.toString()}
                    ref={(ref) => msgArea = ref}
                    extraData={chatArray}
                    data={chatArray}
                    renderItem={({ item }) => {
                        if (item.sender === 'me') {
                            return (
                                <Box key={item.message} my="2" mr="2" flexDir="row" justifyContent="flex-end" w="100%" alignItems="flex-start">
                                    <Box mr="2" maxW="80%">
                                        <Box bg="#020629" px="3" py="2" borderRadius="10">
                                            <Text fontSize="sm" color="white">
                                                {item.message}
                                            </Text>
                                        </Box>
                                        <Text mr="2" textAlign="right" fontSize="xs" color="white">{new Date().toLocaleTimeString('en-Us', {
                                            hour: 'short',
                                            minute: 'short',
                                        })}</Text>
                                    </Box>
                                    <Box style={{ marginBottom: 20 }} />
                                </Box>
                            )
                        } else {
                            return (
                                <Box key={item.message} my="2" mx="2" flexDir="row" w="100%" alignItems="flex-start">
                                    <Avatar bg="#1B1E3C" size="sm" ml="2" source={{
                                        uri: avatarUrl
                                    }}>
                                        {((fullName).split(' ')[0]).split('')[0].toUpperCase() + ((fullName).split(' ')[0]).split('')[1].toUpperCase()}
                                    </Avatar>
                                    <Box ml="2" maxW="80%">
                                        <Box bg="#020629" px="3" py="2" borderRadius="10">
                                            <Text fontSize="sm" color="white">{recentText}</Text>
                                        </Box>
                                        <Text ml="2" fontSize="xs" color="white">{new Date().toLocaleTimeString('en-Us', {
                                            hour: 'short',
                                            minute: 'short',
                                        })}</Text>
                                    </Box>
                                </Box>
                            )
                        }
                    }}
                />
            </Box>
            <Box mx='2'>
                <Box flexDir="row" justifyContent="space-between" alignItems="center">
                    <Input
                        my="2"
                        bg="#242850"
                        placeholder="Type a message"
                        ontSize="lg"
                        w="85%"
                        color="white"
                        fontSize="md"
                        value={message}
                        borderColor="#242850"
                        _focus={{ borderColor: '#242850' }}
                        borderRadius="full"
                        onChangeText={text => setMessage(text)}
                        InputLeftElement={<Icon color="white" size="sm" mx="3" as={<Ionicons name="happy-outline" />} />}
                    />
                    {message ?
                        <Button onPress={messageSendHandler} borderRadius="50" py="2.5" bg="#242850" mr='2'>
                            <Ionicons name="send-outline" size={18} color="white" />
                        </Button>
                        : <Button borderRadius="50" py="2.5" bg="#242850" mr='2'>
                            <Ionicons name="thumbs-up-outline" size={18} color="white" />
                        </Button>
                    }

                </Box>
            </Box>
        </Layout>
    );
}


export default ChatScreen;