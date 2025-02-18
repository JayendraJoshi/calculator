let number1 = "";
let number2 = "";
let operator = "";
let isNumber1Set = false;
let isNumber2Set = false;
let isOperatorSet = false;

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const decimalButton = document.querySelector("#decimal");
const clearButton = document.querySelector("#AC");
const plusMinusButton = document.querySelector("#plus-minus");
const display = document.querySelector("#display");

function add(number1, number2){
    return number1 + number2;
}
function subtract(number1, number2){
    return number1 - number2;
}
function multiply(number1, number2){
    return number1 * number2;
}
function divide(number1, number2){
    return number1 / number2;
}
function operate(number1, number2, operator){
    switch(operator){
        case "+":
            display.textContent = add(number1,number2);
            break;
        case "-":
            display.textContent = subtract(number1,number2);
            break;
        case "*":
            display.textContent = multiply(number1,number2);
            break;
        case "/":
            display.textContent = divide(number1,number2);
            break;
    }   
}
numberButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        if (!isNumber1Set){
            number1 += event.target.textContent;
            display.textContent = number1;
        }else{
            number2 += event.target.textContent;
            display.textContent +=number2;
        }
    });
});
operatorButtons.forEach(button =>{
    button.addEventListener("click", (event)=>{
        if(operator!=event.target.textContent){
            operator = event.target.textContent; 
            display.textContent = number1 +" "+ operator;
            isNumber1Set=true;
            isOperatorSet=true;
        }
    })
})
equalsButton.addEventListener("click",(event)=>{
    isNumber2Set = true;
    if(isNumber1Set && isNumber2Set && isOperatorSet){
        operate(number1,number2,operator);
    }
})
clearButton.addEventListener("click",(event)=>{
    display.textContent="0";
    number1="";
    number2="";
    operator="";

    isNumber1Set=false;
    isNumber2Set=false;
    isOperatorSet=false;
})