const calculator = { //This is a data array
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
}

handleOperator = (nextOperator) => { // this is for operator
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
  
    if (operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator;
      return;
    }
  
    if (firstOperand == null) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const result = performCalculation[operator](currentValue, inputValue);
  
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
  }
  
  const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  
    '=': (firstOperand, secondOperand) => secondOperand
  };

inputDecimal = (dot) => { // this is for decimal
    // If the `displayValue` does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
      // Append the decimal point
      calculator.displayValue += dot;
    }
  }

resetCalculator = () => {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }
  
clearEntry = () => {
    calculator.displayValue = '0';
}

inputDigit = (digit) => { // a function for the click button input
    const { displayValue, waitingForSecondOperand } = calculator;
  
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

  }

updateDisplay = () => {
    const display = document.querySelector('.expression');
    display.style.textAlign = 'right';
    display.value = calculator.displayValue;
  }
  
  updateDisplay();
  
  
  

  const keys = document.querySelector('.btn-box');
  keys.addEventListener('click', (event) => { 
    const target = event.target;
    if (!target.matches('button')) {
        return;
      
    }
  
    if (target.classList.contains('operator')) { // This is for handleOperator funtion
      handleOperator(target.value);
      updateDisplay();
      return;
    }
  
    if (target.classList.contains('decimal')) { // this is for inputDecimal function
      inputDecimal(target.value);
      updateDisplay();
      return;
    }
  
    if (target.classList.contains('all-clear')) { // this is for resetCalculator function
      resetCalculator();
      updateDisplay();
      return;
    }
    if (target.classList.contains('clear-entry')) { // this is for resetCalculator function
      clearEntry();
      updateDisplay();
      return;
    }
    
  
    inputDigit(target.value);  // this is for inputDigit function
    updateDisplay();

  });