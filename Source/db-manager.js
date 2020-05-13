import React from 'react';
import firebase from 'firebase';
// import localStorage from '../Source/localStorage';

var config = {
  databaseURL: 'https://ims-app-40ecf.firebaseio.com',
  projectId: 'ims-app-40ecf',
};
// If there is no initialized connecting to firebase we make one.
if (!firebase.apps.length) {
  console.log('Initialiazing firebase config');
  firebase.initializeApp(config);
}
let sessionRef = getCurrentDateTime();
// Returns all Sessions keys
// Ex keys[0] = 2020-04-29 13:26:54
function getSessions() {
  var database = firebase.database().ref('/Sessions');
  let keys = [];
  database.on('value', function(snapshot) {
    snapshot.forEach(function(childsnap) {
      keys.push(childsnap.key);
    });
  });
  return keys;
}
//Returns an array with all points under a session key
//Ex points[0] = {x: 127, y: 127, didCollide: false}
function getData(keyRef) {
  const ref = '/Sessions/' + keyRef;
  var database = firebase.database().ref(ref);
  let points = [];
  database.on('value', function(snapshot) {
    snapshot.forEach(function(childsnap) {
      let point = {
        x: childsnap.val().xValue,
        y: childsnap.val().yValue,
        didCollide: childsnap.val().collision,
      };
      points.push(point);
    });
  });
  return points;
}
// Stroing under the the global variabel sessionRef.
// The sender of coordinates should use the function startNewSession()
// before ever using this function
function pushToNewSession(x, y, didCollide) {
  let ref = '/Sessions/' + sessionRef;
  var point = {
    x: x,
    y: y,
    didCollide: didCollide,
  };

  // localStorage.update(point);

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
// Pushes new positions under the last session created.
function pushToLatestSession(x, y, didCollide) {
  let lastSession = getLastSessionKey();
  let ref = '/Sessions/' + lastSession;
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

// Retreives the keys for all sessions and returns the last
function getLastSessionKey() {
  let keys = getSessions();
  return keys[keys.length - 1];
}

const publics = {
  tester: function() {
    let keys = getSessions();
    console.log(keys);
  },
  getLastSessionPath: function() {
    let key = getLastSessionKey();
    return getData(key);
  },
  // Use get all sessions function to get all keys, and use this function with
  // chosen key to get path for an older session
  getOtherSession: function(key) {
    return getData(key);
  },
  getAllSession: function() {
    return getSessions();
  },

  //Sets the global variabel sessionRef to dateTime
  startNewSession: function() {
    sessionRef = getCurrentDateTime();
  },
  pushToLatestSession: function(x, y, didCollide) {
    pushToLatestSession(x, y, didCollide);
  },
  pushToNewSession: function(x, y, didCollide) {
    pushToNewSession(x, y, didCollide);
  },
};

// Retruns a string of current dateTime YYYY-MM-DD HH:MM:SS
function getCurrentDateTime() {
  var today = new Date();
  var y, m, d, h, min, sec;
  y = today.getFullYear();
  m = today.getMonth() + 1;
  d = today.getDate();
  h = today.getHours();
  min = today.getMinutes();
  sec = today.getSeconds();
  m = m > 9 ? m : '0' + m;
  d = d > 9 ? d : '0' + d;
  h = h > 9 ? h : '0' + h;
  min = min > 9 ? min : '0' + min;
  sec = sec > 9 ? sec : '0' + sec;
  console.log('m = ', m);
  var date = y + '-' + m + '-' + d;
  var time = h + ':' + min + ':' + sec;
  var dateTime = date + ' ' + time;
  return dateTime;
}

export default publics;
