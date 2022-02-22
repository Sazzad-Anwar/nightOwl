import React, { useEffect, useRef, useState } from 'react';
import { View, Center, Box, Input, Button, Checkbox, Text, Heading, Avatar, Alert, Modal, ScrollView, FlatList, Pressable, Image } from 'native-base';
import { useGlobalContext } from '../../context/GlobalContextProvider';
import Layout from '../../components/Layout';
import PostCard from '../../components/PostCard';
import { Dimensions, RefreshControl, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import EmptyPostList from '../../components/EmptyPostList';
import { RandomPhotos } from '../../StaticDB/RandomPhotos'
import EmptyMyDay from '../../components/EmptyMyDay';

const HomeTabScreen = ({ navigation }) => {

    const [isActive, setIsActive] = useState('home-outline');
    const [isVisible, setIsVisible] = useState(false);
    const [cardHeight, setCardHeight] = useState(0);
    const { user, socket } = useGlobalContext()
    const { posts } = useGlobalContext()
    let flatListRef;
    let imageFlatList;
    const { height, width } = Dimensions.get('window');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [userPosts, setUserPosts] = useState([]);
    const [myDays, setMyDays] = useState([]);

    const refreshList = () => {
        setIsRefreshing(true);
        setUserPosts([]);
        setMyDays([]);

        setTimeout(() => {
            setIsRefreshing(false);
            setUserPosts(posts);
            setMyDays(RandomPhotos)
        }, 1500)
    }


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

        refreshList()

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

    const PostItemsRender = ({ item, index }) => {
        return (
            <PostCard item={item} index={index} setCardHeight={setCardHeight} navigation={navigation} />
        )
    }

    const PostsKeyExtractor = (item, index) => {
        return item.id.toString()
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

            {/* my day list */}
            <View mt="2" flexDir="row">
                <FlatList
                    ref={(ref) => imageFlatList = ref}
                    horizontal={true}
                    data={myDays}
                    legacyImplementation={false}
                    disableScrollViewPanResponder={true}
                    removeClippedSubviews={false}
                    maxToRenderPerBatch={5}
                    initialNumToRender={5}
                    ListEmptyComponent={() => <EmptyMyDay />}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={refreshList}
                            colors={['#1B1E3C', '#242850']}
                        />
                    }

                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate({
                            name: 'ViewFullImage',
                            params: {
                                urls: item.urls,
                                isMyDay: true
                            }
                        })}>
                            <View w={width / 4} h={120} mx="1">
                                <Image
                                    borderRadius={10}
                                    borderWidth="1"
                                    borderColor="#6c75e0"
                                    source={{
                                        uri: item.urls.regular,
                                        width: width / 2,
                                    }}
                                    alt="Alternate Text"
                                    size="xl"
                                    w={width}
                                    h={120}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* post list */}
            <View my="2">
                <FlatList
                    contentContainerStyle={{ paddingBottom: 175 }}
                    ref={(ref) => flatListRef = ref}
                    height="100%"
                    keyExtractor={PostsKeyExtractor}
                    data={userPosts}
                    extraData={userPosts}
                    // inverted={true}
                    viewabilityConfig={{
                        waitForInteraction: false,
                        itemViewAreaPercentThreshold: 10,
                    }}
                    getItemLayout={(data, index) => ({
                        length: cardHeight + 18,
                        offset: (cardHeight + 18) * index,
                        animated: true,
                        index,
                    })}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={refreshList}
                            colors={['#1B1E3C', '#242850']}
                        />
                    }
                    ListEmptyComponent={() => <EmptyPostList />}
                    onScrollToIndexFailed={scrollToIndexFailed}
                    removeClippedSubviews={false}
                    maxToRenderPerBatch={5}
                    initialNumToRender={5}
                    disableScrollViewPanResponder={true}
                    // initialScrollIndex={posts.length - 1}
                    renderItem={PostItemsRender}
                />
            </View>

        </Layout>

    );
}

export default HomeTabScreen;