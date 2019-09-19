var firebaseConfig = {
    apiKey: "AIzaSyB3Km6UBOjfhdWUU8kF4xNEhbiY1nAKCHU",
    authDomain: "project-1-e6691.firebaseapp.com",
    databaseURL: "https://project-1-e6691.firebaseio.com",
    projectId: "project-1-e6691",
    storageBucket: "",
    messagingSenderId: "733485990684",
    appId: "1:733485990684:web:f1c4f406e9ad27ef5ef0d9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

// makes it so when you click button with id of add-train-btn button something happens.
  $("#add-train-btn").on("click", function(event){
    event.preventDefault();// keeps page from refreshing

    //captures values from HTML
   var name= $("#train-name-input").val().trim();//sets button value
   var destination= $("#destination-input").val().trim();
   var time = $("#time-input").val().trim();
   var frequency = $("#frequency-input").val().trim();

   console.log(name, destination, time, frequency);

var addTrain = {
  name: name,
  destination: destination,
  time : time,
  frequency: frequency,
}

   database.ref().push({// pushes values to a location in the database. Saves it to the database
       name: name,
       destination: destination,
       time : time,
       frequency : frequency,
   })
   database.ref().on("child_added", function(snapshot){

      var name= snapshot.val().name;
      var destination= snapshot.val().destination;
      var time = snapshot.val().time;
      var frequency = snapshot.val().frequency;


      var remainder = moment().diff(moment.(time),"minutes")%frequency;
      var minutesAway = frequency - remainder;
      var nextArrival = moment().add(minutesAway,"m").format("hh:mm A");

  //create a table row
      var row = $("<tr>");
      
      row.append(
      $("<td>").text(name), 
      $("<td>").text(destination), 
      $("<td>").text(frequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway),
     );

  $("tbody").append(row);

   })

 
  })