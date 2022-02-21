import { Box, Skeleton, Text, View } from 'native-base'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const EmptyPostList = () => {
    const [isLiked, setIsLiked] = useState(false);
    return (
        <>
            <View my="2" borderRadius="5" bg="#020629">
                <TouchableOpacity>
                    <Box p="2.5" flexDir="row" alignItems="center">
                        <Skeleton h="10" w="10" borderRadius="full" bg="#1B1E3C" />
                        <Box px="4" w="90%">
                            <Skeleton.Text w="full" borderRadius="md" bg="#1B1E3C" />
                        </Box>
                    </Box>
                </TouchableOpacity>
                <Box my="2" w="100%" style={{ height: 0.2 }} bg="#6c75e0" />
                <Box flexDir="row" justifyContent="center" alignItems="center" textAlign="center" px="3" py="4" w="100%" minH="200" bg="#1B1E3C">
                    <Skeleton borderRadius="md" color="white" h="40" bg="#1B1E3C" />
                </Box>
                <Box my="2" py='.2' w="100%" style={{ height: 0.1 }} bg="#6c75e0" />
                <Box p="2" pt="0" flexDir="row" justifyContent="space-between" alignItems="center">
                    <Box flexDir="row" alignItems="center">
                        <MaterialCommunityIcons name={isLiked ? "thumb-up" : "thumb-up-outline"} size={20} color="white" />
                        <Text pl="1" color="white">Like</Text>
                    </Box>

                    <Box flexDir="row" alignItems="center">
                        <MaterialCommunityIcons name="comment" size={20} color="white" />
                        <Text pl="1" color="white">Comment</Text>
                    </Box>

                    <Box flexDir="row" alignItems="center">
                        <MaterialCommunityIcons name="share" size={20} color="white" />
                        <Text pl="1" color="white">Share</Text>
                    </Box>
                </Box>
            </View>
            <View my="2" borderRadius="5" bg="#020629">
                <TouchableOpacity>
                    <Box p="2.5" flexDir="row" alignItems="center">
                        <Skeleton h="10" w="10" borderRadius="full" bg="#1B1E3C" />
                        <Box px="4" w="90%">
                            <Skeleton.Text w="full" borderRadius="md" bg="#1B1E3C" />
                        </Box>
                    </Box>
                </TouchableOpacity>
                <Box my="2" w="100%" style={{ height: 0.2 }} bg="#6c75e0" />
                <Box flexDir="row" justifyContent="center" alignItems="center" textAlign="center" px="3" py="4" w="100%" minH="200" bg="#1B1E3C">
                    <Skeleton borderRadius="md" color="white" h="40" bg="#1B1E3C" />
                </Box>
                <Box my="2" py='.2' w="100%" style={{ height: 0.1 }} bg="#6c75e0" />
                <Box p="2" pt="0" flexDir="row" justifyContent="space-between" alignItems="center">
                    <Box flexDir="row" alignItems="center">
                        <MaterialCommunityIcons name={isLiked ? "thumb-up" : "thumb-up-outline"} size={20} color="white" />
                        <Text pl="1" color="white">Like</Text>
                    </Box>

                    <Box flexDir="row" alignItems="center">
                        <MaterialCommunityIcons name="comment" size={20} color="white" />
                        <Text pl="1" color="white">Comment</Text>
                    </Box>

                    <Box flexDir="row" alignItems="center">
                        <MaterialCommunityIcons name="share" size={20} color="white" />
                        <Text pl="1" color="white">Share</Text>
                    </Box>
                </Box>
            </View>
        </>
    )
}

export default EmptyPostList;