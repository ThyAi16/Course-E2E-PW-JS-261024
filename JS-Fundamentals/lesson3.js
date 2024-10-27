//1. Objects
var Customer = {
    firstName: "Peter",
    lastName: "Smith",
    car: ["Vinfast", "Tesla", "Toyota"]
}

//Method 1
//console.log(Customer);
console.log(Customer.car[0]);
//console.log(Customer.firstName);
//Method 2
//Dot notation
Customer.firstName = "Mike";
//Bracket notation
Customer['lastName'] = "Silver";
//console.log(`${Customer.firstName} ${Customer.lastName}`);

//2. Array
var car = ["Vinfast", "Tesla", "Toyota"];
car[2] = "BMW"; //Change the value
console.log(car[2]);
