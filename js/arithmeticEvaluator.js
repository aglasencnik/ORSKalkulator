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

    #evalExp4() {
        let result = this.#evalExp5();

        while (this.#token === '^') {
            this.#getToken();
            const temp = this.#evalExp5();
            result = Math.pow(result, temp);
        }

        return result;
    }

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
