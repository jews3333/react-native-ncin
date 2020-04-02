import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, AsyncStorage, Alert } from 'react-native';
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
      Alert.alert(err)
    }
  }

  render(){
    return (
        this.state.submit ?
        <LoginHandle id={this.state.id} password={this.state.password} sumit={this.state.submit} />
        : <View style={styles.container}>
          <View style={styles.wrap}>
            <View style={{ marginBottom: 20}}>
              <Text style={styles.title}>NCIN MEMBERS AUTO LOGIN</Text>
            </View>
            <View style={{flex:1, marginBottom:5}}>
              <TextInput
                placeholder="아이디"
                onChangeText={text => this.setState({ id: text })}
                style={styles.input}
              />
            </View>
            <View style={{flex:1, marginBottom:5}}>
              <TextInput
                secureTextEntry={true}
                placeholder="패스워드"
                onChangeText={text => this.setState({ password: text })}
                style={styles.input}
              />
            </View>
            <View style={{flex:1}}>
              <TouchableOpacity onPress={() => this.onSave()} style={styles.submit}>
                <Text style={{color:"#fff"}}>로그인</Text>
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
    backgroundColor: "#e9e9e9",
    padding:15
  },
  wrap: {
    padding: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 30,
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
    backgroundColor: "#5E6898",
    justifyContent: "center",
    alignItems: "center"
  }
})
