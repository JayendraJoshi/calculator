let number1 = "";
let number2 = "";
let operator = "";
let result = "";

let isNumber1Set = false;
let isNumber2Set = false;
let isOperatorSet = false;
let caluculateBasedOnResult = false;

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
    number1 = parseFloat(number1);
    number2 = parseFloat(number2);
    switch(operator){
        case "+":
            result = add(number1,number2);
            break;
        case "-":
            result = subtract(number1,number2);
            break;
        case "*":
            result = multiply(number1,number2);
            break;
        case "/":
            result = divide(number1,number2);
            break;
    }   
    clear();
    caluculateBasedOnResult = true;
    updateDisplay();
}
function clear(){
    display.textContent="0";
    number1="";
    number2="";
    operator="";

    isNumber1Set=false;
    isNumber2Set=false;
    isOperatorSet=false;
    caluculateBasedOnResult =false;
}
function updateDisplay(){
    if(result!=""){
        display.textContent=result;
    }else if(number1!=""&&operator==""&&number2==""){
        display.textContent=number1;
    }else if(number1!=""&&operator!=""&&number2==""){
        display.textContent=number1 + " " + operator;
    }else if(number1!=""&&operator!=""&&number2!=""){
        display.textContent=number1 + " " + operator + number2;
    }else{
        display.textContent="0";
    }
}
function handleNumberButtonsEvent(e){
    console.log(isNumber1Set);
    console.log(isNumber2Set);
    console.log(isOperatorSet);
    if(caluculateBasedOnResult){
        number1 = result;
        result = "";
        updateDisplay();
        caluculateBasedOnResult = false;
        return;
    }
    if(!isNumber1Set){
        number1 +=e.textContent;
        updateDisplay();
    }else if(isNumber1Set && !isNumber2Set){
        number2 +=e.textContent;
        updateDisplay();
    }
}
function handleOperatorButtonsEvent(e){
    console.log("handleOperatorButtonsEvent function reached!")
    if(caluculateBasedOnResult){
        number1 = result;
        result = "";
        caluculateBasedOnResult = false;
    }
    if(number1!=""){
        operator = e.textContent;
        console.log(operator);
        isOperatorSet = true;
        isNumber1Set = true;
        updateDisplay();
    }
}
numberButtons.forEach(button => {
    button.addEventListener("click", (event) => handleNumberButtonsEvent(event.target));
});
operatorButtons.forEach(button =>{
    button.addEventListener("click", (event)=> handleOperatorButtonsEvent(event.target));     
});
equalsButton.addEventListener("click",(event)=>{
    if(isNumber1Set && isOperatorSet && number2!=""){
        isNumber2Set = true;
        operate(number1,number2,operator);
    }
})
clearButton.addEventListener("click",clear);