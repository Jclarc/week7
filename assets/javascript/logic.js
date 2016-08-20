
// Created a new database just for this app so it doesn't interrupt others **jtc**
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDPKDNOWQRrOosLLIA4CKPCp00pcxfEsR4",
    authDomain: "empdata-17990.firebaseapp.com",
    databaseURL: "https://empdata-17990.firebaseio.com",
    storageBucket: "empdata-17990.appspot.com",
};
firebase.initializeApp(config);


var dataRef = firebase.database();


// Initial Values
var name = "";
var role = "";
var startDate ="";
var monthsWorked=0;
var monthlyRate = 0;
var billed=0;


// Capture Button Click
$("#addUser").on("click", function() {

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Dont forget to provide initial data to your Firebase database.

    name = $('#employeeName').val().trim();
    role = $('#role').val().trim();
    startDate = $('#startDate').val().trim();
    monthlyRate = $('#monthlyRate').val().trim();


    // Code for the push
    dataRef.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthsWorked: monthsWorked,
        monthlyRate: monthlyRate,
        billed: billed,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    // Don't refresh the page!
    return false;
});

//Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function(childSnapshot) {
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().monthsWorked);
    console.log(childSnapshot.val().monthlyRate);
    console.log(childSnapshot.val().billed);
    //  console.log(childSnapshot.val().dateAdded);
    console.log(moment());

    $("#emps").append("<tr><td id='empName'> "+childSnapshot.val().name+"</td> <td id='empRole'> "+childSnapshot.val().role+"</td> <td id='startD'> "+childSnapshot.val().startDate+"</td><td id='monthsWorked'> "+childSnapshot.val().monthsWorked+"</td><td id='monthsWorked'> "+childSnapshot.val().monthlyRate+"</td><td id='monthsWorked'> "+childSnapshot.val().billed+"</td></tr>");


// Handle the errors
}, function(errorObject){
    console.log("Errors handled: " + errorObject.code)
});


