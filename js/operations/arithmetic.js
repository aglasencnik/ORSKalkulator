/**
 * A class for performing arithmetic operations.
 */
class ArithmeticOperations {
    /**
     * Adds two numbers.
     *
     * @param {number} x - The first number to add.
     * @param {number} y - The second number to add.
     * @returns {number} - The sum of x and y.
     */
    static add(x, y) {
        return x + y;
    }

    /**
     * Subtract two numbers.
     *
     * @param {number} x - The first number.
     * @param {number} y - The second number.
     * @returns {number} - The difference of the two numbers.
     */
    static subtract(x, y) {
        return x - y;
    }

    /**
     * Multiplies two numbers.
     *
     * @param {number} x - The first number.
     * @param {number} y - The second number.
     * @returns {number} The product of the two input numbers.
     */
    static multiply(x, y) {
        return x * y;
    }

    /**
     * Divides two numbers.
     *
     * @param {number} x - The dividend.
     * @param {number} y - The divisor.
     * @returns {number} - The quotient of the division operation.
     */
    static divide(x, y) {
        return x / y;
    }

    /**
     * Calculates the modulus of two numbers.
     *
     * @param {number} x - The dividend.
     * @param {number} y - The divisor.
     * @returns {number} The modulus of the dividend and divisor.
     */
    static modulus(x, y) {
        return x % y;
    }

    /**
     * Calculates the square of a number.
     *
     * @param {number} x - The number to be squared.
     * @returns {number} - The squared value of the input number.
     */
    static squared(x) {
        return x * x;
    }

    /**
     * Calculates the exponentiation of a number.
     *
     * @param {number} x - The base number.
     * @param {number} n - The exponent number.
     * @returns {number} - The result of x raised to the power of n.
     */
    static exponentiate(x, n) {
        return Math.pow(x, n);
    }

    /**
     * Calculates the square root of a given number.
     *
     * @param {number} x - The number for which the square root is calculated.
     * @returns {number} - The square root of the given number.
     */
    static squareRoot(x) {
        return Math.sqrt(x);
    }

    /**
     * Calculate the nth root of a number.
     *
     * @param {number} x - The number for which the nth root should be calculated.
     * @param {number} n - The root value.
     * @returns {number} - The nth root of the given number.
     */
    static nthRoot(x, n) {
        return Math.pow(x, (1 / n));
    }
}