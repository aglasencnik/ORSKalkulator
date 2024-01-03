/**
 * A class that handles parsing expressions.
 */
class Parser {
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