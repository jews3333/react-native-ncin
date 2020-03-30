import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import LoginHandle from './components/LoginHandle';

export default class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      id: "",
      password: "",
      sumit: false
    }
  }

  onChangeId = (e) => {
    this.setState({
      ...this.state,
      id: e.target.value
    });
  }

  onChangePw = (e) => {
    this.setState({
      ...this.state,
      password: e.target.value
    });
  }

  onSumit = () => {
    this.setState({
      ...this.state,
      sumit: true
    })
  }

  render(){
    return (
        this.state.sumit ?
        <LoginHandle id={this.state.id} password={this.state.password} sumit={this.state.sumit} />
        : <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <TextInput
          placeholder="아이디"
          onChange={(e) => this.onChangeId(e)}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="패스워드"
          onChange={(e) => this.onChangePw(e)}
        />
        <TouchableOpacity onPress={this.onSumit}>
          <Text>로그인</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
}
