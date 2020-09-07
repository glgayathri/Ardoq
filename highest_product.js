/*
1: Create a function that, given a list of integers, returns the highest product between three of those numbers. 
For example, given the list [1, 10, 2, 6, 5, 3] the highest product would be 10 * 6 * 5 = 300
*/

const highestProduct = (arr) => {

    var product = 1;

    //sorting the given array in the descending order
    var descArr = arr.sort((a, b) => {
        return a === b ? 0 : a < b ? 1 : -1;
    })
    
    console.log(descArr);

    for(let i = 0; i < 3; i++) {
        product *= descArr[i];
    }
    console.log(product);

    document.querySelector('.product').textContent = `The product of highest 3 numbers of the given array is: ${product}`

    return product;
}

highestProduct([10, 100, 20, 60, 50, 30]);
highestProduct([1, 10, 2, 6, 5, 3]);
