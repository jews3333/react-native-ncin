import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, AsyncStorage, Alert, Image } from 'react-native';
import LoginHandle from './components/LoginHandle';
import * as Font from 'expo-font';

export default class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      submit: false,
      id: "",
      password: ""
    }
  }

  onRunAgain = () => {
    this.setState({
      submit: false
    });
    this.componentDidMount();
  }

  onSubmit = () => {
    this.setState({
      ...this.state,
      submit: true
    });
  }

  onSave = async () => {

    if(!this.state.id){
      Alert.alert("아이디를 입력하세요");
      return;
    }

    if(!this.state.password){
      Alert.alert("아이디를 입력하세요");
      return;
    }

    try{
      await AsyncStorage.setItem("SAVE_ID", this.state.id);
      await AsyncStorage.setItem("SAVE_PW", this.state.password);
    }
    catch(err){
      alert(err);
      return;
    }

    this.onSubmit();
  }

  componentDidMount = async () => {

    // await Font.loadAsync({
    //   'SenR': require('./assets/fonts/Sen-Regular.otf'),
    //   'SenB': require('./assets/fonts/Sen-Bold.otf')
    // });

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
      Alert.alert(err)
    }
  }

  render(){

    return (
        this.state.submit ?
        <LoginHandle id={this.state.id} password={this.state.password} sumit={this.state.submit} onAgain={this.onRunAgain} />
        : <View style={styles.container}>
          <View style={styles.wrap}>
            <View style={{marginBottom: 20}}>
              <Text style={styles.title}>NCIN GROUPWARE AUTO <Text style={{color:'#4b75b8'}}>LOGIN</Text></Text>
            </View>
            <View style={{marginBottom:5}}>
              <TextInput
                placeholder="ID"
                onChangeText={text => this.setState({ id: text })}
                style={styles.input}
              />
            </View>
            <View style={{marginBottom:5}}>
              <TextInput
                secureTextEntry={true}
                placeholder="PASSWORD"
                onChangeText={text => this.setState({ password: text })}
                style={styles.input}
              />
            </View>
            <View>
              <TouchableOpacity onPress={() => this.onSave()} style={styles.submit}>
                <Text style={{color:"#fff"}}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding:15
  },
  wrap: {
    
  },
  title: {
    fontSize: 20,
    color: "#333",
    lineHeight: 32,
    textAlign:"center"
  },
  input: {
    height:50,
    paddingHorizontal: 10,
    borderWidth:1,
    borderColor: "#ccc",
    borderRadius: 5
  },
  submit: {
    height: 50,
    borderRadius: 5,
    backgroundColor: "#4b75b8",
    justifyContent: "center",
    alignItems: "center"
  }
})
