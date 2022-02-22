import { Box, Button, Image, Pressable, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native';
import Layout from '../components/Layout';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Slider } from '@miblanchard/react-native-slider';
import { CommonActions } from '@react-navigation/native';


const ViewFullImage = ({ route, navigation }) => {
    let image = route.params;
    const { height, width } = Dimensions.get('screen');
    const [imageDetailsShow, setImageDetailsShow] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [timerWidth, setTimerWidth] = useState(0);

    useEffect(() => {
        if (image.isMyDay) {
            setTimeout(() => {
                navigation.dispatch(CommonActions.goBack());
            }, 10000)
        }

    }, [])

    useEffect(() => {

        if (image.isMyDay && timerWidth < 110) {
            const ViewImageInterVal = setInterval(() => {
                setTimerWidth(timerWidth => timerWidth + 10);
            }, 2200)

            return () => {
                clearInterval(ViewImageInterVal);
            }
        }

    }, [timerWidth])

    return (
        <Layout>
            <Pressable onPress={() => {
                setImageDetailsShow(!imageDetailsShow)
                setTimeout(() => {
                    setImageDetailsShow(false)
                }, 8000)
            }}>
                {image.isMyDay &&
                    <Slider
                        thumbStyle={{
                            width: 0,
                        }}
                        containerStyle={{
                            marginLeft: 10,
                            marginRight: 10
                        }}
                        value={timerWidth}
                        minimumValue={0}
                        maximumValue={100}
                        animateTransitions={true}
                        minimumTrackTintColor="#6c75e0"
                        thumbTintColor="#6c75e0"
                        thumbTouchSize={{ width: 0, height: 0 }}
                        animationType="timing"
                    />
                }
                <View flexDir="row" h={height} w={width} justifyContent="center" alignItems="center">
                    <Image source={{
                        uri: image.urls.regular,
                        width,
                        height: 400
                    }}
                        alt="Alternate Text"
                        size="xl"
                        w={width}
                        h={400}
                    />
                </View>
                {imageDetailsShow &&
                    <View position="absolute" top="0" bottom="0" left="0" right="0" bg="#1f1f1f80">
                        <Box flex="0" mx="2" pt="3" flexDir="row" justifyContent="flex-end">
                            <Button borderRadius="full" bg="transparent" _pressed={{ bg: "#1B1E3C" }}>
                                <MaterialCommunityIcons name="tag" size={25} color="white" />
                            </Button>
                            <Button borderRadius="full" bg="transparent" _pressed={{ bg: "#1B1E3C" }}>
                                <MaterialCommunityIcons name="dots-vertical" size={25} color="white" />
                            </Button>
                        </Box>
                        <Box flex="1" zIndex={0} />
                        <Box flex="0" position="absolute" bottom={10} left={4} right={4}>
                            <Box flexDir="row" justifyContent="space-between" w="100%" alignItems="center">
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
                        </Box>
                    </View>

                }
            </Pressable>
        </Layout>

    );
}

export default ViewFullImage;