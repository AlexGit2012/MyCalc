class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.previousValue = "";
        this.currentValue = "";
        this.operation = undefined;
    }

    update() {
        this.previousOperandTextElement.innerText = this.previousValue;
        this.currentOperandTextElement.innerText = this.currentValue;
    }

    delete() {

    }

    appendNumber(number) {
        if (number === '.' && this.currentValue.includes('.')) return
        this.currentValue = this.currentValue.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentValue === "") return
        if (this.previousValue !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousValue = this.currentValue;
        this.currentValue = "";
    }

    compute() {
        let computeResult;
        const prev = parseFloat(this.previousValue)
        const curr = parseFloat(this.currentValue)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case "+":
                computeResult = prev + curr
                break
            case "-":
                computeResult = prev - curr
                break
            case "*":
                computeResult = prev * curr
                break
            case "/":
                computeResult = prev / curr
                break
            default:
                return
        }
        this.currentValue = computeResult;
        this.operation = undefined;
        this.previousValue = "";
    }


}

const numbersButtons = document.querySelectorAll('[data-number-value]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equal]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');

const calculator = new Calculator(currentOperandTextElement, previousOperandTextElement);

console.log(currentOperandTextElement)

numbersButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.update();
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.update();
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.update();
})