import React from 'react';
import { Text, View, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import LoginHandle from './components/LoginHandle';

export default class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      submit: false,
      id: "",
      password: ""
    }
  }

  onSubmit = () => {
    this.setState({
      ...this.state,
      submit: true
    });
  }

  onSave = async () => {
    try{
      await AsyncStorage.setItem("SAVE_ID", this.state.id);
      await AsyncStorage.setItem("SAVE_PW", this.state.password);
    }
    catch(err){
      alert(err);
      return false;
    }

    this.onSubmit();
  }

  async componentDidMount(){
    AsyncStorage.clear();
    try {
      const saveId = await AsyncStorage.getItem("SAVE_ID");
      const savePw = await AsyncStorage.getItem("SAVE_PW");
      if(saveId !== null) {
        this.setState({
          ...this.state,
          id: saveId
        });

        if(savePw !== null){
          this.setState({
            ...this.state,
            password: savePw
          });

          
          this.onSubmit();

        }

      }
    }
    catch(err){
      alert(err)
    }
  }

  render(){
    return (
        this.state.submit ?
        <LoginHandle id={this.state.id} password={this.state.password} sumit={this.state.submit} />
        : <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <TextInput
          placeholder="아이디"
          onChangeText={text => this.setState({ id: text })}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="패스워드"
          onChangeText={text => this.setState({ password: text })}
        />
        <TouchableOpacity onPress={() => this.onSave()}>
          <Text>로그인</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
}
