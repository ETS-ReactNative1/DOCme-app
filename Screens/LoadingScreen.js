import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar, ActivityIndicator } from 'react-native';
import { Buffer } from 'buffer'

export default class LoadingScreen extends Component {
  async componentDidMount() {
    var patient = await this.signIn('kelvingraddick@gmail.com', 'password');
    if (patient) {
      this.props.navigation.navigate('BottomTabNavigator');
    }
  }
  
  render() {
    return (
      <>
        <SafeAreaView />
        <View style={styles.container}>  
          <ActivityIndicator size="large" color="gray" />
        </View> 
      </>
    );
  }

  async signIn(emailAddress, password) {
    var base64 = new Buffer(emailAddress + ':' + password).toString('base64');
    return fetch('http://www.docmeapp.com/patient/signin', {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + base64,
      }
    })
    .then((response) => { 
      if (response.status == 200) {
        return response.json()
        .then((responseJson) => {
          if (responseJson.isSuccess) {
            return responseJson.patient;
          }
        })
      }
      return undefined;
    })
    .catch((error) => {
      console.error(error);
      return undefined;
    });
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row'
  }
})
