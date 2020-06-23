# react-native-ncin
> 회사 그룹웨어 출석체크 자동화 애플리케이션

### 주요기술
> expo-cli
* react-native 빠르게 진행하기 위해 사용
> react-native-webview
* 그룹웨어 접속을 위한 웹뷰
> react-native/AsyncStorage
* 자동 로그인 데이터 스토리지 저장에 필요
> react-native/Libraries/Network/RCTNetworking
* 웹뷰의 쿠키 제어를 위해 사용 : clearCookies
> injectedJavaScript
* 웹뷰에게 스크립트 실행을 명령
> onMessage
* 웹뷰와 리액트 네이티브와의 양방향 통신을 위함
* 웹뷰에서는 addEventListener("message")로 리액트 네이트브에서 요청하는 메세지를 받기 위함
* window.ReactNativeWebView.postMessage('메세지') 리액트 네이이브에서 요청이 오면 웹뷰에서는 리액트 네이티브로 답변하기 위함

### 이슈상황
> 웹뷰 종료 및 앱 종료를 하더라도 로그인 세션이 남아있는 현상
* @react-native-community/cookies는 expo를 지원하지 않음
* react-native/Libraries/Network/RCTNetworking를 이용하여 쿠키를 
