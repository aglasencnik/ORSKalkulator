/**
 * Class representing an arithmetic expression evaluator.
 */
class ArithmeticEvaluator {
    #tokenTypes = {
        DELIMITER: 1,
        NUMBER: 2
    };

    #tokenType = 0;
    #token = '';
    #expression = "";
    #errorMessage = "";

    constructor() {
        this.#tokenType = 0;
        this.#token = '';
        this.#expression = "";
        this.#errorMessage = "";
    }

    /**
     * Evaluates the given expression and returns the result or an error message.
     *
     * @param {string} expression - The expression to evaluate.
     * @returns {object} - An object with properties: Success, Result, Error.
     *          - Success: A boolean indicating whether the evaluation was successful.
     *          - Result: The numeric result of the evaluation, rounded to 3 decimal places.
     *          - Error: An error message if the evaluation failed, or an empty string if successful.
     */
    evaluateExpression(expression) {
        this.#errorMessage = "";
        this.#expression = expression;
        this.#getToken();
        let result = 0;

        if (!this.#expression || this.#expression.length === 0) {
            this.#errorMessage = "Matematičen izraz ni prisoten!";
            return {
                Success: this.#errorMessage.length === 0,
                Result: result,
                Error: this.#errorMessage
            };
        }

        result = this.#evalExp1();

        if (this.#expression || this.#expression.length > 0) {
            this.#errorMessage = "Napaka v matematičnem izrazu!";
        }

        return {
            Success: this.#errorMessage.length === 0,
            Result: Number(result.toFixed(3)),
            Error: this.#errorMessage
        };
    }

    /**
     * Evaluates the expression using the given algorithm.
     *
     * @returns {number} - The result of the evaluated expression.
     */
    #evalExp1() {
        let result = this.#evalExp2();

        while (this.#token === '+' || this.#token === '-') {
            const token = this.#token;
            this.#getToken();
            const temp = this.#evalExp2();

            if (token === '-') {
                result -= temp;
            } else if (token === '+') {
                result += temp;
            }
        }

        return result;
    }

    /**
     * Evaluates an arithmetic expression consisting of multiplication, division, and modulus operations.
     *
     * @return {number} The result of evaluating the arithmetic expression.
     */
    #evalExp2() {
        let result = this.#evalExp3();

        while (this.#token === '*' || this.#token === '/' || this.#token === '%') {
            const token = this.#token;
            this.#getToken();
            const temp = this.#evalExp3();

            if (token === '*') {
                result *= temp;
            } else if (token === '/') {
                result /= temp;
            } else if (token === '%') {
                result %= temp;
            }
        }

        return result;
    }

    /**
     * Evaluates the mathematical expression for the given token and token type.
     *
     * @returns {number} The result of the evaluation.
     */
    #evalExp3() {
        const token = this.#token;

        if ((this.#tokenType === this.#tokenTypes.DELIMITER) && this.#token === '+' || this.#token === '-') {
            this.#getToken();
        }

        let result = this.#evalExp4();

        if (token === '-') {
            result = -result;
        }

        return result;
    }

    /**
     * Evaluates the expression and returns the result.
     *
     * @returns {number} The result of evaluating the expression.
     */
    #evalExp4() {
        let result = this.#evalExp5();

        while (this.#token === '^') {
            this.#getToken();
            const temp = this.#evalExp5();
            result = Math.pow(result, temp);
        }

        return result;
    }

    /**
     * Evaluates a mathematical expression represented by a token stream.
     *
     * @returns {number} The result of the evaluated expression.
     */
    #evalExp5() {
        let result = 0;

        if (this.#token === '(') {
            this.#getToken();
            result = this.#evalExp1();

            if (this.#token !== ')') {
                this.#errorMessage = "Manjkajoči oklepaji!";
            }

            this.#getToken();
        } else if (this.#tokenType === this.#tokenTypes.NUMBER) {
            result = parseFloat(this.#token);
            this.#getToken();
        } else {
            this.#errorMessage = "Napaka v matematičnem izrazu!";
        }

        return result;
    }

    /**
     * Retrieves the next token from the expression string.
     */
    #getToken() {
        this.#token = '';
        this.#tokenType = 0;

        if (this.#expression) {
            this.#expression = this.#expression.trimStart();
        }

        if (!this.#expression || this.#expression.length === 0) {
            return;
        }

        if ("+-*/%^()".includes(this.#expression[0])) {
            this.#tokenType = this.#tokenTypes.DELIMITER;
            this.#token = this.#expression[0];
            this.#expression = this.#expression.substring(1);
        } else if (!isNaN(parseFloat(this.#expression[0])) || this.#expression[0] === '.') {
            while (!" +-/*%()^\t\r".includes(this.#expression[0]) && this.#expression.length > 0) {
                this.#token += this.#expression[0];
                this.#expression = this.#expression.substring(1);
            }
            this.#tokenType = this.#tokenTypes.NUMBER;
        }
    }
}
