import React from 'react';
import { Alert, BackHandler, AsyncStorage, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Networking from 'react-native/Libraries/Network/RCTNetworking';

export default class LoginHandle extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }

    componentDidMount(){
        this.setState({
            visible: true
        })
    }

    // injectLogin = (id, password) => {
    //     return `document.addEventListener("message",function(event){
    //         location.href = "/"+event.data+".do";
    //     });
    //     (function(id, password){
    //         if(document.head.outerHTML.indexOf("아이디 또는 비밀번호가 잘못 입력 되었습니다.") > 0){
    //             window.ReactNativeWebView.postMessage("실패하였습니다!");
    //             return false;
    //         }

    //         setTimeout(function(){
    //             fn_goOffice();
    //             window.ReactNativeWebView.postMessage("확인되었습니다!");
    //         }, 100);

    //         document.getElementById("userid").value = id;
    //         document.getElementById("password").value = password;
    //         document.getElementById("loginVO").submit();

    //     }('${id}','${password}'))`
    // }

    injectLogin = () => {
        return `document.addEventListener("message",function(event){
            location.href = "/"+event.data+".do";
        });

        (function(){

            if(document.head.outerHTML.indexOf("아이디 또는 비밀번호가 잘못 입력 되었습니다.") > 0){
                window.ReactNativeWebView.postMessage("실패하였습니다!");
                return false;
            }

            if(location.pathname == "/Main.do" || location.pathname == "/ttm.do"){
                fn_goOffice();
                window.ReactNativeWebView.postMessage("확인되었습니다!"); 
            }

        }());`
    }

    render(){
        const { id, password, onAgain } = this.props;
        return (
            this.state.visible ?
            <WebView 
                source={{uri: `http://gw.ncin.co.kr/ActionLogin.do?userid=${id}&password=${password}`}}
                ref={(webView) => this.webView = webView}
                injectedJavaScript={this.injectLogin()}
                onMessage={(event) => { 
                    Alert.alert(
                        event.nativeEvent.data, 
                        'DELETE를 누르시면 저장된 아이디가 삭제됩니다.',
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                    this.setState({
                                        visible: false
                                    });
                                }
                            },
                            {
                                text: 'DELETE',
                                onPress: () => {
                                    this.setState({
                                        visible: false
                                    });
                                    Networking.clearCookies((cleared) => console.log(cleared));
                                    AsyncStorage.clear();
                                }
                            }
                        ],
                        {cancelable: false}
                    );
                }}
                style={{width:"100%", height: "100%"}}
                cacheEnabled={false}
                sharedCookiesEnabled={false}
            />
            :
            <View style={styles.container}>
                <Text style={{fontSize:20}}>Run again?</Text>
                <View style={{marginTop: 20, flexDirection:"row"}}>
                    <TouchableOpacity onPress={() => onAgain()} style={styles.ok}>
                        <Text style={{color:"#fff"}}>OK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => BackHandler.exitApp()} style={styles.exit}>
                        <Text>Exit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    ok: {
        width: 100,
        height: 40,
        alignItems:"center",
        justifyContent: "center",
        backgroundColor: "#4b75b8",
        borderRadius: 3,
        marginRight: 20
    },
    exit: {
        width: 100,
        height: 40,
        alignItems:"center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 3
    }
})