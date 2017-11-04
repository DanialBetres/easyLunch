
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBj0fmUkMvl4stRridgYwA3amvW36HpmcQ",
    authDomain: "easy-lunch-523f4.firebaseapp.com",
    databaseURL: "https://easy-lunch-523f4.firebaseio.com",
    projectId: "easy-lunch-523f4",
    storageBucket: "",
    messagingSenderId: "286970043586"
  };
  firebase.initializeApp(config);

console.log("test!!");

var getFormInfo = function() {
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var driving = document.getElementById("isDriver").checked;
    var notdriving = document.getElementById("isntDriver").checked;
    var spots = document.getElementById("carSpace").value;

    console.log (firstname + lastname + driving + notdriving + spots);

    firebase.database().ref('people/' + firstname + lastname).set({
        firstname: firstname,
        lastname: lastname,
        driving: driving,
        spots: spots
    });
};

var getDrivers = function(){
    var info;
    firebase.database().ref('/people/').once('value').then(function(snapshot) {
        var info = JSON.stringify(snapshot.val());
        document.getElementById('yay').innerHTML = info;
        
      });
};