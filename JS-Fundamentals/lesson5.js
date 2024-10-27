//Logical "And"
//console.log(true && false) //all values have to be True for expression to be True

//Logical "Or"
//console.log(false || false) //any value should be True or False for the expression to be True

var ageIsMoreThanEighteen = false;
var isUSCitizen = false;
var eligibilityForDriveLicense = ageIsMoreThanEighteen && isUSCitizen;

//console.log('This customer is eligible for DL: ' + eligibilityForDriveLicense);

//Logical "Not"
//console.log(!true);
//console.log( 8 !== 7 );

//Condition Statement
//1. If hour between 6 and 12 print "Good Morning"
//2. If hour between 12 and 18 print "Good Afternoon"
//3. Otherwise: Good Evening

var hour = 9;

if ( hour >= 6 && hour <= 12) {
    console.log("Good Moring");
}
else if ( hour >= 12 && hour <= 18) {
    console.log("Good Afternoon");
}
else {
    console.log("Good Evening");
}

