import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Linking,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {
  historiesSelector,
  setPhone,
  updateHistory,
} from '../slices/histories.js';

const ChatScreen = (props) => {
  const dispatch = useDispatch();
  const {phone, histories} = useSelector(historiesSelector);
  const [message, setMessage] = useState('');

  const handleInputPhone = (input) => {
    dispatch(setPhone(input));
  };

  const handleInputMessage = (input) => {
    setMessage(input);
  };

  const makeid = () => {
    let result = '';
    let length = 9;
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const sendOnWhatsApp = () => {
    let mobile = phone;
    let result = phone;
    if (mobile) {
      var regExp = /^0[0-9].*$/;
      if (regExp.test(mobile)) {
        result = mobile.replace('0', '62');
      }

      let url = 'whatsapp://send?text=' + message + '&phone=' + result;
      Linking.openURL(url)
        .then((data) => {
          dispatch(
            updateHistory({
              newHistory: {
                key: makeid(),
                phone: result,
                message: message,
                date_time: new Date().toLocaleString(),
              },
              currentHistory: histories,
            }),
          );
        })
        .catch(() => {
          Alert.alert('Warning', 'Make sure Whatsapp installed on your device');
        });
    } else {
      Alert.alert('Warning', 'Please insert mobile no');
    }
  };

  const clearMessage = () => {
    dispatch(setPhone(''));
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={phone}
        onChangeText={handleInputPhone}
        placeholder={'Phone number'}
        style={styles.input}
        keyboardType={'numeric'}
      />
      <View style={styles.textAreaContainer}>
        <TextInput
          value={message}
          onChangeText={handleInputMessage}
          style={(styles.input, styles.textArea)}
          underlineColorAndroid="transparent"
          placeholder="Type message"
          placeholderTextColor="grey"
          numberOfLines={10}
          multiline={true}
        />
      </View>
      <View style={styles.widthDefault}>
        <Button
          color="#FFA300"
          onPress={sendOnWhatsApp}
          title="Send WhatsApp Message"
        />
      </View>
      <View style={styles.widthDefault}>
        <Button color="#444" onPress={clearMessage} title="Clear Message" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  widthDefault: {marginTop: 20, width: '95%'},
  input: {
    width: '95%',
    height: 44,
    padding: 10,
    margin: 20,
    backgroundColor: '#D3D3D3',
  },
  textAreaContainer: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    padding: 5,
    width: '95%',
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
});

export default ChatScreen;
