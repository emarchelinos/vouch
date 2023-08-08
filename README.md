
# Vouch Technical Test - Fullstack Dev

This is submission from Erick Marchelino Suyanto (emarchelinos@gmail.com).

This project is consisting of three docker image:
 - Backend (express, socket.io)
 - Frontend (React)
 - MongoDb

## Submission Information

#### Date of submission

8 August 2023

#### Instructions to run assignment locally 

```bash
  docker-compose up --build
```
Then open `localhost:3000` in your browser

#### Time spent 
More or less 12 hours including researching on Socket.io. I actually never use Socket.io before, I only use `pusher` or `soketi`

#### Assumptions Made
N/A

#### Shortcuts/Compromises made 
 - Design is not 100% similar
 - Web socket server and API is within one repo, in my opinion I should separate the WSS and API server

#### If applicable. Did you do something that you feel could have been done better in a real-world application? Please let us know. 
 - Standalone server for WSS
 - Design should be responsive
 - Use basic token auth to access our API, so at least our API can only be consumed by the frontend

#### What would be your approach to ensuring the application is ready for production (testing)?
 - Do a load testing to ensure our server capacity is enough
 - Initiate unit testing to reduce bug in future development

#### How would you ensure a smooth user experience as 1000’s of users start using your app simultaneously?
 - Do a load testing to ensure our server capacity is enough
 
#### What key steps would you take to ensure application security?
 - Assuming this app will be open for anyone, at least I will implement basic token auth to access our API, so at least our API can only be consumed by the frontend

#### What did you not include in your solution that you want us to know about? Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it. 
 - Separating WSS
 - Make it compatible for mobile device (react native)

#### Your feedback on this technical challenge
 - Explanation on the design could be better, e.g: Need to be compatible for device
 - Breakdown the feature and put a point for every feature, so at least we can prioritize the big points first
 - Add a bonus features for additional point