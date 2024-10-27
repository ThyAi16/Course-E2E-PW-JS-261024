export function printAge( age) {
    //console.log(age);
}
export function printFirstName(firstName) {
    //console.log(firstName);
}

//Class and Method
//Methods 1
export class CustomerDetails {
    printFirstName(firstName) {
        //console.log(firstName);
    }
    printLastName(lastName) {
        //console.log(lastName);
    }
    printAge(age) {
        //console.log(age);
    }
}
//Methods 2
class CustomerDetail {
    printFName(fName){
        console.log(fName);
    }
}
export const customerDetail = new CustomerDetail()