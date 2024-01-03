/**
 * A class for performing conversion operations.
 */
class ConversionOperations {
    /**
     * Converts input string of some numeral system value to the output one.
     *
     * @param {string} inputNumSystem - Input numeral system.
     * @param {string} outputNumSystem - Output numeral system.
     * @param {string} input - Input value.
     * @returns {string} - Output value in other numeral system.
     */
    static convert(inputNumSystem, outputNumSystem, input) {
        switch (inputNumSystem) {
            case NumeralSystems.BIN:
                switch (outputNumSystem) {
                    case NumeralSystems.OCT:
                        return this.binToOct(input);
                    case NumeralSystems.DEC:
                        return this.binToDec(input);
                    case NumeralSystems.HEX:
                        return this.binToHex(input);
                    default:
                        return input;
                }
            case NumeralSystems.OCT:
                switch (outputNumSystem) {
                    case NumeralSystems.BIN:
                        return this.octToBin(input);
                    case NumeralSystems.DEC:
                        return this.octToDec(input);
                    case NumeralSystems.HEX:
                        return this.octToHex(input);
                    default:
                        return input;
                }
            case NumeralSystems.DEC:
                switch (outputNumSystem) {
                    case NumeralSystems.BIN:
                        return this.decToBin(input);
                    case NumeralSystems.OCT:
                        return this.decToOct(input);
                    case NumeralSystems.HEX:
                        return this.decToHex(input);
                    default:
                        return input;
                }
            case NumeralSystems.HEX:
                switch (outputNumSystem) {
                    case NumeralSystems.BIN:
                        return this.hexToBin(input);
                    case NumeralSystems.OCT:
                        return this.hexToOct(input);
                    case NumeralSystems.DEC:
                        return this.hexToDec(input);
                    default:
                        return input;
                }
            default:
                return input;
        }
    }

    static isValidNumeralSystem(numSystem, input) {
        switch (numSystem) {
            case NumeralSystems.BIN:
                return /^[01]+$/.test(input);
            case NumeralSystems.OCT:
                return /^[0-7]+$/.test(input);
            case NumeralSystems.DEC:
                return /^[0-9]+$/.test(input);
            case NumeralSystems.HEX:
                return /^[0-9A-F]+$/.test(input);
            default:
                return false;
        }
    }

    /**
     * Converts input value from BIN to OCT numeral system.
     *
     * @param {string} input - Input value.
     * @returns {string} - Value but in the other numeral system.
     */
    static binToOct(input) {
        while (input.length % 3 !== 0) {
            input = "0" + input;
        }

        let octArr = [];

        for (let i = 0; i < input.length; i += 3) {
            let octVal = parseInt(input[i]) * (2 ** 2) +
                parseInt(input[i + 1]) * (2 ** 1) +
                parseInt(input[i + 2]) * (2 ** 0);
            octArr.push(octVal.toString());
        }

        return octArr.join('').replace(/^0+/, '');
    }

    /**
     * Converts input value from BIN to DEC numeral system.
     *
     * @param {string} input - Input value.
     * @returns {string} - Value but in the other numeral system.
     */
    static binToDec(input) {
        let binArr = input.split('').reverse();
        let decVal = 0;
        let i = 0;

        for (const binVal of binArr) {
            if (binVal === "1") {
                decVal += 2 ** i;
            }

            i++;
        }

        return decVal.toString().replace(/^0+/, '');
    }

    /**
     * Converts input value from BIN to HEX numeral system.
     *
     * @param {string} input - Input value.
     * @returns {string} - Value but in the other numeral system.
     */
    static binToHex(input) {
        while (input.length % 4 !== 0) {
            input = "0" + input;
        }

        const casing = (num) => {
            switch (num) {
                case 10:
                    return "A";
                case 11:
                    return "B";
                case 12:
                    return "C";
                case 13:
                    return "D";
                case 14:
                    return "E";
                case 15:
                    return "F";
                default:
                    return num.toString();
            }
        }

        let hexArr = [];

        for (let i = 0; i < input.length; i += 4) {
            let hexVal = parseInt(input[i]) * (2 ** 3) +
                parseInt(input[i + 1]) * (2 ** 2) +
                parseInt(input[i + 2]) * (2 ** 1) +
                parseInt(input[i + 3]) * (2 ** 0);
            hexArr.push(casing(hexVal));
        }

        return hexArr.join('').replace(/^0+/, '');
    }

    /**
     * Converts input value from OCT to BIN numeral system.
     *
     * @param {string} input - Input value.
     * @returns {string} - Value but in the other numeral system.
     */
    static octToBin(input) {
        let octArr = input.split('').reverse();
        let binArr = [];

        const casing = (num) => {
            switch (num) {
                case '0': return "000";
                case '1': return "001";
                case '2': return "010";
                case '3': return "011";
                case '4': return "100";
                case '5': return "101";
                case '6': return "110";
                case '7': return "111";
            }
        };

        for (let i = 0; i < octArr.length; i++) {
            binArr.push(casing(octArr[i]));
        }

        return binArr.reverse().join('').replace(/^0+/, '');
    }

    /**
     * Converts input value from OCT to DEC numeral system.
     *
     * @param {string} input - Input value.
     * @returns {string} - Value but in the other numeral system.
     */
    static octToDec(input) {
        let octArr = input.split('').reverse();
        let decValue = 0;
        let i = 0;

        for (const octVal of octArr) {
            decValue += parseInt(octVal) * (8 ** i);
            i++;
        }

        return decValue.toString().replace(/^0+/, '');
    }

    /**
     * Converts input value from OCT to HEX numeral system.
     *
     * @param {string} input - Input value.
     * @returns {string} - Value but in the other numeral system.
     */
    static octToHex(input) {
        // TODO
    }

    /**
     * Converts input value from DEC to BIN numeral system.
     *
     * @param {string} input - Input value.
     * @returns {string} - Value but in the other numeral system.
     */
    static decToBin(input) {
        let inputValue = parseInt(input);
        let arr = [];
        let i = 0;

        while (inputValue > 0) {
            arr[i] = inputValue % 2;
            inputValue = Math.floor(inputValue / 2);
            i++;
        }

        return arr.reverse().join('').replace(/^0+/, '');
    }

    /**
     * Converts input value from DEC to OCT numeral system.
     *
     * @param {string} input - Input value.
     * @returns {string} - Value but in the other numeral system.
     */
    static decToOct(input) {
        let inputValue = parseInt(input);
        let arr = [];
        let i = 0;

        while (inputValue > 0) {
            arr[i] = inputValue % 8;
            inputValue = Math.floor(inputValue / 8);
            i++;
        }

        return arr.reverse().join('').replace(/^0+/, '');
    }

    /**
     * Converts input value from DEC to HEX numeral system.
     *
     * @param {string} input - Input value.
     * @returns {string} - Value but in the other numeral system.
     */
    static decToHex(input) {
        let inputValue = parseInt(input);
        let hexArr = [];

        const casing = (num) => {
            const hexChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
            return hexChars[num];
        };

        while (inputValue > 0) {
            hexArr.push(casing(inputValue % 16));
            inputValue = Math.floor(inputValue / 16);
        }

        return hexArr.reverse().join('').replace(/^0+/, '');
    }

    /**
     * Converts input value from HEX to BIN numeral system.
     *
     * @param {string} input - Input value.
     * @returns {string} - Value but in the other numeral system.
     */
    static hexToBin(input) {
        let hexArr = input.split('').reverse();
        let binArr = [];

        const casing = (num) => {
            switch (num) {
                case '0':return "0000";
                case '1':return "0001";
                case '2':return "0010";
                case '3':return "0011";
                case '4':return "0100";
                case '5':return "0101";
                case '6':return "0110";
                case '7':return "0111";
                case '8':return "1000";
                case '9':return "1001";
                case 'A':return "1010";
                case 'B':return "1011";
                case 'C':return "1100";
                case 'D':return "1101";
                case 'E':return "1110";
                case 'F':return "1111";
            }
        };

        for (let i = 0; i < hexArr.length; i++) {
            binArr.push(casing(hexArr[i]));
        }

        return binArr.reverse().join("").replace(/^0+/, '');
    }

    /**
     * Converts input value from HEX to OCT numeral system.
     *
     * @param {string} input - Input value.
     * @returns {string} - Value but in the other numeral system.
     */
    static hexToOct(input) {
        let hexArr = input.split('');

        const getVal = (hexDigit) => {
            if (hexDigit >= '0' && hexDigit <= '9') {
                return hexDigit - '0';
            } else {
                return hexDigit.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
            }
        };

        let hexLen = input.length;
        let octLen = Math.floor(hexLen / 3) * 4;

        // One hex digit left that is 4 bits or 2 oct digits.
        if (hexLen % 3 === 1) {
            octLen += 2;
        } else if (hexLen % 3 === 2) { // 2 hex digits map to 3 oct digits
            octLen += 3;
        }

        let octArr = new Array(octLen).fill(0);
        let octIndex = octLen - 1;

        for (let i = hexLen - 1; i - 3 >= 0; i -= 3) {
            octArr[octIndex--] = getVal(hexArr[i]) % 8;
            octArr[octIndex--] = Math.floor(getVal(hexArr[i]) / 8 + (getVal(hexArr[i - 1]) % 4) * 2);
            octArr[octIndex--] = Math.floor(getVal(hexArr[i - 1]) / 4 + (getVal(hexArr[i - 2]) % 2) * 4);
            octArr[octIndex--] = Math.floor(getVal(hexArr[i - 2]) / 2);
        }

        // if hex_len is not divisible by 4 we have to take care of the extra digits:
        if (hexLen % 3 === 1) {
            octArr[1] = getVal(hexArr[0]) % 8;
            octArr[0] = Math.floor(getVal(hexArr[0]) / 8);
        } else if (hexLen % 3 === 2) {
            octArr[2] = getVal(hexArr[1]) % 8;
            octArr[1] = Math.floor(getVal(hexArr[1]) / 8) + (getVal(hexArr[0]) % 4) * 4;
            octArr[0] = Math.floor(getVal(hexArr[0]) / 4);
        }

        return octArr.join("").replace(/^0+/, '');
    }

    /**
     * Converts input value from HEX to DEC numeral system.
     *
     * @param {string} input - Input value.
     * @returns {string} - Value but in the other numeral system.
     */
    static hexToDec(input) {
        let hexArr = input.split('').reverse();
        let decValue = 0;
        let i = 0;

        for (const hexVal of hexArr) {
            switch (hexVal) {
                case "A":
                    decValue += 10 * (16 ** i);
                    break;
                case "B":
                    decValue += 11 * (16 ** i);
                    break;
                case "C":
                    decValue += 12 * (16 ** i);
                    break;
                case "D":
                    decValue += 13 * (16 ** i);
                    break;
                case "E":
                    decValue += 14 * (16 ** i);
                    break;
                case "F":
                    decValue += 15 * (16 ** i);
                    break;
                default:
                    decValue += parseInt(hexVal) * (16 ** i);
                    break;
            }
            i++;
        }

        return decValue.toString().replace(/^0+/, '');
    }
}