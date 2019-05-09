# looplist-react-native
A React Native client for http://www.looplist.xyz

## The Backend API
The [backend](https://github.com/nsafai/looplist) uses Node.js, Express.js, and Socket.io routes with a MongoDB Database

## How to run
- Clone repo
- In your terminal:
`yarn install`
`yarn start`

## Notes on re-deploying a new version to TestFlight / App Store or Play Store
[How To](https://codeburst.io/how-to-deploy-a-create-react-native-app-to-the-appstore-229a8fa36fb1)

(1) Update version number in `app.json`

(2)
Run
```
$ exp build:ios  // or
$ exp build:android
```

(3) Click links provided when (2) completes and download the build(s)

(4) Xcode > (Menu)Xcode > Open Deverloper Tools > Application Loader > Go to [Generate app specific password](https://appleid.apple.com/)

(5) Once in, choose and upload build from (3) 

(6) Go to [App Store Connect](https://appstoreconnect.apple.com/) > My Apps > Loop List (> TestFlight, for beta)

(Note: If you need to manage certificates [go here](https://developer.apple.com/account/ios/profile/)

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
    
    - [x] Stretch:
      - [x] Use [socket.io instead](https://hackernoon.com/a-simple-messaging-app-with-react-native-and-socket-io-e1cae3df7bda)
      - [x] allow user to create new list
      - [x] allow user to delete list
      - [x] allow user to create new todo
      - [x] allow user to edit checklist title
      - [x] allow user to edit todo
      - [ ] add [swipe to delete](https://medium.com/@bdougie/adding-swipe-to-delete-in-react-native-cfa85a5f5a31)