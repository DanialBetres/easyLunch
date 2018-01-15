
$(document).ready(function () {

    $("#signupForm").submit(function (e) {
        e.preventDefault();

        console.log("form submitted");
        var formData = $('#signupForm').serializeArray();
        console.log("form data");
        console.log(formData);
        submitFormInfo(formData);
        return false;
    })

});

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
var number = document.getElementById('carSpace');

// Listen for input event on numInput.
//   number.onkeydown = function(e) {
//       if(!((e.keyCode > 95 && e.keyCode < 106)
//         || (e.keyCode > 47 && e.keyCode < 58) 
//         || e.keyCode == 8)) {
//           return false;
//       }
//   }

var authenticateWithFB = function () {

    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // ...
        }
        // The signed-in user info.
        var user = result.user;
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}


var arr;
var driverList = [];
var element = { 'driverName': "", 'passengers': [] };
var submitFormInfo = function (formData) {

    firebase.database().ref('people/' + formData[0].value + formData[1].value).set({
        firstname: formData[0].value,
        lastname: formData[1].value,
        spots: formData[2].value
    });

    alert("Cool, you signed up for lunch! Go to 'Driver List' for Driver List");


};

var sorting = firebase.database().ref('people/').orderByChild('spots');

var rootRef = firebase.database().ref().child("people").orderByChild("spots");
// console.log(JSON.stringify(rootRef));
window.onload = function () {

    rootRef.once('value').then(function (snapshot) {
        arr = Object.values(snapshot.val());
        arr.sort(function (a, b) {
            return b.spots - a.spots;
        });
        getDriverList();
    });

    var getDriverList = function () {
        var x = arr.length - 1;
        for (var i = 0; i < arr.length; i++) {
            element.driverName = arr[i].firstname + " " + arr[i].lastname;
            for (var j = 0; j < arr[i].spots; j++) {
                if (x > i) {
                    element.passengers.push(arr[x].firstname + " " + arr[x].lastname)
                    x--;

                } else {
                    break;
                }
            }
            driverList.push(element);
            element = { 'driverName': "", 'passengers': [] };

            if (x === i) {
                break;
            }

        }
        localStorage.setItem("driverList", JSON.stringify(driverList));

        for (var driver in driverList) {
            var passengerString = " ";
            for (var passenger in driverList[driver].passengers) {
                if (passenger < driverList[driver].passengers.length - 1) {
                    passengerString += driverList[driver].passengers[passenger] + ", ";
                } else {
                    passengerString += driverList[driver].passengers[passenger];
                }

            }
            $("#carInfo").append("<tr id='" + driverList[driver].driverName + "'> <td>" + driverList[driver].driverName + " </td>" + "<td>" + passengerString + " </td>" + "</tr>");
        }
    }
}