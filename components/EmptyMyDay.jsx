import { Skeleton, View } from 'native-base'
import React, { useState } from 'react'
import { Dimensions } from 'react-native';

const EmptyMyDay = () => {
    const { height, width } = Dimensions.get('window');
    return (
        <View flexDir="row">
            <View w={width / 4} h={120} mx="1" bg="#020629">
                <Skeleton
                    borderRadius={10}
                    borderWidth="1"
                    borderColor="#6c75e0"
                    w={width / 4}
                    h={120}
                    bg="#1B1E3C"
                />
            </View>
            <View w={width / 4} h={120} mx="1" bg="#020629">
                <Skeleton
                    borderRadius={10}
                    borderWidth="1"
                    borderColor="#6c75e0"
                    w={width / 4}
                    h={120}
                    bg="#1B1E3C"
                />
            </View>
            <View w={width / 4} h={120} mx="1" bg="#020629">
                <Skeleton
                    borderRadius={10}
                    borderWidth="1"
                    borderColor="#6c75e0"
                    w={width / 4}
                    h={120}
                    bg="#1B1E3C"
                />
            </View>
            <View w={width / 4} h={120} mx="1" bg="#020629">
                <Skeleton
                    borderRadius={10}
                    borderWidth="1"
                    borderColor="#6c75e0"
                    w={width / 4}
                    h={120}
                    bg="#1B1E3C"
                />
            </View>
        </View>
    )
}

export default EmptyMyDay;