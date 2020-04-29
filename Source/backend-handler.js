import React from 'react';
import firebase from 'firebase';

var config = {
  databaseURL: 'https://ims-app-40ecf.firebaseio.com',
  projectId: 'ims-app-40ecf',
};
// If there is no initialized connecting to firebase we make one.
if (!firebase.apps.length) {
  console.log('Initialiazing firebase config');
  firebase.initializeApp(config);
}

// To store sessions under a datetime. This needs to be changed based on how we handle a driving session

let sessionRef = getCurrentDate();

const dbFunctions = {
  // Push x and y coordinates to /Current DateTime ref / positions
  pushNewPosition: function(x, y, didCollide) {
    sessionRef = getCurrentDate();
    pushToDatabase(x, y, didCollide);
  },

  retriveData: function() {
    return getData();
  },
  // handleMessage: function(message) {
  //   receiveMessage(message);
  // },

  continueSession: function(x, y, didCollide) {
    sesseionRef = getLastSession();
    pushToDatabase(x, y, didCollide);
  },
};

function getCurrentDate() {
  var today = new Date();
  var date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  var dateTime = date + ' ' + time;
  return dateTime;
}
function pushToDatabase(x, y, didCollide) {
  console.log('In set new position');
  let ref = '/Sessions/' + sessionRef;
  firebase
    .database()
    .ref(ref)
    .push({
      xValue: x,
      yValue: y,
      collision: didCollide,
    })
    .then(data => {
      // Success callback
      console.log('Data stored under ref: ', sessionRef);
    })
    .catch(error => {
      // Error callback
      console.log('Error storing data: ', error);
    });
}
function getData() {
  console.log('In getData()');
  var database = firebase.database().ref('/Sessions');
  let positionsArray = [];
  database.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      let position = {
        date: '',
        id: '',
        location: [],
      };
      position.date = childSnapshot.key;
      childSnapshot.forEach(function(grandChild) {
        position.id = grandChild.key;
        let coordinates = {
          didCollide: grandChild.val().collision,
          xValue: grandChild.val().xValue,
          yValue: grandChild.val().yValue,
        };
        position.location.push(coordinates);
      });
      positionsArray.push(position);
    });
  });
  console.log('Returning Position array');
  return positionsArray;
}

function getLastSession() {
  var arr = [];
  arr = getData();
  const index = parseInt(arr.length - 1);
  let ref = '';
  ref = arr[index].date;
  console.log('LastSessionRef = : ', arr[index].date);
  console.log('Returning ref:', ref);
  return ref;
}

// function receiveMessage(message) {
//   let posX = 0;
//   let posY = 0;
//   let didCollide = false;
//   let colX = 0;
//   let colY = 0;
//   if (message[4] == '3') {
//     posX = intParser(message, 5, 2);
//     console.log('PosX: ', posX);
//   } else {
//     posX = intParser(message, 4, 3);
//   }
//   if (message[7] == '3') {
//     posY = intParser(message, 8, 2);
//   } else {
//     posY = intParser(message, 7, 3);
//   }
//   if (message[10] == '1') {
//     didCollide = true;
//   }
//   console.log('Posy: ', posY);
//   console.log('didCol: ', didCollide);
//   console.log('ColX: ', colX);
//   console.log('coly: ', colY);

//   pushToDatabase(posX, posY, didCollide);
// }

// To use functions under dbFunctions
// 1. import dbHandler from '../Source/backend-handler.js'
// 2. dbHandler.function()
export default dbFunctions;
