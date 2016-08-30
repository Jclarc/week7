
// Created a new database just for this app so it doesn't interrupt others **jtc**
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCsybl5c5qrZkRQs-2ww_HiHScWlkROnjk",
    authDomain: "myproject-a14f2.firebaseapp.com",
    databaseURL: "https://myproject-a14f2.firebaseio.com",
    storageBucket: "myproject-a14f2.appspot.com",
};
firebase.initializeApp(config);

var database = firebase.database();


$("#submit").on("click", function(e){
    e.preventDefault();
    // get input
    var trainName = $("#name").val().trim();
    var dest = $("#desto").val().trim();
    var start = moment($("#first").val().trim(), "HH:mm").format("HH:mm");
    var freq = $("#freq").val().trim();
    var newTrain = {
        name:  trainName,
        place: dest,
        start: start,
        rate: freq
    };
    database.ref().push(newTrain);
    clear();
    return false;
});


database.ref().on("child_added", function(childSnapshot){

    //start time
    var firstTime = moment(childSnapshot.val().start,"HH:mm").subtract(1, "years");

    var secTime = moment().diff(moment(firstTime), "minutes");

    var alert = secTime % childSnapshot.val().rate;

    var timeTill = childSnapshot.val().rate - alert;

    var nextTrain = moment().add(timeTill, "minutes");

    // append to table
    $("#table > tbody").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().place + "</td><td>" + childSnapshot.val().rate + "</td><td>" + (moment(nextTrain).format("hh:mm")) + "</td><td>" + timeTill + "</td></tr>");

});
//function to clear values
function clear (){
    $("#name").val("");
    $("#desto").val("");
    $("#first").val("");
    $("#freq").val("");
}