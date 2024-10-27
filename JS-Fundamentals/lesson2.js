//Concatination and Interpolation
var price = 10;
var itemName = "Cup";
var messToPrint1 = "The price for your " +itemName+ " is " +price+ " dollars"; //Concatination
var messToPrint2 = `The price for your ${itemName} is ${price} dollars`; //Interpolation

console.log(messToPrint1);
console.log(messToPrint2);