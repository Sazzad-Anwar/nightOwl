import { Box, FlatList, ScrollView, Text, View } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, RefreshControl } from 'react-native';
import Layout from '../../components/Layout';
import { useGlobalContext } from '../../context/GlobalContextProvider';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import VideoCard from '../../components/VideoCard';
import EmptyPostList from '../../components/EmptyPostList';

const VideoTabScreen = ({ navigation }) => {

    const [activeVideoType, setActiveVideoType] = useState('For you');
    const { videoPost } = useGlobalContext();
    const [cardHeight, setCardHeight] = useState(0);
    const [videoUserPost, setVideoUserPost] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refreshList = () => {
        setIsRefreshing(true);
        setVideoUserPost([]);

        setTimeout(() => {
            setIsRefreshing(false);
            setVideoUserPost(videoPost);
        }, 1500)
    }

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

    useEffect(() => {
        refreshList()
    }, [])

    return (
        <Layout>
            <View mx={5} my="2" flexDir="row" justifyContent="space-between" alignItems="center">
                <Text fontSize={25} color="white" fontFamily="Ubuntu_500Medium">Watch</Text>
                <Box flexDir="row" alignItems="center" w="20%" justifyContent="space-between">
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="account" size={25} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="search-outline" size={25} color="white" />
                    </TouchableOpacity>
                </Box>
            </View>

            <View mx={5} mt="0" mb="2">
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    {['For you', 'Trending', 'Music', 'Gaming', 'News', 'Entertainment', 'Sports', 'Travel', 'Lifestyle', 'Science', 'Technology'].map((item, index) => (
                        <TouchableOpacity onPress={() => setActiveVideoType(item)} key={item}>
                            <Box bg={activeVideoType === item ? "#6c75e0" : "#1B1E3C"} mr="2" px='4' py='1' borderRadius="full">
                                <Text fontSize={15} fontFamily="Ubuntu_400Regular" color="white">{item}</Text>
                            </Box>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={videoUserPost}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <VideoCard item={item} setCardHeight={setCardHeight} navigation={navigation} />
                )}
                extraData={videoUserPost}
                // inverted={true}
                viewabilityConfig={{
                    waitForInteraction: true,
                    itemViewAreaPercentThreshold: 50,
                }}
                getItemLayout={(data, index) => ({
                    length: cardHeight + 18,
                    offset: (cardHeight + 18) * index,
                    animated: true,
                    index,
                })}
                disableScrollViewPanResponder={true}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={refreshList}
                        colors={['#1B1E3C', '#242850']}
                    />
                }
                removeClippedSubviews={false}
                maxToRenderPerBatch={5}
                initialNumToRender={5}
                // initialScrollIndex={videoPost.length - 1}
                progressViewOffset={100}
                onEndReachedThreshold={0.1}
                onScrollToIndexFailed={scrollToIndexFailed}
                ListEmptyComponent={() => <EmptyPostList />}
            />

        </Layout>
    );
}


export default VideoTabScreen;