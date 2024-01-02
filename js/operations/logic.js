/**
 * Class for working with logic operations.
 */
class LogicOperations {
    /**
     * Applies the AND logic gate on 2 strings containing binary value.
     *
     * @param {string} x - String containing binary value.
     * @param {string} y - String containing binary value.
     * @returns {string} - Binary value string.
     */
    static and(x, y) {
        let maxLen = Math.max(x.length, y.length);
        x = x.padStart(maxLen, '0');
        y = y.padStart(maxLen, '0');

        let val = "";
        for (let i = 0; i < maxLen; i++) {
            if (x[i] === '1' && y[i] === '1') {
                val += "1";
            } else {
                val += "0";
            }
        }
        return val;
    }

    /**
     * Applies the OR logic gate on 2 strings containing binary value.
     *
     * @param {string} x - String containing binary value.
     * @param {string} y - String containing binary value.
     * @returns {string} - Binary value string.
     */
    static or(x, y) {
        let maxLen = Math.max(x.length, y.length);
        x = x.padStart(maxLen, '0');
        y = y.padStart(maxLen, '0');

        let val = "";
        for (let i = 0; i < maxLen; i++) {
            if (x[i] === '1' || y[i] === '1') {
                val += "1";
            } else {
                val += "0";
            }
        }
        return val;
    }

    /**
     * Applies the NAND logic gate on 2 strings containing binary value.
     *
     * @param {string} x - String containing binary value.
     * @param {string} y - String containing binary value.
     * @returns {string} - Binary value string.
     */
    static nand(x, y) {
        return this.not(this.and(x, y));
    }

    /**
     * Applies the NOR logic gate on 2 strings containing binary value.
     *
     * @param {string} x - String containing binary value.
     * @param {string} y - String containing binary value.
     * @returns {string} - Binary value string.
     */
    static nor(x, y) {
        return this.not(this.or(x, y));
    }

    /**
     * Applies the NOR logic gate on 2 strings containing binary value.
     *
     * @param {string} x - String containing binary value.
     * @param {string} y - String containing binary value.
     * @returns {string} - Binary value string.
     */
    static xor(x, y) {
        let maxLen = Math.max(x.length, y.length);
        x = x.padStart(maxLen, '0');
        y = y.padStart(maxLen, '0');

        let val = "";
        for (let i = 0; i < maxLen; i++) {
            if ((x[i] === '1' && y[i] === '0') ||
                (x[i] === '0' && y[i] === '1')) {
                val += "1";
            }  else {
                val += "0";
            }
        }
        return val;
    }

    /**
     * Applies the NOT logic gate on a string containing binary value.
     *
     * @param {string} x - String containing binary value.
     * @returns {string} - Inverted binary value.
     */
    static not(x) {
        let val = "";
        for (let i = 0; i < x.length; i++) {
            if (x[i] === '1') {
                val += "0";
            } else if (x[i] === '0') {
                val += "1";
            }
        }
        return val;
    }
}