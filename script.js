let number1 = "";
let number2 = "";
let operator = "";
let result = "";
let savedResult = "";

let isNumber1Set = false;
let isNumber2Set = false;
let isOperatorSet = false;
let caluculateBasedOnResult = false;

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const decimalButton = document.querySelector("#decimal");
const percentageButton = document.querySelector("#percentage")
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
function checkIfNumberIsTooLarge(number){
    let numberAsString = number.toString();
    if(numberAsString.length>=13){
        return true;
    }else{
        return false;
    }
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
        case "×":
            result = multiply(number1,number2);
            break;
        case "÷":
            result = divide(number1,number2);
            break;
    }   
    if(checkIfNumberIsTooLarge(result)){
        console.log("check reached");
        result = NaN;
    }
    savedResult = result;
    updateDisplay();
    clear();
    caluculateBasedOnResult = true;
}
function clear(){
    number1 = number1.toString();
    number1="";
    number2 = number2.toString();
    number2="";
    operator="";
    result="";

    isNumber1Set=false;
    isNumber2Set=false;
    isOperatorSet=false;
    updateDisplay();
}
function updateDisplay(){
    if(savedResult!=""){
        display.textContent=savedResult;
    }else if(number1!=""&&operator==""&&number2==""){
        display.textContent=number1;
    }else if(number1!=""&&operator!=""&&number2==""){
        display.textContent=number1;
    }else if(number1!=""&&operator!=""&&number2!=""){
        display.textContent=number2;
    }else{
        display.textContent="0";
    }
}
function handleCalculateBasedOnResult(){
    savedResult = savedResult.toString();
    number1 = savedResult;
        savedResult = "";
        updateDisplay();
        caluculateBasedOnResult = false;
}
function handleNumberButtonsEvent(e){
    console.log(isNumber1Set);
    console.log(isNumber2Set);
    console.log(isOperatorSet);
    if(caluculateBasedOnResult){
        if(e.textContent == 0){
            clear();
            savedResult="";
            updateDisplay();
            return;
        }
        handleCalculateBasedOnResult();
    }
    if(!isNumber1Set){
        if(checkIfNumberIsTooLarge(number1))return;
        number1 +=e.textContent;
        updateDisplay();
    }else if(isNumber1Set && !isNumber2Set){
        if(checkIfNumberIsTooLarge(number2))return;
        number2 +=e.textContent;
        updateDisplay();
    }
}
function handleEqualsButtonEvent(e){
    if(isNumber1Set && isOperatorSet && number2!=""){
        isNumber2Set = true;
        operate(number1,number2,operator);
    }
}
function handleOperatorButtonsEvent(e){
    console.log("handleOperatorButtonsEvent function reached!")
    if(caluculateBasedOnResult){
        handleCalculateBasedOnResult();
    }
    if(isNumber1Set && isOperatorSet && number2!=""){
        handleEqualsButtonEvent();
        handleCalculateBasedOnResult();
        operator = e.textContent;
        isOperatorSet = true;
        updateDisplay();
    }
    if(number1!="" && number2==""){
        operator = e.textContent;
        console.log(operator);
        isOperatorSet = true;
        isNumber1Set = true;
        updateDisplay();
    }
}
function handleClearButtonEvent(e){
    savedResult ="";
    caluculateBasedOnResult=false;
    clear();
}
numberButtons.forEach(button => {
    button.addEventListener("click", (event) => handleNumberButtonsEvent(event.target));
});
operatorButtons.forEach(button =>{
    button.addEventListener("click", (event)=> handleOperatorButtonsEvent(event.target));     
});
equalsButton.addEventListener("click",(event)=>handleEqualsButtonEvent(event.target)); 
clearButton.addEventListener("click", (event)=>handleClearButtonEvent(event.target));
decimalButton.addEventListener("click", (event) => {
    if(caluculateBasedOnResult){
        handleCalculateBasedOnResult();
    }
    if(!isNumber1Set&&!number1.includes(".")){
        number1+=".";
    }else if(isNumber1Set && !isNumber2Set && !number2.includes(":")){
        number2+=".";
    }
    updateDisplay();
})
percentageButton.addEventListener("click",(event)=>{
    if(caluculateBasedOnResult){
        handleCalculateBasedOnResult();
    }
    if(!isNumber1Set){
        number1 = number1 / 100;
    }else if(isNumber1Set && !isNumber2Set){
        number2 = number2 / 100;
    }
    updateDisplay();
})
plusMinusButton.addEventListener("click",(event)=>{
    if(caluculateBasedOnResult){
        handleCalculateBasedOnResult();
    }
    if(!isNumber1Set){
        number1 = number1 * -1;
    }else if(isNumber1Set && !isNumber2Set){
        number2 = number2 *-1;
    }
    updateDisplay();
})
