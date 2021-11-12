import React, {useEffect} from 'react'
import {StyleSheet, View, Text, FlatList, SafeAreaView, TextInput, Image, Button } from 'react-native';
import ListItem from '../Common';
import auth from '@react-native-firebase/auth';
import {LoggedIn, Loggedout} from '../redux/action'
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';



export default function BookMark() {
  const dispatch = useDispatch()
  const {allItems, bookmarkList, isloggedIn} = useSelector(state => state.reducer)
  const onlogout = async () => {
    auth()
  .signOut()
  .then(() => dispatch(Loggedout()));
  }

  const renderItem = ({item}) => {
    return (
      <ListItem item={item} />
    );
  };

  return (
    <View style={styles.parentView}>

      <View style={styles.headerView}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Bookmarked Articles</Text>
        <Icon name="logout" size={30} onPress={() => onlogout()} />
      </View>

      <View style={styles.body}>
        <FlatList
          style={styles.flatList}
          data={bookmarkList}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    padding: 20,
  },
  headerView: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  body: {
    flex: 0.9,
  },
});
