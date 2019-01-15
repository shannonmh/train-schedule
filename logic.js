// Initialize Firebase
var config = {
    apiKey: "AIzaSyBYlVhujIK1u0PplftgdyGCqR4hvFHutTY",
    authDomain: "fire-demo-app-991ed.firebaseapp.com",
    databaseURL: "https://fire-demo-app-991ed.firebaseio.com",
    projectId: "fire-demo-app-991ed",
    storageBucket: "fire-demo-app-991ed.appspot.com",
    messagingSenderId: "285699672282"
};
firebase.initializeApp(config);

//create a variable reference to the database.
var database = firebase.database();

// Initial Values
var name = "";
var destination = "";
var firstTime = "";
var frequency = "";
// var nextTime = "";
// var minutesAway = "";

// Capture Button Click
$("#add-user").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTime = $("#firstTime-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // Code for "Setting values in the database"
    database.ref().push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("child_added", function (childSnapshot) {
    var train = childSnapshot.val();
    var trainRow = $('<tr>');
    var destinationRow = $('<tr>');
    var frequencyRow = $('<tr>');

    var nameCell = $('<td>').text(train.name);
    var destinationCell = $('<td>').text(train.destination);
    var frequencyCell = $('<td>').text(train.frequency);

    trainRow.append(nameCell);
    $('#name-display').append(trainRow);

    destinationRow.append(destinationCell);
    $('#destination-display').append(destinationRow);

    frequencyRow.append(frequencyCell);
    $('#frequency-display').append(frequencyRow);


    //console.log(childSnapshot.val());
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTime);
    console.log(childSnapshot.val().frequency);

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm a"));

    // // Difference between the times
    var diffTime = moment().diff(firstTimeConverted, "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    var remainder = diffTime % frequency;
    console.log(remainder);

    // // Minute Until Train
    var minutesAway = frequency - remainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // // Next Train
    var nextTime = moment().add(minutesAway, "minutes").format("hh:mm a");
    console.log("ARRIVAL TIME: " + moment(nextTime).format("hh:mm"));

    var nextTimeRow = $('<tr>');
    var minutesAwayRow = $('<tr>');

    var nextTimeCell = $('<td>').text(nextTime);
    var minutesAwayCell = $('<td>').text(minutesAway);

    nextTimeRow.append(nextTimeCell);
    $('#nextArrival-display').append(nextTimeRow);

    minutesAwayRow.append(minutesAwayCell);
    $('#minutesAway-display').append(minutesAwayRow);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

    // var firstTrainTime = moment(snapshot.val().firstTime);

    // console.log("First train time= " + firstTrainTime);

    //var tFrequency = 3;

    // Time is 3:30 AM
    //var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "HH:mm");
    // console.log(firstTimeConverted);

    // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    //  $("#name-display").append(snapshot.val().name);
    //  $("#destination-display").append(snapshot.val().destination);
    //  $("#firstTime-display").append(snapshot.val().firstTime);
    //  $("#frequency-display").append(snapshot.val().frequency);
    //console.log(firstTrainTime.diff(moment(), "minutes"));
});