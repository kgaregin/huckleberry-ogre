## Huckleberry Ogre playground website
### To start the project you will need:
```
npm i ts-node-dev -g
npm i webpack -g
npm install npm-run-all -g
```   

### For windows users:
if node-gyp fails to find Python, run powershell as administrator and execute:
```
npm install -g --production windows-build-tools
```
if you're behind corporate proxy, having "self signed certificate in certificate chain" error, this will help:
```
npm config set ca "";
npm config set strict-ssl false;
set NODE_TLS_REJECT_UNAUTHORIZED=0
```