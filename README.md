# looplist-react-native
A React Native client for http://www.looplist.xyz

## The Backend API
The [backend](https://github.com/nsafai/looplist) uses Node.js, Express.js, and Socket.io routes with a MongoDB Database
  
  
## To-do list:
- [x] Implement routes
  - [x] If not logged in ([Switch Navigator](https://reactnavigation.org/docs/en/auth-flow.html))
    - [x] show `/login/` screen modal (which user can not dismiss)
    - [x] If a user does not have an account, they can navigate to `/signup` to create one

  - [x] If logged in, a user will see (Stack Navigator)
    - [x] List of checklists
    - [x] Detail view of checklist 
    
- [x] Build Flatlist of checklists
    - [x] fetch all list names
    - [x] allow user to click on a list name to pull up the Detail view
    
- [x] Build ChecklistDetail view
    - [x] fetch all todos
    - [x] allow user to toggle todo completion
    - [x] allow user to reset all todos
    
    - [ ] Stretch:
      - [ ] Use [socket.io instead](https://hackernoon.com/a-simple-messaging-app-with-react-native-and-socket-io-e1cae3df7bda)
      - [ ] fetch user to edit checklist title
      - [ ] allow user to edit todo
      - [ ] allow user to create new todo

## How to run
- Clone repo
- In your terminal:
`yarn install`
`yarn start`
