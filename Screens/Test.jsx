import React, { useState, useEffect, useRef } from 'react';

import { View, Animated, Dimensions, Text } from 'react-native';
import { ListItem } from 'native-base';
import { _ } from 'lodash';

const { height } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.2;

const itemList = [
    { id: '1', name: 'Item!' },
    { id: '2', name: 'Item@' },
    { id: '3', name: 'Item#' },
    { id: '4', name: 'Item$' },
    { id: '5', name: 'Item%' },
    { id: '6', name: 'Item^' },
    { id: '7', name: 'Item&' },
    { id: '8', name: 'Item*' },
    { id: '9', name: 'Item(' },
    { id: '10', name: 'Item)' },
    { id: '11', name: 'Item!!' },
    { id: '12', name: 'Item@@' },
    { id: '13', name: 'Item##' },
    { id: '14', name: 'Item$$' },
    { id: '15', name: 'Item%%' },
    { id: '16', name: 'Item^^' },
    { id: '17', name: 'Item&&' },
    { id: '18', name: 'Item**' },
    { id: '19', name: 'Item((' },
    { id: '20', name: 'Item))' },
];

const Test = props => {
    const flatListRef = useRef(null);

    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [clientData, setClientData] = useState([]);
    const [serverData, serverDataLoaded] = useState([]);
    const [pending_process, setPending_process] = useState(true);
    const [loadmore, setLoadmore] = useState(false);

    const [refresh, setRefresh] = useState(false);
    const [fadingIndex, setFadingIndex] = useState(0);
    const [scrollDirection, setScrollDirection] = useState(false);
    const [offsetY, setOffsetY] = useState(0);

    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const [op, setOp] = useState(
        scrollY.interpolate({
            inputRange: [0, 50, 100, 150],
            outputRange: [1, 0.5, 0.25, 0],
        }),
    );

    const ApiRequest = async thePage => {
        await setTimeout(() => { }, 1500);
        return itemList.slice((thePage - 1) * limit, thePage * limit);
    };

    const requestToServer = async thePage => {
        let data = await ApiRequest(thePage);
        console.log('data', data);
        serverDataLoaded(data);
    };

    useEffect(() => {
        console.log('requestToServer');
        requestToServer(page);
    }, []);

    useEffect(() => {
        console.log('obtained serverData', serverData);
        if (serverData.length > 0) {
            setRefresh(false);
            setClientData([...clientData, ...serverData]);
            setLoadmore(serverData.length == limit ? true : false);
            setPending_process(false);
        } else {
            setLoadmore(false);
        }
    }, [serverData]);

    useEffect(() => {
        console.log('load more with page', page);
        if (serverData.length == limit || page == 1) {
            setPending_process(true);
            requestToServer(page);
        }
    }, [page]);

    const handleLoadMore = () => {
        console.log('loadmore', loadmore);
        console.log('pending_process', pending_process);
        if (loadmore && !pending_process) {
            setPage(page + 1);
        }
    };

    const onRefresh = () => {
        setClientData([]);
        setPage(1);
        setRefresh(true);
        setPending_process(false);
    };

    const renderRow = ({ item, index, separators }) => {
        return (
            <Animated.View
                style={
                    index < fadingIndex && scrollDirection == 'down' ? { opacity: op } : {}
                }>
                <ListItem
                    style={{
                        height: ITEM_HEIGHT,
                        backgroundColor: '#242850',
                    }}>
                    <Text style={{ color: 'white' }}>{item.name}</Text>
                </ListItem>
            </Animated.View>
        );
    };

    const handleScroll = event => {
        let { contentSize, contentOffset } = event.nativeEvent;
        let h = ITEM_HEIGHT;
        let reachingIndex = Math.ceil(contentOffset.y / h);

        setOffsetY(contentOffset.y);
        setScrollDirection(contentOffset.y > offsetY ? 'down' : 'up');

        let in_range = [0, h / 3, (h / 3) * 2, h];
        let out_range = [1, 0.5, 0.25, 0];
        let out_range_new = [];
        let in_range_new = [];

        let d = h / 3;
        for (i = 0; i <= reachingIndex; i++) {
            out_range_new = _.concat(out_range_new, out_range);
            _.each(in_range, (val, index) => {
                let n = in_range_new.length + 1;
                let next_num = in_range[0] + (n - 1) * d;
                in_range_new.push(next_num);
            });
        }

        console.log('out_range_new', out_range_new);
        console.log('in_range_new', in_range_new);

        setOp(
            scrollY.interpolate({
                inputRange: in_range_new,
                outputRange: out_range_new,
            }),
        );
        setFadingIndex(reachingIndex);
    };

    const getItemLayout = (data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    });

    return (
        <View>
            <Animated.FlatList
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: { contentOffset: { y: scrollY } },
                        },
                    ],
                    {
                        useNativeDriver: true,
                        listener: handleScroll,
                    },
                )}
                getItemLayout={getItemLayout}
                refreshing={refresh}
                data={clientData}
                renderItem={renderRow}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                onRefresh={() => onRefresh()}
            />
        </View>
    );
};

export default Test;