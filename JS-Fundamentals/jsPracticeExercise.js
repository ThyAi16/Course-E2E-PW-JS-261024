//Method 1: Function with arguments
function recommendedCar(familySize, plannedDistanceToDrive) {
    if(familySize <= 4 && plannedDistanceToDrive <= 200)
    {
        console.log("Tesla");
    }
    else if (familySize <= 4 && plannedDistanceToDrive >= 200) {
        console.log("Toyota Camry");
    }
    else {
        console.log("Minivan");
    }
}
recommendedCar(2, 200);

//Methods 2: Function with return
function recommend(family, plan) {
    var result;
    if(familySize <= 4 && plannedDistanceToDrive <= 200)
        {
            console.log("Tesla");
        }
        else if (familySize <= 4 && plannedDistanceToDrive >= 200) {
            console.log("Toyota Camry");
        }
        else {
            console.log("Minivan");
        }
    return result;
}
var myReturn = recommend(2, 200);
console.log(myReturn);

