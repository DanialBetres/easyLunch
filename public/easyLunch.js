
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


var arr;
var driverList = [];
var element = {'driverName' : "", 'passengers': []};
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

    alert("Cool, you signed up for lunch! Go to 'Driver List' for Driver List");

    
};

var sorting = firebase.database().ref('people/').orderByChild('spots');

var rootRef = firebase.database().ref().child("people").orderByChild("spots");
// console.log(JSON.stringify(rootRef));
window.onload = function() {

    rootRef.on("child_added", function(snapshot){
        console.log(snapshot.val());

        var firstname = snapshot.child("firstname").val();
        var lastname = snapshot.child("lastname").val();
        var spots = snapshot.child("spots").val();
    // console.log(JSON.stringify(snapshot.val()));

    
        $("#table_body").append("<tr><td>" + firstname + "</td> <td>" + lastname + "</td> <td>" + spots + "</td></tr>");

    });

    rootRef.once('value').then(function(snapshot) {
        console.log(snapshot.val());
        arr = Object.values(snapshot.val());
        arr.sort(function(a,b) {
            return b.spots - a.spots;
        });
        console.log(arr);
        getDriverList();
    });

    var getDriverList = function () {
        var x = arr.length - 1;
        for(var i = 0; i <arr.length; i ++){
            element.driverName = arr[i].firstname + " " + arr[i].lastname;
            for(var j = 0; j < arr[i].spots; j ++){
                if(x > i){
                    element.passengers.push(arr[x].firstname + " " + arr[x].lastname)
                    x --;
                    
                }else {
                    break;
                }
            }
            driverList.push(element);
            element = {'driverName' : "", 'passengers': []};
            
            if(x === i){
                break;
            } 
            
        }
        localStorage.setItem("driverList", JSON.stringify(driverList));
        console.log(driverList);

        for(var driver in driverList) {
            var passengerString = " ";
            for(var passenger in driverList[driver].passengers){
                if(passenger < driverList[driver].passengers.length -1) {
                    passengerString += driverList[driver].passengers[passenger] + ", ";
                } else{
                    passengerString += driverList[driver].passengers[passenger];
                }

            }
            console.log(passengerString);
            $("#carInfo").append("<tr id='" +driverList[driver].driverName+"'> <td>" + driverList[driver].driverName+ " </td>"  + "<td>" + passengerString+ " </td>" +  "</tr>");
        }
    }
}