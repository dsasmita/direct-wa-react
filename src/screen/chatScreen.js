import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Linking,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {useSelector, useDispatch} from 'react-redux';

import {
  historiesSelector,
  setPhone,
  updateHistory,
} from '../slices/histories.js';

import NativeAds from '../components/nativeAds.js';

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

  const pasteClipboard = async () => {
    const text = await Clipboard.getString();
    dispatch(setPhone(text));
  };

  const clearMessage = () => {
    dispatch(setPhone(''));
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.widthDefault, {flexDirection: 'row'}]}>
        <TextInput
          value={phone}
          onChangeText={handleInputPhone}
          placeholder={'Phone number'}
          style={styles.input}
          keyboardType={'numeric'}
        />
        <Button color="#444" onPress={pasteClipboard} title="Paste" />
      </View>
      <View style={styles.textAreaContainer}>
        <TextInput
          value={message}
          onChangeText={handleInputMessage}
          style={(styles.input, styles.textArea)}
          underlineColorAndroid="transparent"
          placeholder="Type message"
          placeholderTextColor="grey"
          numberOfLines={3}
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
      <NativeAds />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  widthDefault: {marginTop: 20, width: '95%'},
  input: {
    flex: 1,
    backgroundColor: '#D3D3D3',
  },
  textAreaContainer: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    padding: 5,
    width: '95%',
    marginTop: 10,
  },
  textArea: {
    height: 50,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
});

export default ChatScreen;
