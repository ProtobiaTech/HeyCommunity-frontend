Hey Community
=====================

[![Join the chat at https://gitter.im/dev4living/hey-community](https://badges.gitter.im/dev4living/hey-community.svg)](https://gitter.im/dev4living/hey-community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Live demo: [http://demo.hey-community.online](http://demo.hey-community.online)   
Official website: [http://www.hey-community.online](http://www.hey-community.online)   


## Overview
WebApp & IOS App & Android App of Community   
构建 WebApp Community 和 IOS-APP Community 和 Android-APP Community 的基于Ionic Framework项目，主打移动端APP化

开放[Sass服务](http://www.hey-community.online)，1分钟申请即刻拥有一个WebApp Community


## Install

### Install Ionic & Cordova
```
$ npm install -g cordova ionic
```
see: [http://ionicframework.com/getting-started/](http://ionicframework.com/getting-started/)

### Clone proj and Into the proj directory
```
$ git clone https://github.com/dev4living/hey-community.git
$ cd hey-community
```

### Install dependencies
```
$ bower install
$ npm install
```
see: [http://bower.io](http://bower.io)   
see: [http://npmjs.com](http://npmjs.com)   

Now, you can use the `$ ionic serve` runing a browser   
Then you can choose to run in a mobile phone or tablet


### Install ionic dependencies
```
$ ionic platform add ios 			## ios or android

$ ionic plugin add ionic-plugin-keyboard
$ ionic plugin add org.apache.cordova.splashscreen
$ ionic plugin add cordova-plugin-x-socialsharing
$ ionic plugin add cordova-plugin-statusbar
```

### Run

In the browser: 

```
$ ionic serve
```

In the emulate

```
$ ionic build ios 					## ios or android
$ ionic emulate ios 				## ios or android
```

In a mobile phone or tablet

```
$ ionic build ios 					## ios or android
									## Then compile and install to your phone or tablet
```


## Contacts

Rod: supgeek.rod(AT)gmail.com   
Giter: https://gitter.im/dev4living/hey-community   
QQ Group: 242078519   


## License
[GBLv3](http://www.gnu.org/licenses/gpl.html)
