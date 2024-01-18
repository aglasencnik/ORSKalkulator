/**
 * A class that handles parsing expressions.
 */
class Parser {
    /**
     * Evaluates arithmetic expression from the given HTML using a DOMParser.
     *
     * @param {string} html - The HTML string representing the arithmetic expression.
     * @return {object} - The result of the evaluated arithmetic expression.
     */
    static evaluateArithmeticFromCalc(html) {
        const domParser = new DOMParser();
        const doc = domParser.parseFromString(html, 'text/html');

        const processElement = (element) => {
            let expression = "";

            for (const childElement of element.children) {
                const dataType = childElement.getAttribute("data-type");
                const dataValue = childElement.getAttribute("data-value");

                if (dataType === "number" || dataType === "operator") {
                    expression += dataValue;
                } else if (dataType === "advanced-operator") {
                    if (dataValue === "pow") {
                        const exponent = childElement.firstElementChild;
                        if (exponent) {
                            expression += "^(";
                            expression += processElement(exponent);
                            expression += ")";
                        }
                    } else if (dataValue === "nth-root") {
                        const index = childElement.firstElementChild;
                        if (index) {
                            const content = index.nextElementSibling;
                            if (content) {
                                expression += processElement(content);
                                expression += "^(1/";
                                expression += processElement(index);
                                expression += ")";
                            }
                        }
                    }
                }
            }

            return expression;
        }

        const evaluator = new ArithmeticEvaluator();
        return evaluator.evaluateExpression(processElement(doc.body));
    }

    /**
     * Evaluates the arithmetic expression from a file.
     *
     * @param {string} expression - The arithmetic expression to be evaluated.
     * @return {object} - The result of evaluating the expression.
     */
    static evaluateArithmeticFromFile(expression) {
        const evaluator = new ArithmeticEvaluator();
        expression = Parser.simplifyExpression(expression);
        console.log(expression)
        return evaluator.evaluateExpression(expression);
    }

    /**
     * Simplifies the given expression by replacing all occurrences of root() function with its simplified form.
     * The root() function is in the form root(index, content), where index is the index of the root and content is the expression within the root.
     *
     * @param {string} expression - The expression to simplify.
     * @return {string} - The simplified expression.
     */
    static simplifyExpression(expression) {
        const rootRegex = /root\(\s*([^,]+)\s*,\s*([^)]+)\s*\)/g;

        let match;
        const matches = [];

        while((match = rootRegex.exec(expression)) !== null) {
            matches.push(match);
        }

        let simplifiedExpression = expression;
        for(const match of matches) {
            const index = match[1];
            const content = match[2];
            simplifiedExpression = simplifiedExpression.replace(match[0], `((${content})^(1/${index}))`);
        }

        return simplifiedExpression;
    }

    /**
     * Solves logic gates based on the given input number system, output number system, and input expression.
     *
     * @param {string} inputNumSystem - The number system of the input expression.
     * @param {string} outputNumSystem - The desired number system of the output result.
     * @param {string} input - The logic expression to be evaluated.
     * @returns {string} - The result of the evaluated logic expression in the specified output number system,
     *                    or null if the input expression is not valid.
     */
    static solveLogicGates(inputNumSystem, outputNumSystem, input) {
        const applyOperator = (operator, operands) => {
            if (operator === "NOT") {
                if (operands.length !== 1) {
                    throw new Error();
                }
                return LogicOperations.not(ConversionOperations.convert(inputNumSystem, NumeralSystems.BIN, operands[0]));
            }

            if (operands.length !== 2) {
                throw new Error();
            }

            const op1 = ConversionOperations.convert(inputNumSystem, NumeralSystems.BIN, operands[0]);
            const op2 = ConversionOperations.convert(inputNumSystem, NumeralSystems.BIN, operands[1]);

            switch(operator) {
                case "AND":
                    return LogicOperations.and(op1, op2);
                case"OR":
                    return LogicOperations.or(op1, op2);
                case "NAND":
                    return LogicOperations.nand(op1, op2);
                case "NOR":
                    return LogicOperations.nor(op1, op2);
                case "XOR":
                    return LogicOperations.xor(op1, op2);
            }
        };

        const evaluate = (tokens) => {
            const operators = ["AND", "OR", "NAND", "NOR", "XOR", "NOT"];
            const stack = [];
            let operandStack = [];
            let operator = null;

            const executeOperator = () => {
                if (operandStack.length < 2 && operator !== "NOT") {
                    throw new Error();
                }
                const operands = operator === "NOT" ? [operandStack.pop()] : operandStack.splice(-2, 2);
                operandStack.push(applyOperator(operator, operands));
                operator = null;
            };

            for (const token of tokens) {
                if (token === "(") {
                    stack.push({ operandStack, operator });
                    operandStack = [];
                    operator = null;
                } else if (token === ")") {
                    if (operator) {
                        executeOperator();
                    }
                    if (stack.length === 0) {
                        throw new Error();
                    }
                    let context = stack.pop();
                    if (context.operator) {
                        operandStack.push(context.operandStack.pop(), operandStack.pop());
                        operator = context.operator;
                        executeOperator();
                    } else {
                        operandStack = context.operandStack.concat(operandStack);
                    }
                } else if (operators.includes(token)) {
                    if (operator) {
                        executeOperator();
                    }
                    operator = token;
                } else {
                    if (operator === "NOT") {
                        operandStack.push(applyOperator(operator, [token]));
                        operator = null;
                    } else {
                        operandStack.push(token);
                    }
                }
            }

            if (operator) {
                executeOperator();
            }

            if (operandStack.length !== 1) {
                throw new Error();
            }

            return operandStack[0];
        };

        try {
            if (!Parser.isValidLogicExpression(inputNumSystem, input)) {
                return null;
            }

            const tokens = input.split(' ').filter(token => token);
            const result = evaluate(tokens);

            return ConversionOperations.convert(NumeralSystems.BIN, outputNumSystem, result.replace(/^0+/, ''));
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * Checks if a given logic expression is valid.
     *
     * @param {string} numSystem - The numeral system used in the expression.
     * @param {string} expression - The logic expression to be validated.
     * @return {boolean} - True if the expression is valid, false otherwise.
     */
    static isValidLogicExpression(numSystem, expression) {
        const operators = ["AND", "OR", "NAND", "NOR", "XOR", "NOT"];
        const unaryOperators = ["NOT"];
        const tokens = expression.split(' ').filter(token => token);
        const stack = [];
        let expectOperand = true;

        for (const token of tokens) {
            if (token === "(") {
                stack.push(token);
                continue;
            }

            if (token === ")") {
                if (stack.length === 0 || stack.pop() !== "(") {
                    return false;
                }
                continue;
            }

            if (expectOperand) {
                if (operators.includes(token) && !unaryOperators.includes(token)) {
                    return false;
                } else if (!operators.includes(token) && !ConversionOperations.isValidNumeralSystem(numSystem, token)) {
                    return false;
                }
            } else {
                if (!operators.includes(token)) {
                    return false;
                }
            }

            if (!unaryOperators.includes(token)) {
                expectOperand = !expectOperand;
            }
        }

        return stack.length === 0 && !expectOperand;
    }
}