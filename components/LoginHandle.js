import React from 'react';
import { WebView } from 'react-native-webview';

export default class LoginHandle extends React.Component {

    injectLogin = (id, password) => {
        return `(function(id, password){
            setTimeout(() => {
                try{
                    fn_goOffice();
                } catch(err) {
                    alert('자동로그인 실패하였습니다.');
                }
                window.close();
            });
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
                style={{width:"100%", height: "100%"}}
            />
        )
    }
}