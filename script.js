class Calculator {
    constructor(prevTextEl, currentTextEl) {
        this.prevTextEl = prevTextEl
        this.currentTextEl = currentTextEl
        this.clear()
    }
        // clear function
    clear() {
        this.currentOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }
        // delete function
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
        // 
    appendNum(number) {
        if (number ==='.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOp(operation) {
        if (this.currentOperand === '') return
        if (this.prevOperand !== '') {
            this.compute()
        }
        this.operation = operation 
        this.prevOperand = this.currentOperand
        this.currentOperand = ""
    }

    compute() {
        let computation 
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case '*':
                computation = prev * current
                break;
            case '÷':
                computation = prev / current
                break;
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.prevOperand = ''
    }
        // commas after 3 decimal places
    getDisplayCommas(number) {
        const stringNum = number.toString()
        const integerDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1]
        let integerDisplay 
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
                integerDisplay = integerDigits.toLocaleString('en', {
                    maximumFractionDigits: 0
                })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
        }


    updateDisplay() {
        this.currentTextEl.innerText = this.getDisplayCommas(this.currentOperand)
        if (this.operation != null) {
            this.prevTextEl.innerText = `${this.getDisplayCommas(this.prevOperand)} ${this.operation}`
        } else {
            this.prevTextEl.innerText = ''
        }
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevTextEl = document.querySelector('[data-prev]')
const currentTextEl = document.querySelector('[data-current]')



const calculator = new Calculator(prevTextEl, currentTextEl)


// event listeners for all the function buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})


        
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOp(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})


allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})



deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})