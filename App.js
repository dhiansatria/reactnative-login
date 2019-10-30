import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  Button,
  TextInput
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from 'react-native/Libraries/NewAppScreen';

// tujuan stack navigator agar dalam 1 project bisa banyak aktivitis
// import { StackNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

// membuat class untuk login
class LoginActivity extends Component {
  // buat suatu variabel bertipe static - seperti state tapi bukan state
  static navigationOptions = {
    title: 'LoginActivity',
  }
  constructor (props) {
    super(props)
    this.state = {
      UserEmail: '',
      UserPassword: ''
    }
  }

  // membuat function untuk proses login
  userLoginFunction = () => {
    const { UserEmail } = this.state;
    const { UserPassword } = this.state;

    fetch('http://17.17.17.104/my-react/user_login.php', {
      method: 'POST',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: UserEmail,
        password: UserPassword
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // jika email dan pwd match
        if (responseJson === 'Data Matched') {
          // membuka halaman profile
          this.props.navigation.navigate('Second', { Email: UserEmail })
        }
        // jika email dan password tidak matched
        else {
          Alert.alert(responseJson);
        }
      })
      .catch(error => {
        console.error(error);
      })
  }

  render () {
    return (
      <View>
        <Text> Login Form</Text>
        <TextInput
          placeholder='Tuliskan email address'
          onChangeText={UserEmail => this.setState({ UserEmail })}
        />

        <TextInput
          placeholder='Tuliskan password'
          onChangeText={UserPassword => this.setState({ UserPassword })}
          secureTextEntry
        />

        <Button title='Login' onPress={this.userLoginFunction} />
      </View>
    );
  }
}

// membuat class untuk profile

class ProfileActivity extends Component {
  static navigationOptions = {
    title: 'ProfileActivity'
  };

  render () {
    // proses logout
    const { goBack } = this.props.navigation;

    return (
      <View>
        <Text>{this.props.navigation.state.params.Email}</Text>

        { <Button title='Logout' onPress={() => goBack(null)} /> }
      </View>
    );
  }
}

// export default (MainProject = StackNavigator({
//   First: { screen: LoginActivity },
//   Second: { screen: ProfileActivity }
// }))

const RootStack = createStackNavigator({
  Home: LoginActivity,
  Second: ProfileActivity,
},
{
  initialRouteName: 'Home',
},
);

const AppContainer = createAppContainer (RootStack);
export default AppContainer;