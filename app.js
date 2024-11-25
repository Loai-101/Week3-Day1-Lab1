/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Functions --------------------------------*/

// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", () => {
    // Select the display element where the calculation results will be shown
    const display = document.querySelector('.display');
    // Select all button elements and convert the NodeList to an array for easier iteration
    const buttons = Array.from(document.querySelectorAll('.button'));
  
    // Initialize variables to keep track of current input, operator, and first operand
    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    // Attach click event listeners to each button
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.innerText; // Get the text content of the clicked button

            if (buttonText === 'c') {
                // When 'c' (clear) is clicked, reset the calculator
                clearCalculator();
            } else if (buttonText === '=') {
                // When '=' is clicked, perform the calculation
                if (firstOperand !== null && operator) { // Ensure there is an operator and first operand
                    try {
                        // Calculate the result using the specified operator
                        const result = calculate(firstOperand, parseFloat(currentInput), operator);
                        display.innerText = result; // Show the result in the display
                        currentInput = result.toString(); // Update currentInput with the result for further calculation
                        operator = ''; // Reset operator for the next calculation
                        firstOperand = null; // Reset first operand
                    } catch (error) { // Catch any errors during calculation
                        display.innerText = error.message; // Display the error message
                        clearCalculator();  // Reset calculator after displaying the error (optional)
                    }
                } else {
                    display.innerText = 'Error'; // Show error if there's no operation to perform
                }
            } else if (['/', '*', '-', '+'].includes(buttonText)) {
                // When an operator button is clicked
                if (currentInput) { // Ensure currentInput is not empty
                    firstOperand = parseFloat(currentInput); // Store the first operand
                    operator = buttonText; // Store the operator
                    currentInput = ''; // Clear current input for the next number
                }
            } else if (!isNaN(buttonText)) {
                // If a number button is clicked
                currentInput += buttonText; // Append the number to the current input
                display.innerText = currentInput; // Update the display with the current input
            }
        });
    });

    // Function to perform the calculation based on the operator
    function calculate(firstOperand, secondOperand, operator) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand; // Addition
            case '-':
                return firstOperand - secondOperand; // Subtraction
            case '*':
                return firstOperand * secondOperand; // Multiplication
            case '/':
                // Handle division by zero
                if (secondOperand === 0) { 
                    throw new Error('Division by zero'); // Throw an error for division by zero
                }
                return firstOperand / secondOperand; // Division
            default:
                throw new Error('Unknown operator'); // Throw an error for unknown operators
        }
    }

    // Function to reset the calculator state
    function clearCalculator() {
        currentInput = ''; // Reset current input
        firstOperand = null; // Reset first operand
        operator = ''; // Reset operator
        display.innerText = '0'; // Reset display to 0
    }
});
