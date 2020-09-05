/*
1: Create a function that, given a list of integers, returns the highest product between three of those numbers. 
For example, given the list [1, 10, 2, 6, 5, 3] the highest product would be 10 * 6 * 5 = 300
*/

highestProduct = (arr) => {

    var product = 1;

    var descArr = arr.sort((a, b) => {
        return a === b ? 0 : a < b ? 1 : -1;
    })
    
    console.log(descArr);

    for(let i = 0; i < 3; i++) {
        product *= descArr[i];
    }

    console.log(product);
    return product;
}

highestProduct([1, 10, 2, 6, 5, 3]);
highestProduct([10, 100, 20, 60, 50, 30]);