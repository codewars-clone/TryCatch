// Finding the messages in a selected chat:

// export default (rooms, roomName) => {
//   const a =  rooms.filter((room) => room.name === roomName)[0];
//   const b = a ? a.messages : "Loading...";
//   // console.log(a);
//   return b;
// }


// Structure fo the dummy data

// export const createRoom = ({ id, name, people, messages = [] }) => ({
//   type: 'CREATE_ROOM',
//   room: {
//     id,
//     name,
//     people,
//     messages
//   }
// });



// export const sendMessage = (message, roomName) => ({
//   type: 'SEND_MESSAGE',
//   message,
//   roomName
// });



// -----REDUCER----

// export default (state=defaultState, action) => {
//   switch(action.type) {
//     case 'CREATE_ROOM':
//       return [...state, action.room];
//     case 'JOIN_ROOM':
//       return state.map((room) => {
//         if(room.name === action.roomName) {
//           return {
//             ...room,
//             people: [...room.people, action.person]
//           }
//         }
//         else {
//           return room;
//         }
//       });

// Sort messages by createAT

// case 'ORDER_ROOMS_START_STATE':
//   //  const x =  action.rooms.sort((a, b) => {
//   //   //  console.log('a', a);
//   //   //  console.log('b', b);
//   //   if(a.messages.length > 0 && b.messages.length > 0) {
//   //     console.log(typeof a.messages);
      
//   //     return moment(a.messages[a.messages.length-1].createdAt) > moment(b.messages[b.messages.length-1].createdAt) 
//   //     // {
//   //   //     return -1;
//   //   //   } else {
//   //   //     return 1;
//   //   //   }
//   //   // }
//   //   // else {
//   //   //   return -1;
//   //   }
//   // });
//   // console.log(typeof x)      
//   // console.log(x);
//   // return x;
//   state.sort((a,b) => {
//       return moment(a.messages[a.messages.length-1].createdAt) < moment(b.messages[b.messages.length-1].createdAt);
//   });
//   // console.log(state);
//   return state.map((room) => room);


// logic for room

// case 'ON_JOINED': 
// return state.map((room) => {
//   if(room.name === action.roomName) {
//     room.people.push(action.person);
//     return room;
//   } else {
//     return room;
//   }
// });


// export const clearUnread = (roomName, uid, time, unread) => ({
//   type: 'CLEAR_UNREAD',
//   roomName,
//   uid,
//   time,
//   unread
// });


// case 'CLEAR_UNREAD':
//   return state.map((room) => {
//     if(room.name === action.roomName) {
//       const people = room.people.map((p) => {
//         if(p.id === action.uid) {
//           return {
//             ...p,
//             unread: action.unread,
//             lastRead: action.time
//           }
//         } else {
//           return p;
//         }
//       });
//       return {...room, people}
//     } else {
//       return room;
//     }
//   });


// SEND MESSAEG -----


// export const sendMessage = (message, roomName) => ({
//   type: 'SEND_MESSAGE',
//   message,
//   roomName
// });