# WebRTC Tester - Backend
This service is working as a signaling server for the WebRTC Tester app.
- It is build in NodeJS (Typescript).
- This service is using socket.io for frontend communication and using Express to serve the frontend static files.

## Installation & Setup
1. First of all, let's grap the [https://github.com/Abdulrahman91kh/webrtc-tester](git repo). Use the following git command to clone the project
2. Install the server dependancies.
3. Build the typescript files.
4. Start the server.
*The following commands are following these steps*
```
git clone https://github.com/Abdulrahman91kh/webrtc-tester.git
cd server && yarn install
yarn run build
yarn start
```
  *Note:* You will need to have git installed as prerequisite for this step. For more info please check [https://docs.github.com/en/get-started](Github)
  
- The application will be running on port `3001`, as a health check, try to send HTTP request to the following endpoint:
`http://localhost:3001/ping` and expect the response to be `{status: "error", message: "pong"}`.
  *Note: You may need to change the port if it was changed in the .env variable*.

- You can also run a docker contianer by building an image of this service `Dockerfile`.

## How it is implemented?
- This service is using functional programing approach, while focusing on three main aspects (testability, error handling and separation of concerns).
### Folder Structure
| Folder | Role |
| ----- | ----- |
| config | main objects, instances that would be used more than once in the app such as `redisClient` and `logger` (only `redisClient` is used in this code).|
| services | includes the business logic of the code and it should throw errors if there is any. |
| sockets | This folder contains the code that concerns anything related to the sockets.io, initiating and event handling, within the event handler we are trying only to dispatch services with error handler wrapping it. So it is coordinating the inputs and outputs without including any business logic. |
| storage | holds the code that is related to data presistance. In out case the code that is interacting with Redis. No business logic here. |
| types | include all the interfaces and types of arguments and data used in the code |
| app.ts | which is the entry point and initiator of the server. |
| .env | there are three used environment variables, the server port, redis host, redis port. |

### Next improvements
1. Backend should have REST API to fallback if socket.io is not available during the signalling process