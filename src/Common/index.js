import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text,TouchableOpacity, FlatList, SafeAreaView, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { addAllItem, addItemTobookmark, removeFromBookmark } from '../redux/action';

export default function ListItem(props) {
    const {item} = props;
    const {allItems, bookmarkList, isloggedIn} = useSelector(state => state.reducer)
    const dispatch = useDispatch();
    const [detail, setDetail] = useState();

    const AddBookmark = (item) => {
        let list = [];
        firestore()
        .collection('Bookmarks')
        .add({
            item: item,
        })
        .then(docRef => {
            list = {
                ...item, itemId: docRef.id
            }
            dispatch(addItemTobookmark(list));
        });
        
    }

    const RemoveBookmark = (item) => {
        let item_id;
        
        if(!item.itemId) {
            bookmarkList.map(temp => {
                if(temp.id === item.id){
                    item_id = temp.itemId;
                }
            })
        } else {
            item_id = item.itemId
        }
        console.log(item_id)
        firestore()
            .collection('Bookmarks')
            .doc(item_id)
            .delete()
            .then(() => {
                console.log('User deleted!');
            });
        dispatch(removeFromBookmark(item));
    }

    const ifExists = item => {
        if (bookmarkList.filter(items => items.id === item.id).length > 0) {
          return true;
        }
        return false;
    };

    return (
        <View style={styles.listItem}>
            <View>
              <Image
                  style={{height: 100, width: 100, borderRadius: 20}}
                  source={{
                      uri: item.photo,
                  }}/>
            </View>
            <View style={{marginLeft: 10, flex: 1, justifyContent: 'space-between'}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.title}</Text>
              <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                  <View style={{flexDirection:'row'}}>
                      <Icon name="like2" size={18} />
                      <Text style={{marginRight: 20}}>  22.5K</Text>
                      <Icon name="clockcircle" size={18} />
                      <Text style={{marginRight: 20}}>  1h ago</Text>
                  </View>
                <TouchableOpacity>
                    
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                    ifExists(item) && isloggedIn
                        ? RemoveBookmark(item)
                        : AddBookmark(item)
                    }>
                {
                    ifExists(item) && isloggedIn ? 
                    <Icon1 name="bookmark" size={18} /> :
                    <Icon1 name="bookmark-o" size={18} />
                }
              </TouchableOpacity>
              </View>
            </View>
          </View>
    )
}

const styles = StyleSheet.create({
    flatList: {
      width: '100%',
    },
    listItem: {
      flex: 1,
      marginVertical: 10,
      flexDirection: 'row',
    },
  });