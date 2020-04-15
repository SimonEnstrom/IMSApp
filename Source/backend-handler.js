import React from 'react'
import firebase from 'firebase';

var config = {
    databaseURL: "https://ims-app-40ecf.firebaseio.com",
    projectId: "ims-app-40ecf"
}
if(!firebase.apps.length){
    firebase.initializeApp(config);
  }

let sessionRef = getCurrentDate();

const dbFunctions = {

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

function getCurrentDate(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}

export default dbFunctions;