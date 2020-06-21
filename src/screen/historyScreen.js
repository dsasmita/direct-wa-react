import React, {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';

import {
  setPhone,
  fetchHistory,
  destroyHistory,
  historiesSelector,
} from '../slices/histories.js';

import NativeAds from '../components/nativeAds.js';

const HistoryScreen = (props) => {
  const {navigation} = props;
  const {histories} = useSelector(historiesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  const formatDate = (dateRaw) => {
    let options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    let dateFormat = new Date(dateRaw);
    return dateFormat.toLocaleString('en-US', options);
  };

  const sendMessage = (history) => {
    dispatch(setPhone(history.phone));
    navigation.navigate('Chat');
  };

  const destroyAction = () => {
    Alert.alert(
      'Delete confirmation',
      'Are you sure want to delete all history?',
      [
        {
          text: 'NO',
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => dispatch(destroyHistory())},
      ],
      {cancelable: false},
    );
  };

  const renderHistory = () => {
    return (
      <View>
        <NativeAds />
        {histories && histories.length > 0 ? (
          <>
            <FlatList
              data={histories}
              keyExtractor={(item) => item.key}
              renderItem={({item}) => (
                <View style={styles.listCOntainer}>
                  <View style={styles.listText}>
                    <Text>{item.phone}</Text>
                    <Text color="#aaa">{formatDate(item.date_time)}</Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => sendMessage(item)}>
                      <Icon name="comments" size={25} color="gray" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            <NativeAds />
          </>
        ) : (
          <View style={styles.listCOntainer}>
            <Text>History Empty</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <SafeAreaView>{renderHistory()}</SafeAreaView>
      <TouchableOpacity style={styles.fabButton} onPress={destroyAction}>
        <Icon name="trash" size={30} color="white" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  listCOntainer: {
    margin: 5,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
  },
  listText: {flex: 1},
  fabButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 70,
    backgroundColor: '#f4511e',
    borderRadius: 100,
  },
});

export default HistoryScreen;
