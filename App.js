import * as React from 'react';
import {Text, View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {useSelector} from 'react-redux';

import rootReducer from './src/slices/index.js';
import {historiesSelector} from './src/slices/histories.js';

const store = configureStore({reducer: rootReducer});

import ChatScreen from './src/screen/chatScreen.js';
import HistoryScreen from './src/screen/historyScreen.js';

function AboutScreen() {
  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Ashr Tech</Text>
        <Text>ashr.tech@gmail.com</Text>
      </View>
    </>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  const {histories} = useSelector(historiesSelector);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Chat') {
            iconName = focused ? 'comments' : 'comments';
          } else if (route.name === 'History') {
            iconName = focused ? 'history' : 'history';
          } else if (route.name === 'About') {
            iconName = focused ? 'exclamation' : 'exclamation';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FFA300',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor="#FFA300" />
        <MyTabs />
      </NavigationContainer>
    </Provider>
  );
}
