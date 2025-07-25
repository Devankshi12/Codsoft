
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let degreeMode = true; // true for degrees, false for radians

function updateDisplay() {
    display.textContent = currentInput || '0';
}

function appendToInput(value) {
    currentInput += value;
    updateDisplay();
}

function clearAll() {
    currentInput = '';
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function safeEval(expr) {
    // Replace custom operators and functions for JS eval
    let jsExpr = expr
        .replace(/÷/g, '/')
        .replace(/×/g, '*')
        .replace(/−/g, '-')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(');

    // Convert degrees to radians if in degree mode
    if (degreeMode) {
        jsExpr = jsExpr.replace(/Math\.(sin|cos|tan)\(([^)]+)\)/g, (match, fn, arg) => {
            return `Math.${fn}(((${arg}) * Math.PI / 180))`;
        });
    }
    try {
        let result = eval(jsExpr);
        if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
            return parseFloat(result.toFixed(8));
        } else {
            return 'Error';
        }
    } catch {
        return 'Error';
    }
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.hasAttribute('data-number')) {
            appendToInput(btn.getAttribute('data-number'));
        } else if (btn.hasAttribute('data-action')) {
            const action = btn.getAttribute('data-action');
            switch (action) {
                case 'add': appendToInput('+'); break;
                case 'subtract': appendToInput('−'); break;
                case 'multiply': appendToInput('×'); break;
                case 'divide': appendToInput('÷'); break;
                case 'sin': appendToInput('sin('); break;
                case 'cos': appendToInput('cos('); break;
                case 'tan': appendToInput('tan('); break;
                case 'open-paren': appendToInput('('); break;
                case 'close-paren': appendToInput(')'); break;
                case 'equals':
                    currentInput = String(safeEval(currentInput));
                    updateDisplay();
                    break;
                case 'clear': clearAll(); break;
                case 'backspace': backspace(); break;
            }
        }
    });
});

updateDisplay();

updateDisplay();
