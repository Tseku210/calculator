let previousOperand = "";
let currentOperand = "";
let operator = undefined;

const screenBig = document.querySelector("#showResult");
const screenSmall = document.querySelector("#smallScreen");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const del = document.querySelector("[data-delete]");
const clear = document.querySelector("[data-clear]");
const equal = document.querySelector("[data-equals]");

del.addEventListener("click", () => {
    backSpace()
    updateScreen()
})

clear.addEventListener("click", () => {
    clearAll()
    updateScreen()
})

equal.addEventListener("click", e => {
    if (previousOperand === "Error") return;
    operate(operator, Number(previousOperand), Number(currentOperand))
    updateScreen()
    if (previousOperand === "" && currentOperand !== "") clearAll()
})

numberButtons.forEach(button => {
    button.addEventListener("click", e => {
        appendNumber(e.target.textContent);
        updateScreen()
    })
})

operatorButtons.forEach(button => {
    button.addEventListener("click", e => {
        chooseOperator(e.target.textContent)
        updateScreen()
    })
})

function appendNumber(number){
    if (currentOperand === "" || currentOperand === "0"){
        currentOperand = number;
    } else if ((number === "." && currentOperand.includes(".")) || currentOperand === "Error"){
        return;
    } else {
        currentOperand += number;
    }
};

function chooseOperator(operation){
    if (currentOperand === "") return;
    if (currentOperand !== ""){
        operate(operator, Number(previousOperand), Number(currentOperand));
    }
    operator = operation;
    previousOperand = currentOperand;
    currentOperand = "";
}

function updateScreen(){
    screenBig.textContent = currentOperand;
    if (previousOperand === "Error") {
        screenBig.textContent = "Error";
        return;
    }
    screenSmall.textContent = previousOperand;
    if (operator !== undefined && previousOperand !== "" && previousOperand !== "Error"){
        screenSmall.textContent = previousOperand + " " + operator;
    }
}

function clearAll(){
    currentOperand = "0";
    currentOperand = "";
    previousOperand = "";
    operator = undefined;
}

function backSpace(){
    if (currentOperand === "") return;
    currentOperand = currentOperand.slice(0, -1)
}

function add(a, b){
    return a + b;
};
function subtracts(a, b){
    return a - b;
};
function multiply(a, b){
    // return Math.round(((a * b) * 100) / 100);
    return a * b;
};
function divide(a, b){
    if (b === 0) return "Error";
    // return Math.round(((a / b) * 100) / 100);
    return a / b
};

function operate(operator, a, b){
    if (operator === "÷"){
        currentOperand = divide(a, b).toString();
        previousOperand = ""
    } else if (operator === "+"){
        currentOperand = add(a, b).toString();
        previousOperand = ""
    } else if (operator === "-"){
        currentOperand = subtracts(a, b).toString();
        previousOperand = ""
    } else if (operator === "x"){
        currentOperand = multiply(a, b).toString();
        previousOperand = ""
    }
};