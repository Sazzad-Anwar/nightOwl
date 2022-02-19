import React, { useEffect, useRef, useState } from 'react';
import { View, Center, Box, Input, Button, Checkbox, Text, Heading, Avatar, Alert, Modal, ScrollView, FlatList, Pressable } from 'native-base';
import { useGlobalContext } from '../../context/GlobalContextProvider';
import Layout from '../../components/Layout';
import PostCard from '../../components/PostCard';
import { ActivityIndicator, Animated, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';

const HomeTabScreen = ({ navigation }) => {

    const [isActive, setIsActive] = useState('home-outline');
    const [isVisible, setIsVisible] = useState(false);
    const [cardHeight, setCardHeight] = useState(0);
    const { user, socket } = useGlobalContext()
    const { posts } = useGlobalContext()
    let flatListRef = useRef(null)
    const { height } = Dimensions.get('window');


    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id, 'connected');
        });

        socket.emit('test-event', ({
            message: 'Hello from client'
        }))

        socket.emit('test-event', (data) => {
            console.log(data)
        })

        socket.on("disconnect", () => {
            console.log(socket.id, 'disconnected');
        });

    }, [])

    const scrollToIndexFailed = (error) => {
        const offset = error.averageItemLength * error.index;
        flatListRef.scrollToOffset({ animated: true, offset });
        setTimeout(() => {
            if (flatListRef !== null) {
                flatListRef.scrollToIndex({
                    index: error.index,
                    animated: true,
                    offset
                });
            }
        }, 100); // You may choose to skip this line if the above typically works well because your average item height is accurate.
    }

    return (
        <Layout>
            <Box mx="2" mt="3" flexDir="row" justifyContent="space-between" alignItems="center">
                {user.photoUrl !== '' ?
                    <Pressable onPress={() => navigation.navigate('Profile')}>
                        <Avatar bg="#1B1E3C" alignSelf="center" size="12" source={{
                            uri: user.photoUrl
                        }} />
                    </Pressable>
                    :
                    <Pressable onPress={() => navigation.navigate('Profile')}>
                        <Avatar bg="#1B1E3C" alignSelf="center" size="12" >
                            {(user.userName).split('')[0].toUpperCase()}
                        </Avatar>
                    </Pressable>
                }
                <Button py="2.5" w="85%" _pressed={{ bg: "#1B1E3C" }} borderRadius="full" bg="#444dad" onPress={() => navigation.navigate('CreatePost')}>
                    What's on your mind ?
                </Button>
            </Box>
            {posts.length > 0 ?
                <View my="2">
                    <FlatList
                        contentContainerStyle={{ paddingTop: 50 }}
                        ref={flatListRef}
                        height="100%"
                        keyExtractor={(item) => item.id.toString()}
                        data={posts}
                        extraData={posts}
                        inverted={true}
                        viewabilityConfig={{
                            waitForInteraction: true,
                            itemViewAreaPercentThreshold: 50,
                        }}
                        getItemLayout={(data, index) => ({
                            length: cardHeight + 10,
                            offset: (cardHeight + 10) * index,
                            animated: true,
                            index,
                        })}
                        onScrollToIndexFailed={scrollToIndexFailed}
                        removeClippedSubviews={true}
                        maxToRenderPerBatch={10}
                        updateCellsBatchingPeriod={100}
                        initialNumToRender={10}
                        initialScrollIndex={posts.length - 1}
                        progressViewOffset={100}
                        onEndReachedThreshold={0.1}
                        renderItem={({ item }) => <PostCard item={item} setCardHeight={setCardHeight} navigation={navigation} />}
                    />
                </View> :
                <AppLoading />
            }

        </Layout>

    );
}

export default HomeTabScreen;