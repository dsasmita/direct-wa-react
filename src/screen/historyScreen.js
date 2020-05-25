import React from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';

import {historiesSelector} from '../slices/histories.js';

const historyScreen = () => {
  const {histories} = useSelector(historiesSelector);

  console.log(histories);
  return (
    <>
      <Text>test</Text>
    </>
  );
};

export default historyScreen;
