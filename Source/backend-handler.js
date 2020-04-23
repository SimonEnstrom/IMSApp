import React from 'react'
import firebase from 'firebase';

var config = {
    databaseURL: "https://ims-app-40ecf.firebaseio.com",
    projectId: "ims-app-40ecf"
}
// If there is no initialized connecting to firebase we make one. 
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

// To store sessions under a datetime. This needs to be changed based on how we handle a driving session
let sessionRef = getCurrentDate();

const dbFunctions = {

    // Push x and y coordinates to /Current DateTime ref / positions
    pushNewPosition: function (x, y, didCollide) {
        console.log("In set new position")
        let ref = '/Sessions/' + sessionRef;
        firebase.database().ref(ref).push({
            xValue: x,
            yValue: y,
            collision: didCollide
        }).then((data) => {
            // Success callback
            console.log("Data stored: ", data)
        }).catch((error) => {
            // Error callback
            console.log("Error storing data: ", error)
        })
    },

    retriveData: function () {
        var database = firebase.database().ref('/Sessions');
        let positionsArray = [];
        database.on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let position = {
                    date: "",
                    id: "",
                    location: "",
                }
                position.date = childSnapshot.key;
                childSnapshot.forEach(function (grandChild) {
                    position.id = grandChild.key;
                    let coordinates = {
                        didCollide: grandChild.val().collision,
                        xValue: grandChild.val().xValue,
                        yValue: grandChild.val().yValue
                    }
                    position.location = coordinates;
                })
                positionsArray.push(position);
            })
        })
        return positionsArray;
    },

    handleMessage: function (message) {
        // TODO To get subString use .substr(start, lenght)
        // [0] 2 Start of message
        // [1] 0 message from mower
        // [2] drive mode
        // [3] drive command
        // [4] posX if [4] == 3 then take [5] and [6] only
        // [7] pos Y -- || -- [8] and [9]
        // [10] 0/1 true false for collision
        // [11] colX if collission handle as pos [12] [13]
        // [14] colY -- || -- [15] [16]
        // [17] 3 end of message
        let posX = 0;
        let posY = 0;
        let didCollide = false;
        let colX = 0;
        let colY = 0;
        if (message[4] == '3') {
            posX = intParser(message, 5, 2);
            console.log("PosX: ", posX);
        }
        else {
            posX = intParser(message, 4, 3);
        }
        if (message[7] == '3') {
            posY = intParser(message, 8, 2);
        }
        else {
            posY = intParser(message, 7, 3);
        }
        if (message[10] == '1') {
            didCollide = true;
        }
        console.log("Posy: ", posY);
        console.log("didCol: ", didCollide);
        console.log("ColX: ", colX);
        console.log("coly: ", colY);

        this.pushNewPosition(posX, posY, didCollide);
    }
}
// Returns a string with YYYY-MM-DD HH-MM-SS
function intParser(message, start, lenght) {
    return parseInt(message.substr(start, lenght))
}

function getCurrentDate() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    return dateTime;
}
// To use functions under dbFunctions
// 1. import dbHandler from '../Source/backend-handler.js'
// 2. dbHandler.function()
export default dbFunctions;