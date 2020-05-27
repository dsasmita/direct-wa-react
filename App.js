import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

import rootReducer from './src/slices/index.js';

const store = configureStore({reducer: rootReducer});

import MainNavigation from './src/navigation/main.js';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor="#FFA300" />
        <MainNavigation />
      </NavigationContainer>
    </Provider>
  );
}
