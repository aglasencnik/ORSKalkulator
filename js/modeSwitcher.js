/**
 * Represents a mode switcher.
 */
class ModeSwitcher {
    /**
     * Switches the mode to Arithmetic.
     */
    static arithmetic() {
        $("#btnArithmetic").prop("disabled", true);
        $("#btnConvert").prop("disabled", false);
        $("#btnLogicGates").prop("disabled", false);
        $("#btnClear").prop("disabled", false);
        $("#btnArithmeticFile").prop("disabled", false);
        $("#btnConvertFile").prop("disabled", false);
        $("#btnLogicGatesFile").prop("disabled", false);
        $("#btnBackspace").prop("disabled", false);
        $("#btnBin").prop("disabled", true);
        $("#btnOct").prop("disabled", true);
        $("#btnDec").prop("disabled", true);
        $("#btnHex").prop("disabled", true);
        $("#btnOpeningParentheses").prop("disabled", false);
        $("#btnClosingParentheses").prop("disabled", false);
        $("#btnModulus").prop("disabled", false);
        $("#btnA").prop("disabled", true);
        $("#btnB").prop("disabled", true);
        $("#btnC").prop("disabled", true);
        $("#btnD").prop("disabled", true);
        $("#btnE").prop("disabled", true);
        $("#btnF").prop("disabled", true);
        $("#btnSet").prop("disabled", true);
        $("#btnNum7").prop("disabled", false);
        $("#btnNum8").prop("disabled", false);
        $("#btnNum9").prop("disabled", false);
        $("#btnSquared").prop("disabled", false);
        $("#btnSquareRoot").prop("disabled", false);
        $("#btnGateAND").prop("disabled", true);
        $("#btnGateOR").prop("disabled", true);
        $("#btnNum4").prop("disabled", false);
        $("#btnNum5").prop("disabled", false);
        $("#btnNum6").prop("disabled", false);
        $("#btnDivision").prop("disabled", false);
        $("#btnNthRoot").prop("disabled", false);
        $("#btnGateNAND").prop("disabled", true);
        $("#btnGateNOR").prop("disabled", true);
        $("#btnNum1").prop("disabled", false);
        $("#btnNum2").prop("disabled", false);
        $("#btnNum3").prop("disabled", false);
        $("#btnMultiplication").prop("disabled", false);
        $("#btnExponentiation").prop("disabled", false);
        $("#btnGateXOR").prop("disabled", true);
        $("#btnGateNOT").prop("disabled", true);
        $("#btnNegative").prop("disabled", false);
        $("#btnNum0").prop("disabled", false);
        $("#btnComma").prop("disabled", false);
        $("#btnSubtraction").prop("disabled", false);
        $("#btnAddition").prop("disabled", false);
        $("#btnEquals").prop("disabled", false);
        this.clearDisplay();

        calculatorMode = CalculatorModes.ARITHMETIC;
    }

    /**
     * Disables the arithmetic commands.
     */
    static disableArithmetic() {
        $("#btnClear").prop("disabled", false);
        $("#btnBackspace").prop("disabled", true);
        $("#btnOpeningParentheses").prop("disabled", true);
        $("#btnClosingParentheses").prop("disabled", true);
        $("#btnModulus").prop("disabled", true);
        $("#btnSet").prop("disabled", true);
        $("#btnNum7").prop("disabled", true);
        $("#btnNum8").prop("disabled", true);
        $("#btnNum9").prop("disabled", true);
        $("#btnSquared").prop("disabled", true);
        $("#btnSquareRoot").prop("disabled", true);
        $("#btnNum4").prop("disabled", true);
        $("#btnNum5").prop("disabled", true);
        $("#btnNum6").prop("disabled", true);
        $("#btnDivision").prop("disabled", true);
        $("#btnNthRoot").prop("disabled", true);
        $("#btnNum1").prop("disabled", true);
        $("#btnNum2").prop("disabled", true);
        $("#btnNum3").prop("disabled", true);
        $("#btnMultiplication").prop("disabled", true);
        $("#btnExponentiation").prop("disabled", true);
        $("#btnNegative").prop("disabled", true);
        $("#btnNum0").prop("disabled", true);
        $("#btnComma").prop("disabled", true);
        $("#btnSubtraction").prop("disabled", true);
        $("#btnAddition").prop("disabled", true);
        $("#btnEquals").prop("disabled", true);
    }

    /**
     * Switches the mode to Numeral System Conversion.
     */
    static numeralSystemConversion() {
        $("#btnArithmetic").prop("disabled", false);
        $("#btnConvert").prop("disabled", true);
        $("#btnLogicGates").prop("disabled", false);
        $("#btnClear").prop("disabled", true);
        $("#btnArithmeticFile").prop("disabled", false);
        $("#btnConvertFile").prop("disabled", false);
        $("#btnLogicGatesFile").prop("disabled", false);
        $("#btnBackspace").prop("disabled", true);
        $("#btnBin").prop("disabled", false);
        $("#btnOct").prop("disabled", false);
        $("#btnDec").prop("disabled", false);
        $("#btnHex").prop("disabled", false);
        $("#btnOpeningParentheses").prop("disabled", true);
        $("#btnClosingParentheses").prop("disabled", true);
        $("#btnModulus").prop("disabled", true);
        $("#btnA").prop("disabled", true);
        $("#btnB").prop("disabled", true);
        $("#btnC").prop("disabled", true);
        $("#btnD").prop("disabled", true);
        $("#btnE").prop("disabled", true);
        $("#btnF").prop("disabled", true);
        $("#btnSet").prop("disabled", true);
        $("#btnNum7").prop("disabled", true);
        $("#btnNum8").prop("disabled", true);
        $("#btnNum9").prop("disabled", true);
        $("#btnSquared").prop("disabled", true);
        $("#btnSquareRoot").prop("disabled", true);
        $("#btnGateAND").prop("disabled", true);
        $("#btnGateOR").prop("disabled", true);
        $("#btnNum4").prop("disabled", true);
        $("#btnNum5").prop("disabled", true);
        $("#btnNum6").prop("disabled", true);
        $("#btnDivision").prop("disabled", true);
        $("#btnNthRoot").prop("disabled", true);
        $("#btnGateNAND").prop("disabled", true);
        $("#btnGateNOR").prop("disabled", true);
        $("#btnNum1").prop("disabled", true);
        $("#btnNum2").prop("disabled", true);
        $("#btnNum3").prop("disabled", true);
        $("#btnMultiplication").prop("disabled", true);
        $("#btnExponentiation").prop("disabled", true);
        $("#btnGateXOR").prop("disabled", true);
        $("#btnGateNOT").prop("disabled", true);
        $("#btnNegative").prop("disabled", true);
        $("#btnNum0").prop("disabled", true);
        $("#btnComma").prop("disabled", true);
        $("#btnSubtraction").prop("disabled", true);
        $("#btnAddition").prop("disabled", true);
        $("#btnEquals").prop("disabled", true);
        this.clearDisplay();

        calculatorMode = CalculatorModes.CONVERSION;
    }

    /**
     * Enables the right buttons for numeral system conversion.
     *
     * @param {string} numSystem - Numeral system of the input value
     */
    static numeralSystemConversionConfirmed(numSystem) {
        switch (numSystem) {
            case NumeralSystems.BIN:
                this.setBIN();
                break;
            case NumeralSystems.OCT:
                this.setOCT();
                break;
            case NumeralSystems.DEC:
                this.setDEC();
                break;
            case NumeralSystems.HEX:
                this.setHEX();
                break;
            default:
                break;
        }

        $("#btnClear").prop("disabled", false);
        $("#btnBackspace").prop("disabled", false);
        $("#btnSet").prop("disabled", false);
        $("#btnBin").prop("disabled", true);
        $("#btnOct").prop("disabled", true);
        $("#btnDec").prop("disabled", true);
        $("#btnHex").prop("disabled", true);
    }

    /**
     * Enables the right buttons for numeral system conversion.
     *
     * @param {string} numSystem - Numeral system of the input value
     */
    static numeralSystemConversionSet(numSystem) {
        $("#btnSet").prop("disabled", true);
        $("#btnBackspace").prop("disabled", true);
        $("#btnNum0").prop("disabled", true);
        $("#btnNum1").prop("disabled", true);
        $("#btnNum2").prop("disabled", true);
        $("#btnNum3").prop("disabled", true);
        $("#btnNum4").prop("disabled", true);
        $("#btnNum5").prop("disabled", true);
        $("#btnNum6").prop("disabled", true);
        $("#btnNum7").prop("disabled", true);
        $("#btnNum8").prop("disabled", true);
        $("#btnNum9").prop("disabled", true);
        $("#btnA").prop("disabled", true);
        $("#btnB").prop("disabled", true);
        $("#btnC").prop("disabled", true);
        $("#btnD").prop("disabled", true);
        $("#btnE").prop("disabled", true);
        $("#btnF").prop("disabled", true);
        $("#btnBin").prop("disabled", false);
        $("#btnOct").prop("disabled", false);
        $("#btnDec").prop("disabled", false);
        $("#btnHex").prop("disabled", false);
    }

    /**
     * Switches the mode to Logic Gates.
     */
    static logicGates() {
        $("#btnArithmetic").prop("disabled", false);
        $("#btnConvert").prop("disabled", false);
        $("#btnLogicGates").prop("disabled", true);
        $("#btnClear").prop("disabled", true);
        $("#btnArithmeticFile").prop("disabled", false);
        $("#btnConvertFile").prop("disabled", false);
        $("#btnLogicGatesFile").prop("disabled", false);
        $("#btnBackspace").prop("disabled", true);
        $("#btnBin").prop("disabled", false);
        $("#btnOct").prop("disabled", false);
        $("#btnDec").prop("disabled", false);
        $("#btnHex").prop("disabled", false);
        $("#btnOpeningParentheses").prop("disabled", true);
        $("#btnClosingParentheses").prop("disabled", true);
        $("#btnModulus").prop("disabled", true);
        $("#btnA").prop("disabled", true);
        $("#btnB").prop("disabled", true);
        $("#btnC").prop("disabled", true);
        $("#btnD").prop("disabled", true);
        $("#btnE").prop("disabled", true);
        $("#btnF").prop("disabled", true);
        $("#btnSet").prop("disabled", true);
        $("#btnNum7").prop("disabled", true);
        $("#btnNum8").prop("disabled", true);
        $("#btnNum9").prop("disabled", true);
        $("#btnSquared").prop("disabled", true);
        $("#btnSquareRoot").prop("disabled", true);
        $("#btnGateAND").prop("disabled", true);
        $("#btnGateOR").prop("disabled", true);
        $("#btnNum4").prop("disabled", true);
        $("#btnNum5").prop("disabled", true);
        $("#btnNum6").prop("disabled", true);
        $("#btnDivision").prop("disabled", true);
        $("#btnNthRoot").prop("disabled", true);
        $("#btnGateNAND").prop("disabled", true);
        $("#btnGateNOR").prop("disabled", true);
        $("#btnNum1").prop("disabled", true);
        $("#btnNum2").prop("disabled", true);
        $("#btnNum3").prop("disabled", true);
        $("#btnMultiplication").prop("disabled", true);
        $("#btnExponentiation").prop("disabled", true);
        $("#btnGateXOR").prop("disabled", true);
        $("#btnGateNOT").prop("disabled", true);
        $("#btnNegative").prop("disabled", true);
        $("#btnNum0").prop("disabled", true);
        $("#btnComma").prop("disabled", true);
        $("#btnSubtraction").prop("disabled", true);
        $("#btnAddition").prop("disabled", true);
        $("#btnEquals").prop("disabled", true);
        this.clearDisplay();

        calculatorMode = CalculatorModes.LOGICGATES;
    }

    /**
     * Enables the right buttons for logic gates conversion.
     *
     * @param {string} numSystem - Numeral system of the input value
     */
    static logicGatesConfirmed(numSystem) {
        switch (numSystem) {
            case NumeralSystems.BIN:
                this.setBIN();
                break;
            case NumeralSystems.OCT:
                this.setOCT();
                break;
            case NumeralSystems.DEC:
                this.setDEC();
                break;
            case NumeralSystems.HEX:
                this.setHEX();
                break;
            default:
                break;
        }

        $("#btnClear").prop("disabled", false);
        $("#btnBackspace").prop("disabled", false);
        $("#btnBin").prop("disabled", true);
        $("#btnOct").prop("disabled", true);
        $("#btnDec").prop("disabled", true);
        $("#btnHex").prop("disabled", true);
        $("#btnGateAND").prop("disabled", false);
        $("#btnGateOR").prop("disabled", false);
        $("#btnGateNAND").prop("disabled", false);
        $("#btnGateNOR").prop("disabled", false);
        $("#btnGateXOR").prop("disabled", false);
        $("#btnGateNOT").prop("disabled", false);
        $("#btnOpeningParentheses").prop("disabled", false);
        $("#btnClosingParentheses").prop("disabled", false);
        $("#btnSet").prop("disabled", false);
        $("#btnEquals").prop("disabled", true);
    }

    /**
     * Enables the right buttons for logic gates evaluation.
     *
     * @param {string} numSystem - Numeral system of the input value
     */
    static logicGatesSet(numSystem) {
        $("#btnSet").prop("disabled", true);
        $("#btnBackspace").prop("disabled", true);
        $("#btnNum0").prop("disabled", true);
        $("#btnNum1").prop("disabled", true);
        $("#btnNum2").prop("disabled", true);
        $("#btnNum3").prop("disabled", true);
        $("#btnNum4").prop("disabled", true);
        $("#btnNum5").prop("disabled", true);
        $("#btnNum6").prop("disabled", true);
        $("#btnNum7").prop("disabled", true);
        $("#btnNum8").prop("disabled", true);
        $("#btnNum9").prop("disabled", true);
        $("#btnA").prop("disabled", true);
        $("#btnB").prop("disabled", true);
        $("#btnC").prop("disabled", true);
        $("#btnD").prop("disabled", true);
        $("#btnE").prop("disabled", true);
        $("#btnF").prop("disabled", true);
        $("#btnOpeningParentheses").prop("disabled", true);
        $("#btnClosingParentheses").prop("disabled", true);
        $("#btnGateAND").prop("disabled", true);
        $("#btnGateOR").prop("disabled", true);
        $("#btnGateNAND").prop("disabled", true);
        $("#btnGateNOR").prop("disabled", true);
        $("#btnGateXOR").prop("disabled", true);
        $("#btnGateNOT").prop("disabled", true);
        $("#btnBin").prop("disabled", false);
        $("#btnOct").prop("disabled", false);
        $("#btnDec").prop("disabled", false);
        $("#btnHex").prop("disabled", false);
    }

    static setBIN() {
        $("#btnNum0").prop("disabled", false);
        $("#btnNum1").prop("disabled", false);
    }

    static setOCT() {
        this.setBIN();
        $("#btnNum2").prop("disabled", false);
        $("#btnNum3").prop("disabled", false);
        $("#btnNum4").prop("disabled", false);
        $("#btnNum5").prop("disabled", false);
        $("#btnNum6").prop("disabled", false);
        $("#btnNum7").prop("disabled", false);
    }

    static setDEC() {
        this.setOCT();
        $("#btnNum8").prop("disabled", false);
        $("#btnNum9").prop("disabled", false);
    }

    static setHEX() {
        this.setDEC();
        $("#btnA").prop("disabled", false);
        $("#btnB").prop("disabled", false);
        $("#btnC").prop("disabled", false);
        $("#btnD").prop("disabled", false);
        $("#btnE").prop("disabled", false);
        $("#btnF").prop("disabled", false);
    }

    static clearDisplay() {
        $("#lblDisplayNumSystem").html("");
        $("#lblResultNumSystem").html("");
        $("#lblDisplay").html("");
        $("#lblResult").html("");
    }

    static disableNumeralSystems() {
        $("#btnBin").prop("disabled", true);
        $("#btnOct").prop("disabled", true);
        $("#btnDec").prop("disabled", true);
        $("#btnHex").prop("disabled", true);
    }
}