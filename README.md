### Huckleberry Ogre playground website
#### Note: as project grows, I decided to move it to bitbucket*. For the latest version, write me kgaregin@gmail.com
###### \* GitHub doesn't offer any easy-to-use solutions for storing sensitive data and I don't want to separate this data with repository in purpose to make faster deployment process.

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
