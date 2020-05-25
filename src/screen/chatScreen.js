// This is an Example to Send WhatsApp Message from React Native App
import React, {Component} from 'react';
import {View, StyleSheet, Text, Linking, TextInput, Button} from 'react-native';

export default class chatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile_no: '',
      msg: '',
    };
  }
  sendOnWhatsApp = () => {
    let mobile = this.state.mobile_no;
    let result = this.state.mobile_no;
    if (mobile) {
      var regExp = /^0[0-9].*$/;
      if (regExp.test(mobile)) {
        result = mobile.replace('0', '62');
      }

      let url = 'whatsapp://send?text=' + this.state.msg + '&phone=' + result;
      Linking.openURL(url)
        .then((data) => {
          console.log('WhatsApp Opened');
        })
        .catch(() => {
          alert('Make sure Whatsapp installed on your device');
        });
    } else {
      alert('Please insert mobile no');
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.mobile_no}
          onChangeText={(mobile_no) => this.setState({mobile_no})}
          placeholder={'Phone number'}
          style={styles.input}
          keyboardType={'numeric'}
        />
        <View style={styles.textAreaContainer}>
          <TextInput
            value={this.state.msg}
            onChangeText={(msg) => this.setState({msg})}
            style={(styles.input, styles.textArea)}
            underlineColorAndroid="transparent"
            placeholder="Type message"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />
        </View>
        <View style={{marginTop: 20, width: '95%'}}>
          <Button
            color="#FFA300"
            onPress={this.sendOnWhatsApp}
            title="Send WhatsApp Message"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
