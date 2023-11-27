# WebRTC Tester - Frontend
This code is the frontend of the WebRTC Tester app.
- It is build in ReactJS (Typescript).
- This service is using `socket.io-client` for backend communication and `simple-peer` as a main depen.

## Installation & Setup
- Client cannot be working alone, it needs a webserver to serve it. So we have two options, one is to run using the development and the other is to use a custom webserver like NodeJS HTTP server, or NGINX.
1. First of all, let's grap the [https://github.com/Abdulrahman91kh/webrtc-tester](git repo). Use the following git command to clone the project
2. Install the server dependancies.
3. Build the typescript files (in case of not using the development server).
4. Start the server (custom server or the development one).
*The following commands are following these steps*
```
git clone https://github.com/Abdulrahman91kh/webrtc-tester.git
cd client && yarn install
```
- The following command would only be used in case of not using the development server
```
yarn run build
```
- The following command would only be used in case of using the development server
```
yarn start
```
  *Note:* You will need to have git installed as prerequisite for this step. For more info please check [https://docs.github.com/en/get-started](Github)

## How it is implemented?
- This service is using functional programing approach, while focusing on three main aspects (testability, error handling and separation of concerns).
### Folder Structure
| Folder | Role |
| ----- | ----- |
| componenets | which includes the common components that are shared between all pages.|
| config | main objects, instances that would be used more than once in the app such as `socket`, `BACKEND_ENDPOINT`. |
| containers | includes the common containers that are shared between all pages such as main layout. |
| hooks | includes the custom hooks for getting local-stream and WebRTC stuff used for cameras logic and tester logic as well. |
| pages | using `react-dom-router` we have two different pages, one holding the camera and the other for tester logic. |
| types | include all the interfaces and types of arguments and data used in the code |
| nginx.conf | this file is there for dockerizing the frontent, docker will use it as config for the webserver to serve all the routes of the app. |

### Next improvements
1. 1. Simple Peer better error handling (Cleaning up and providing more insights about the reason behind the error).
2. Cleanup after having a sockets error.
3. Cleanup after disconnecting.
4. Send errors that happen on the camera frontend side over sockets.
4. Enhance the the frontend preformance.
5. Introduce E2E testing.