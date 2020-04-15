import React from 'react'
import firebase from 'firebase';

var config = {
    databaseURL: "https://ims-app-40ecf.firebaseio.com",
    projectId: "ims-app-40ecf"
}
// If there is no initialized connecting to firebase we make one. 
if(!firebase.apps.length){
    firebase.initializeApp(config);
  }

// To store sessions under a datetime. This needs to be changed based on how we handle a driving session
let sessionRef = getCurrentDate();

const dbFunctions = {

    // Push x and y coordinates to /Current DateTime ref / positions
    pushNewPosition: function(x, y){
        console.log("In set new position")
        let ref = '/Sessions/' + sessionRef + '/positions';
        firebase.database().ref(ref).push({
            xValue: x,
            yValue: y
        }).then((data)=>{
            // Success callback
            console.log("Data stored: ", data)
        }).catch((error)=>{
            // Error callback
            console.log("Error storing data: ", error)
        })
    },

    // Pushing up a new x and y value under /Current DateTime / Collision
    pushNewCollision: function(x, y){
        console.log("In set new position")
        let ref = '/Sessions/' + sessionRef + '/collisions';
        firebase.database().ref(ref).push({
            xValue: x,
            yValue: y
        }).then((data)=>{
            // Success callback
            console.log("Data stored: ", data)
        }).catch((error)=>{
            // Error callback
            console.log("Error storing data: ", error)
        })
    },

    // This will be changed, stolen from my app to remeber how to handle incoming objects. 
    getWorkouts: function(){
        let workOutsArray = []
        firebase.database().ref('/Workouts').once('value', function(snapshot){
            snapshot.forEach(function(childSnapshot){
            let workout = {
                workoutTitle: "",
                exercises: []
            }
            workout.workoutTitle = childSnapshot.key;
            childSnapshot.forEach(function(grandChild){
                let exercise = {
                exerciesTitle: grandChild.key,
                sets: grandChild.val().Set,
                reps: grandChild.val().Reps,
                weight: grandChild.val().Weight
                }
                workout.exercises.push(exercise)
            })
            workOutsArray.push(workout)
            console.log("WorkoutsArray: ", workOutsArray[0].exercises)
            })
        })
    }
}
// Returns a string with YYYY-MM-DD HH-MM-SS
function getCurrentDate(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}
// To use functions under dbFunctions
// 1. import dbHandler from '../Source/backend-handler.js'
// 2. dbHandler.function()
export default dbFunctions;