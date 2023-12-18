function greet(firstName, lastName, gender) {
  if (gender === "female") return `Hello madam, ${firstName} ${lastName}`;

  return `Hello sir, ${firstName} ${lastName}`;
}

function count(max) {
  for (let i = 0; i < max; i++) {
    console.log("Counter:", i);
  }
}


// greet("Omkar", "Arora", "male")

// count(100)

function sum(num1, num2, fnToCall) {
    let result = num1 + num2;
    fnToCall(result)
}

function displayResult(data) {
    console.log("Result of the sum is : " + data);
}

function displayResultPassive(data) {
    console.log("Sum's result is : " + data);
}

// You are only allowed to call one function after this
// How will you displayResult of a sum

// sum(10, 20, displayResultPassive)


function calcArithmetic(a,b,callback){
    return (callback(a,b))
}

function add(a,b) {
    return a+b
}
function sub(a,b){
    return a-b
}

console.log(calcArithmetic(10, 20, sub))