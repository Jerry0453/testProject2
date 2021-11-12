import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {StyleSheet, View, Text,TouchableOpacity, FlatList, SafeAreaView, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { addAllItem, addItemTobookmark, removeFromBookmark } from '../redux/action';
import ListItem from '../Common';



export default function Home(){
    const URI = 'https://news.sobjanta.live/public/api/news';
    const dispatch = useDispatch();
    const {allItems, bookmarkList, isloggedIn} = useSelector(state => state.reducer)

    const getData = async () => {
        try {
            const response = await axios.get(URI);
            if(response) {
                dispatch(addAllItem(response.data.data));
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, [])

    

    const renderItem = ({item}) => {
        return (
          <ListItem item={item} />
        );
      };


    return (
        <View style={styles.body}>
            <View style={styles.search}>
                <TextInput
                    placeholder="Search here..."
                    style={styles.textInput}>
                </TextInput>
                <Icon name="search1" size={25} />
            </View>
            <View style={styles.news}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Newest</Text>
                    <Text style={{fontSize: 16, color: '#85C1E9'}}>More</Text>
                </View>
                <FlatList
                    style={styles.flatList}
                    data={allItems}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  body: {
    flex: 0.9,
  },
  search: {
    backgroundColor: '#fff',
    borderRadius: 50,
    marginTop: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: "#515A5A",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  news: {
    marginTop: 40,
  },
});