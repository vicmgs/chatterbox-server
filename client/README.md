## Project Setup

## API DOC

domain url: https://api.parse.com/

| TYPE  | URL   | ARGUMENT  | RETURN VALUE  |
|-------|-------|-----------|---------------|
| GET | /1/classes/messages | | Messages array with 100 messages stored under results property |
| POST | /1/classes/messages | username, text, roomname | Promise | 

### Message from Server
```javascript
{
  createdAt: 'timestamp',
  objectId: 'id',
  text: 'string',
  updatedAt: 'timestamp',
  username: 'string'
}
```

### Message to Server
```javascript
{
  username: 'string',
  text: 'string',
  roomname: 'string'
}
```

## Structure

### App.js

Handles the overlying logic for the application. All the timers and the initial startup.

- [x] Create the HttpService and start fetching data every N ms
- [x] Create a ChatModel and update its content with data from HttpService every N ms

### ChatModel.js

Contains all logic for how to present and send messages

- [x] Click event for sending new messages
- [x] Render function to display an array of messages

### HttpService.js

Handles all Http requests and filters out unwanted messages, and keeps track of static data like username

- [x] getNewMessages - populate messages['room'].messages arrays
- [x] getRooms - returns all chatrooms as an array 
- [x] getRoom(roomName) - returns all messages from given room
- [x] sendMessage(msgTxt, roomName) - 

## Todo

- [x] Test API and create API doc
- [x] Create a basic GUI for the app
- [x] Get all the rooms
- [x] Get messages from the room
- [x] Post a new message to the room
- [x] Display chat for a room
- [x] Create a new room
- [ ] Add friends logic


