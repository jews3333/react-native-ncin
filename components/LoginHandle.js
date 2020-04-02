import React from 'react';
import { Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default class LoginHandle extends React.Component {

    // injectLogin = (id, password) => {
    //     return `(function(id, password){
    //         setTimeout(() => {
    //             try{
    //                 fn_goOffice();
    //             } catch(err) {
    //                 alert('자동로그인 실패하였습니다.');
    //             }
    //             window.close();
    //         });
    //         document.getElementById("userid").value = id;
    //         document.getElementById("password").value = password;
    //         document.getElementById("loginVO").submit();
    //     }('${id}','${password}'))`
    // }

    injectLogin = (id, password) => {
        return `(function(id, password){
            setTimeout(() => {
                window.ReactNativeWebView.postMessage("되는거가마는거가");
            }, 3000);
            document.getElementById("userid").value = id;
            document.getElementById("password").value = password;
            document.getElementById("loginVO").submit();
        }('${id}','${password}'))`
    }

    render(){
        const { id, password } = this.props;
        return (
            <WebView 
                source={{uri:'http://gw.ncin.co.kr/Login.do'}}
                injectedJavaScript={this.injectLogin(id, password)}
                onMessage={(event) => Alert.alert(event.nativeEvent.data)}
                ref={(webView) => this.webView = webView}
                style={{width:"100%", height: "100%"}}
            />
        )
    }
}