import React from 'react';
import { WebView } from 'react-native-webview';



export default class LoginHandle extends React.Component {

    injectLogin = ({id, password}) => {
        console.log(id, password);
        return `(${String(
            function(){
                setTimeout(function(){
                    fn_goOffice();
                }, 2000);
                document.getElementById("userid").value = id;
                document.getElementById("password").value = password;
                document.getElementById("loginVO").submit();
            }
        )}())`
    }

    render(){
        const { id, password, submit } = this.props;
        return (
            <WebView 
                source={{uri:'http://gw.ncin.co.kr/Login.do'}}
                injectedJavaScript={this.injectLogin({id, password})}
                style={{width:"100%", height: "100%"}}
            />
        )
    }
}