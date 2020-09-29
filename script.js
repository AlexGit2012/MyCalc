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
        this.readyForReset = false;
    }

    getDisplayNumber(number) {
        if ((number === "Error: Negative value") || (number === "Error: division by zero")) {
            this.readyForReset = true;
            return number;
        }
        if (number === "-") return "-";

        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = ""
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    update() {
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousValue)} ${this.operation}`
        } else this.previousOperandTextElement.innerText = this.previousValue

        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentValue);
    }

    delete() {
        this.currentValue = this.currentValue.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (this.readyForReset === true) this.clear();
        if (number === '.' && this.currentValue.includes('.')) return
        this.currentValue = this.currentValue.toString() + number.toString();
    }

    chooseOperation(operation) {
        if ((this.currentValue === "Error: Negative value") || (this.currentValue === "Error: division by zero")) return
        if (this.currentValue === "-") return
        if (this.currentValue === "" && operation == "-") {
            this.currentValue = '-' + this.currentValue;
            return
        }

        if (this.currentValue === "") return
        if (this.previousValue !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousValue = this.currentValue;
        this.currentValue = "";
        this.readyForReset = false;
    }

    compute() {
        let computeResult;

        let prevDecima;
        let currDecima;
        if (this.previousValue.toString().includes(".")) {
            prevDecima = this.previousValue.toString().split(".")[1].length;
        } else prevDecima = 0;
        if (this.currentValue.toString().includes(".")) {
            currDecima = this.currentValue.toString().split(".")[1].length;
        } else currDecima = 0;
        let maxDecima = (prevDecima > currDecima ? prevDecima : currDecima);

        const prev = parseFloat(this.previousValue);
        console.log(prev)
        const curr = parseFloat(this.currentValue);
        console.log(curr)

        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case "+":
                computeResult = prev * (10 ** maxDecima) + curr * (10 ** maxDecima)
                break
            case "-":
                computeResult = prev * (10 ** maxDecima) - curr * (10 ** maxDecima)
                break
            case "*":
                computeResult = (prev * (10 ** maxDecima) * curr * (10 ** maxDecima)) / (10 ** maxDecima)
                break
            case "/":
                if (curr==0) {
                    computeResult = "Error: division by zero"
                    break
                }
                computeResult = (prev * (10 ** maxDecima) / curr * (10 ** maxDecima)) / (10 ** maxDecima)
                break
            case "^":
                computeResult = (prev ** curr) * (10 ** maxDecima)
                break
            default:
                return
        }
        this.currentValue = isNaN(computeResult) ? computeResult : computeResult / (10 ** maxDecima)
        this.operation = undefined;
        this.previousValue = "";
        this.readyForReset = true;
    }

    sqrt() {
        if (this.currentValue === "") return;
        if (parseFloat(this.currentValue) < 0) {
            this.currentValue = "Error: Negative value";
            this.previousValue = "";
            this.operation = undefined;
            this.readyForReset = true;
            return;
        }
        this.currentValue = Math.sqrt(this.currentValue);
        this.previousValue = "";
        this.operation = undefined;
        this.readyForReset = true;
    }

}

const numbersButtons = document.querySelectorAll('[data-number-value]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equal]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const sqrtButton = document.querySelector('[data-sqrt]');

const calculator = new Calculator(currentOperandTextElement, previousOperandTextElement);

console.log(sqrtButton)

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

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.update();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.update();
})

sqrtButton.addEventListener('click', button => {
    calculator.sqrt();
    calculator.update();
})

