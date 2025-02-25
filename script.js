let number1 = "";
let number2 = "";
let operator = "";
let result = "";
let savedResult = "";

let isNumber1Set = false;
let isNumber2Set = false;
let isOperatorSet = false;
let previousResultExists = false;

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const decimalButton = document.querySelector("#decimal");
const percentageButton = document.querySelector("#percentage");
const clearButton = document.querySelector("#AC");
const plusMinusButton = document.querySelector("#plus-minus");
const display = document.querySelector("#display");
//calculates
function add(number1, number2) {
  return number1 + number2;
}
function subtract(number1, number2) {
  return number1 - number2;
}
function multiply(number1, number2) {
  return number1 * number2;
}
function divide(number1, number2) {
  if(number2 === 0) return "lmao";
  return number1 / number2;
}
//adjusts number size if necessary
function isNumberTooLarge(number) {
  let numberAsString = number.toString();
  if (numberAsString.length > 10) {
    return true;
  } else {
    return false;
  }
}
function getRoundedNumber(number, decimalPlaces) {
  let roundedNumber = number.toFixed(decimalPlaces);
  return roundedNumber;
}
function tryToMakeNumberFit(number) {
  if (isNumberTooLarge(number)) {
    if (!isNumberTooLarge(getRoundedNumber(number, 4))) {
      number = getRoundedNumber(number, 4);
      number = parseFloat(number);
    } else {
      if (!isNumberTooLarge(getRoundedNumber(number, 2))) {
        number = getRoundedNumber(number, 2);
        number = parseFloat(number);
      } else {
        number = NaN;
      }
    }
  }
  return number;
}
//resets values
function resetValuesForNewCalculation() {
  number1 = number1.toString();
  number1 = "";
  number2 = number2.toString();
  number2 = "";
  operator = "";
  result = "";

  isNumber1Set = false;
  isNumber2Set = false;
  isOperatorSet = false;
  updateDisplay();
}
function resetSavedResult() {
  savedResult = "";
  previousResultExists = false;
}
//operates calculation
function operate(number1, number2, operator) {
  number1 = parseFloat(number1);
  number2 = parseFloat(number2);
  switch (operator) {
    case "+":
      result = add(number1, number2);
      break;
    case "-":
      result = subtract(number1, number2);
      break;
    case "×":
      result = multiply(number1, number2);
      break;
    case "÷":
      result = divide(number1, number2);
      break;
  }
  result = tryToMakeNumberFit(result);
  savedResult = result;
  updateDisplay();
  resetValuesForNewCalculation();
  previousResultExists = true;
}
//displays calculations
function updateDisplay() {
  if (savedResult != "") {
    display.textContent = savedResult;
  } else if (number1 != "" && operator == "" && number2 == "") {
    display.textContent = number1;
  } else if (number1 != "" && operator != "" && number2 == "") {
    display.textContent = number1;
  } else if (number1 != "" && operator != "" && number2 != "") {
    display.textContent = number2;
  } else {
    display.textContent = "0";
  }
}
//enables calculation with previous result
function initializeValuesBasedOnPreviousResult() {
  savedResult = savedResult.toString();
  number1 = savedResult;
  resetSavedResult();
  updateDisplay();
}
//handles eventlisteners
function handleNumberButtonEvent(e) {
  if (previousResultExists) {
      resetValuesForNewCalculation();
      resetSavedResult();
  }
  if (!isNumber1Set) {
    if (isNumberTooLarge(number1 + e.textContent)) return; //checks if there is enough space for another number by adding a decimal
    if(number1=="" && e.textContent=="0") return;
    number1 += e.textContent;
    updateDisplay();
  } else if (isNumber1Set && !isNumber2Set) {
    if (isNumberTooLarge(number2 * 10)) return;
    number2 += e.textContent;
    updateDisplay();
  }
}
function handleEqualsButtonEvent(e) {
  if (isNumber1Set && isOperatorSet && number2 != "") {
    isNumber2Set = true;
    operate(number1, number2, operator);
  }
}
function handleOperatorButtonEvent(e) {
  if (previousResultExists){
    initializeValuesBasedOnPreviousResult();
  }
  if (isNumber1Set && isOperatorSet && number2 != "") {
    handleEqualsButtonEvent();
    initializeValuesBasedOnPreviousResult();
    operator = e.textContent;
    isOperatorSet = true;
    updateDisplay();
  }
  if (number1 != "" && number2 == "") {
    operator = e.textContent;
    isOperatorSet = true;
    isNumber1Set = true;
    updateDisplay();
  }
}
function handleClearButtonEvent(e) {
  resetSavedResult();
  resetValuesForNewCalculation();
}
//eventlisteners
numberButtons.forEach((button) => {
  button.addEventListener("click", (event) =>
    handleNumberButtonEvent(event.target)
  );
});
operatorButtons.forEach((button) => {
  button.addEventListener("click", (event) =>
    handleOperatorButtonEvent(event.target)
  );
});
equalsButton.addEventListener("click", (event) =>
  handleEqualsButtonEvent(event.target)
);
clearButton.addEventListener("click", (event) =>
  handleClearButtonEvent(event.target)
);
decimalButton.addEventListener("click", () => {
  if (previousResultExists){
    initializeValuesBasedOnPreviousResult();
  }
  if (!isNumber1Set && !number1.includes(".") && number1 != "") {
    number1 += ".";
  } else if (
    isNumber1Set &&
    !isNumber2Set &&
    !number2.includes(".") &&
    number2 != ""
  ) {
    number2 += ".";
  }
  updateDisplay();
});
percentageButton.addEventListener("click", (event) => {
  if (previousResultExists) {
    initializeValuesBasedOnPreviousResult();
  }
  if (!isNumber1Set) {
    if(isNumberTooLarge(number1/100)){
      number1 = tryToMakeNumberFit(number1/100)
    }else{
      number1 = number1 / 100;
    }
    
  } else if (isNumber1Set && !isNumber2Set) {
    if(isNumberTooLarge(number2/100)){
      number2 = tryToMakeNumberFit(number2/100)
    }else{
      number2 = number2 / 100;
    }
  }
  updateDisplay();
});
plusMinusButton.addEventListener("click", (event) => {
  if (previousResultExists) {
    initializeValuesBasedOnPreviousResult();
  }
  if (!isNumber1Set) {
    number1 = number1 * -1;
  } else if (isNumber1Set && !isNumber2Set) {
    number2 = number2 * -1;
  }
  updateDisplay();
});
