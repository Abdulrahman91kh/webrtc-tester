# WebRTC Tester
Introduction
This app is build to test & analysis P2P connections using WebRTC. It shows all the Interactive Connection Establishment candidates, the selected pair and the route that was choosen for the P2P connection whether it is (Local, STUN, TURN, None of the previous options).

Since the WebRTC is happening at the client side, and it would require only a signaling backend, this project is leaning more towards Fronend development.

## Installation & Setup
1. First of all, let's grap the [https://github.com/Abdulrahman91kh/webrtc-tester](git repo). Use the following git command to clone the project
```
git clone https://github.com/Abdulrahman91kh/webrtc-tester.git
```
  *Note:* You will need to have git installed as prerequisite for this step. For more info please check [https://docs.github.com/en/get-started](Github)

2. Now you need to navigate to the project root folder and install start your docker containers, you can do it using: 
```
docker compose up
```
  *Note:* You will need to have docker installed as prerequisite for this step. For more info please check [https://docs.docker.com/get-started/](Docker);

The application will be running on port `8080`, so to test it. you will need to navigate from your browser to:
1. [http://localhost:8080/ping](http://localhost:8080/ping) for health check.
2. [http://localhost:8080](http://localhost:8080) for testers.
3. [http://localhost:8080/cameras](http://localhost:8080/cameras) for cameras.
4. You can change the port by editing it in the `./docker-compose.yaml`.

#### Manual Setup
-  If you aren't a docker fan, and you prefer to do the work yourself, you should follow these steps, otherwise just skip this section.
1. Install the frontend dependancies using the command `yarn install` | `npm install` in the `client` folder.
2. Build the frontend by using `yarn run build` | `npm run build` in the `client` folder.
3. Install the backend dependancies  using the command `yarn install` | `npm install` in the `server` folder. 
4. Build the frontend by using `yarn run build` | `npm run build` in the `server` folder.
5. Copy the artifacts in step 2 from `./client/build/` to the build folder of the backend `./server/build/public/`
6. Run the backend server by running `yarn start` | `npm start`.
- Now you are good to go and start. Happy Testing.

## How it works?
- After setting the app up.
- Open a tab to simulate a camera to and open this endpoint `http://localhost:8081/cameras` (give the page the permissions it needs).
- In another tab open the root endpoint (IT Admin) endpoint `http://localhost:8081/`.
- Within the IT Admin page, you will find cameras dropdown list select the camera needed to be tests.
- You would be required to enter camera credentials to connect to it (for the sake of this example, each camera ID will be its unique ID to have different passwords).
- You can use a testing button saying "Fill Me" to auto-fill the password then hit connect.
- You would see the current state of the app at the analysis section (Gathering Candidates, Connected, Not Connected ...etc).
- After finishing the negotiation, at the results section you will find the route that was selected and the selected pair candidates.

## How it is implemented?
### High Level Summary
- The application is built on:
  1. Frontend in ReactJS (Typescript) for WebRTC logic.
  2. Backend in NodeJS (Typescript) for signaling logic.
  3. Redis as data presistence storage.
- Please find [https://drive.google.com/file/d/1Tk81Bs4Atrv2ozK5Ea_5m-F_eFX5d0Vl/view?usp=sharing](this sequance diagram) to get more understanding of how the requests are going within the app.
### Frontend
- Is built using ReactJS in Typescript.
- The frontend is meant to have two different endpoints:
  1. `/cameras` Cameras endpoint, where the cameras would be waiting for testers to connected to.
  2. `/` Testers endpoint, where the IT Admins can connect to a pool of the available cameras using each camera password.

### Backend
- The backend is mainly working as a signalling server. It is using the sockets.io for communication with the frontend.
- The backend can support HTTP requests (ideally a REST API) using express.

### Next improvements
1. Simple Peer better error handling (Cleaning up and providing more insights about the reason behind the error).
2. Cleanup after having a sockets error.
3. Send errors that happen on the camera frontend side over sockets.
4. Enhance the the frontend preformance.
5. Introduce E2E testing.
6. Backend should have REST API to fallback if socket.io is not available during the signalling process.
7. Introduce a spinner when gathering candidates and authenticate before gathering candidates.