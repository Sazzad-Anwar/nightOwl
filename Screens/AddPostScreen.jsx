import { Avatar, Box, Button, FlatList, HStack, KeyboardAvoidingView, ScrollView, Text, TextArea, View } from 'native-base';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalContext } from '../context/GlobalContextProvider';
import { Colors } from '../StaticDB/ColorCode';
import { TouchableOpacity } from 'react-native';
import { POST_CREATED } from '../context/Constants/PostConstants';
import { Snackbar } from 'react-native-paper';


const AddPostScreen = ({ navigation }) => {

    const { user, postDispatch } = useGlobalContext()
    const [selectedColor, setSelectedColor] = useState('#1B1E3C')
    const [postText, setPostText] = useState('')
    const [visible, setVisible] = useState(false)

    const postHandler = () => {
        if (postText.length > 0) {
            postDispatch({
                type: POST_CREATED,
                payload: {
                    id: (Math.random() * 10000000000).toString(),
                    postData: postText,
                    user,
                    bg: selectedColor,
                    createdAt: new Date(),
                    isPublic: true
                }
            })
            navigation.navigate('HomeTab')
        } else {
            setVisible(true)
        }
    }

    return (
        <Layout>
            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 4,
                    backgroundColor: '#242850'
                }}
                action={{
                    label: 'OK',
                    onPress: () => {
                        setVisible(false)
                    },
                }}>
                <Text color="white" fontSize="18" textAlign="center">Write Something to post</Text>
            </Snackbar>
            <View flex="1">
                <Box flexDir="row" mx="3" justifyContent="space-between" alignItems="center">
                    <Box flexDir="row" alignItems="center">
                        <TouchableOpacity>
                            <Ionicons onPress={() => navigation.goBack()} name="arrow-back-outline" size={25} color="white" />
                        </TouchableOpacity>
                        <Text fontSize="18" ml="4" color="#fff">Create Post</Text>
                    </Box>
                    <Button onPress={postHandler} bg="#1B1E3C" borderRadius="5" _pressed={{ bg: '#242850' }}>Post</Button>
                </Box>
                <Box my="2.5" w="100%" style={{ height: 0.2 }} bg="#6c75e0" />
                <View mx="3" flexDir="row" alignItems="center">
                    {user.photoUrl !== '' ?
                        <Avatar bg="#1B1E3C" alignSelf="center" size="12" source={{
                            uri: user.photoUrl
                        }} /> :
                        <Avatar bg="#1B1E3C" alignSelf="center" size="12" >
                            {(user.userName).split('')[0].toUpperCase()}
                        </Avatar>
                    }
                    <Box ml="2">
                        <Text fontSize="md" fontWeight="bold" color="white">{user.userName}</Text>
                        <Box flexDir="row" alignItems="center" mt="1">
                            <View px="3" mr="1" py="1.5" flexDir="row" alignItems="center" bg="#1B1E3C" borderRadius="5" _pressed={{ bg: '#242850' }}>
                                <Ionicons name="globe-outline" size={15} color="white" />
                                <Text ml="1" color="white">Public</Text>
                            </View>
                            <View px="3" mr="1" py="1.5" flexDir="row" alignItems="center" bg="#1B1E3C" borderRadius="5" _pressed={{ bg: '#242850' }}>
                                <Ionicons name="add-outline" size={15} color="white" />
                                <Text ml="1" color="white">Album</Text>
                            </View>
                            <View px="3" mr="1" py="1.5" flexDir="row" alignItems="center" bg="#1B1E3C" borderRadius="5" _pressed={{ bg: '#242850' }}>
                                <Ionicons name="logo-instagram" size={15} color="white" />
                            </View>
                        </Box>
                    </Box>
                </View>

                <View w="100%" my="3" h="82%">
                    <KeyboardAvoidingView h={{
                        base: "400px",
                        lg: "auto"
                    }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <TextArea value={postText} onChangeText={text => setPostText(text)} placeholderTextColor="white" borderWidth={0} borderColor="#1B1E3C" fontSize="20" textAlign='center' color="white" bg={selectedColor} h="400" _focus={{ borderWidth: 0 }} placeholder="What's on your mind?" w="100%" />
                    </KeyboardAvoidingView>

                    <View flex="1" justifyContent="flex-end" position="absolute" bg="#1B1E3C" py="2" left="0" right="0" bottom="0" w="100%" px="3">
                        <View flexDir="row" alignItems="center">
                            <FlatList
                                horizontal={true}
                                keyExtractor={(item) => item.hex.toString()}
                                extraData={Colors}
                                data={Colors}
                                renderItem={({ item }) => (
                                    <TouchableOpacity key={item.hex} onPress={() => setSelectedColor(item.hex)}>
                                        <Box h={10} w={10} bg={item.hex} borderRadius="6" mr="1.5" />
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Layout>
    );
}


export default AddPostScreen;