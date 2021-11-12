import * as React from 'react';
import {StyleSheet, View, Text,TouchableOpacity, FlatList, SafeAreaView, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import {store, persistor } from './redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Home from './HomeScreen';
import BookMark from './BookMark';
import LogIn from './Login';

function HomeScreen({ navigation }) {
  return (
    <View style={{flex: 1, padding: 20,}}>
      <View style={{flex: 0.1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>Articles</Text>
          <Icon name="menufold" size={30} onPress={() => navigation.openDrawer()} />
      </View> 
      <Home />
    </View>
    
  );
}

function BookMarkScreen({ navigation }) {
    const {isloggedIn} = useSelector(state => state.reducer)

    if(isloggedIn) {
        return <BookMark />
    } else {
        return <LogIn />
    }
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Root() {
  return (
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}>
      <Stack.Screen 
        name="HomeScreen"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}

export default function Navigate() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Root"
        screenOptions={{ headerShown: false, drawerPosition: "right" }}
      >
        <Drawer.Screen name="Home Page" component={Root} />
        <Drawer.Screen name="BookMarks" component={BookMarkScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    </PersistGate>
    </Provider>
  );
}
