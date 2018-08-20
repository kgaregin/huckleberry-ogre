### Huckleberry Ogre playground website
* required global dependencies:
```
npm i typescript -g
npm i ts-node-dev -g
npm i webpack -g
```
* then just ```npm run client``` for webpack watch service and ```npm run server``` for server to start, or ```npm start``` to start both (utilizing npm-run-all package). 

* website available on **http://localhost:3001**

#### For windows users:
* if node-gyp fails to find Python, run powershell as administrator and execute:
```
npm i -g --production windows-build-tools
```
* if you're behind corporate proxy, having "self signed certificate in certificate chain" error, this will help:
```
npm config set ca "";
npm config set strict-ssl false;
set NODE_TLS_REJECT_UNAUTHORIZED=0
```