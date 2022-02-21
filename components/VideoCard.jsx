import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Dimensions, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Slider } from '@miblanchard/react-native-slider';
import { Box, ScrollView, Text, View, Avatar, Button, Pressable } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';

const VideoCard = ({ item, setCardHeight, navigation }) => {

    const { width } = Dimensions.get('window');
    const [status, setStatus] = useState({})
    const [volume, setVolume] = useState(0.0);
    const video = useRef(null);
    const [sliderValue, setSliderValue] = useState(0);
    const [videoConfigShow, setVideoConfigShow] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const onLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setCardHeight(height)
    }

    const milliSecondsToMinutesAndSeconds = (millis) => {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }


    useEffect(() => {
        if (status.isLoaded) {
            setSliderValue(status.positionMillis);
        }
        if (status.didJustFinish) {
            video.current.pauseAsync()
            video.current.setPositionAsync(0);
            setSliderValue(0);
        }
    }, [status])


    return (
        <View shadow="2" onLayout={onLayout} bg="#020629" borderRadius="sm" py="3" my="1">
            <Box mx={2} flexDir="row" justifyContent="space-between">
                <Box flexDir="row">
                    <Avatar bg="lightBlue.400" source={{
                        uri: item.user.photoUrl
                    }}>
                        {(item.user.userName).split('')[0].toUpperCase()}
                    </Avatar>
                    <Box ml="2">
                        <Box flexDir="row" alignItems="center">
                            <Text fontSize="lg" ontFamily="Ubuntu_400Regular" color="white">
                                {item.user.userName}
                            </Text>
                            <Box p="0.5" h={1} mx="2" bg="white" borderRadius="full" />
                            <TouchableOpacity>
                                <Text fontSize="sm" ontFamily="Ubuntu_400Regular" color="#6c75e0">Follow</Text>
                            </TouchableOpacity>
                        </Box>
                        <Box flexDir="row" alignItems="center">
                            <Text fontSize="10" color="white">
                                {moment().startOf('day').from(item.createdAt)}
                            </Text>
                            <Box px="2">
                                <Ionicons mb="0" name="globe-outline" size={13} color="white" />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box flexDir="row" alignItems="center">
                    <TouchableOpacity>
                        <Box mx='1'>
                            <MaterialCommunityIcons name="dots-horizontal" size={25} color="white" />
                        </Box>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Box mx="1">
                            <MaterialCommunityIcons name="close" size={25} color="white" />
                        </Box>
                    </TouchableOpacity>
                </Box>
            </Box>
            <Text mx="2" mt="3" fontFamily="Ubuntu_400Regular" fontSize={12} color="white">
                {item.video.description}
            </Text>
            <Pressable onPress={() => {
                setVideoConfigShow(!videoConfigShow)
                setTimeout(() => setVideoConfigShow(false), 8000)
            }}>
                <Box h={300} w={width} position="relative" bg="transparent">
                    <Video
                        ref={video}
                        style={{
                            height: 300,
                            width
                        }}
                        source={{
                            uri: item.video.sources[0],
                        }}
                        usePoster={true}
                        posterSource={{
                            uri: item.video.thumb,
                            height: 300,
                            width
                        }}
                        useNativeControls={false}
                        resizeMode="contain"
                        isLooping={false}
                        volume={volume}
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                    {(videoConfigShow || status.didJustFinish) && (
                        <>
                            <Box bg="#1f1f1f29" position="absolute" h={300} w={width} justifyContent="center" alignItems="center">
                                <TouchableOpacity onPress={() => {
                                    status.isPlaying ? video.current.pauseAsync() : video.current.playAsync();
                                    setVideoConfigShow(true);
                                }}
                                >
                                    {status.isPlaying ?
                                        <Ionicons name="pause-circle-outline" size={55} color="white" /> :
                                        <Ionicons name="play-circle-outline" size={55} color="white" />
                                    }
                                    {status.isBuffering && <Text fontSize="sm" color="white">Loading...</Text>}

                                </TouchableOpacity>

                            </Box>
                            <Box position="absolute" bottom={0} left={0} right={0}>
                                <Box flexDir="row" justifyContent="space-between" alignItems="center" mx={5}>
                                    <Box flexDir="row" alignItems="center">
                                        <Text fontSize="sm" color="white">

                                            {milliSecondsToMinutesAndSeconds(status.positionMillis)} / {milliSecondsToMinutesAndSeconds(status.durationMillis)}

                                        </Text>
                                    </Box>
                                    <Box flexDir="row" justifyContent="space-between" alignItems="center" w="20%">
                                        <TouchableOpacity onPress={() => setVolume(volume === 1 ? 0 : 1)}>
                                            {volume === 1 ? <Ionicons name="volume-high-outline" size={25} color="white" /> : <Ionicons name="volume-mute-outline" size={25} color="white" />}

                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => video.current.presentFullscreenPlayer()}>
                                            <MaterialCommunityIcons name="arrow-expand" size={25} color="white" />
                                        </TouchableOpacity>
                                    </Box>
                                </Box>
                                <Box px={3}>
                                    <Slider
                                        value={sliderValue}
                                        // minimumValue={sliderValue}
                                        onValueChange={v => {
                                            video.current.setPositionAsync(Math.floor(v[0]))
                                            setSliderValue(v[0])
                                        }}
                                        maximumValue={status.durationMillis}
                                        animateTransitions={true}
                                        minimumTrackTintColor="#6c75e0"
                                        thumbTintColor="#6c75e0"
                                        thumbTouchSize={{ width: 40, height: 40 }}
                                        animationType="spring"
                                    />
                                </Box>
                            </Box>
                        </>
                    )}

                </Box>
            </Pressable>
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

export default VideoCard