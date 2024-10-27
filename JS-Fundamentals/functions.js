//Declarative function
function helloEveryOne() {
    console.log('Hello Everyone');
}
helloEveryOne();

//Anoymus function: an danh
var helloMn = function() {
    console.log("Hello Mn");
}
helloMn();

//ES6 function syntax arrow function
var helloYou = () => {
    console.log("Hello you");
}
helloYou();

//Function with arguments
function printName(name) {
    console.log(name);
}
printName('Mike');

//Function with return
function multiplyByTwo(number) {
    var result = number * 2;
    return result;
}
var myResult = multiplyByTwo(5);
console.log(myResult);

//Import function
import { printAge } from "../Help/Print.js";
printAge(5);

import { printFirstName } from "../Help/Print.js";
printFirstName('Thy Ai is study Javascript');

//Import everything
import * as helper from '../Help/Print.js';
helper.printAge(18);
