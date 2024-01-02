/**
 * Represents event handlers.
 */
class EventHandlers {
    /**
     * Handles the click event for the Arithmetic button.
     */
    static onBtnArithmeticClick() {
        ModeSwitcher.arithmetic();
    }

    /**
     * Handles the click event for the Convert button.
     */
    static onBtnConvertClick() {
        ModeSwitcher.numeralSystemConversion();
    }

    /**
     * Handles the click event for the Logic Gates button.
     */
    static onBtnLogicGatesClick() {
        ModeSwitcher.logicGates();
    }

    /**
     * Handles the click event for the Clear button.
     */
    static onBtnClearClick() {
        switch (calculatorMode) {
            case CalculatorModes.ARITHMETIC:
                ModeSwitcher.arithmetic();
                break;
            case CalculatorModes.CONVERSION:
                ModeSwitcher.numeralSystemConversion();
                break;
            case CalculatorModes.LOGICGATES:
                ModeSwitcher.logicGates();
                break;
            default:
                break;
        }
    }

    /**
     * Handles the click event for the Arithmetic File button.
     */
    static onBtnArithmeticFileClick() {
        $("#btnArithmeticFile").next('.inputFile').off("change").on("change", function(e) {
            FileParser.handleFileSelection(e, FileParser.arithmetic);
            $(this).val("");
        }).trigger('click');
    }

    /**
     * Handles the click event for the Convert File button.
     */
    static onBtnConvertFileClick() {
        $("#btnConvertFile").next('.inputFile').off("change").on("change", function(e) {
            FileParser.handleFileSelection(e, FileParser.numeralSystemConversion);
            $(this).val("");
        }).trigger('click');
    }

    /**
     * Handles the click event for the Logic Gates File button.
     */
    static onBtnLogicGatesFileClick() {
        $("#btnLogicGatesFile").next('.inputFile').off("change").on("change", function(e) {
            FileParser.handleFileSelection(e, FileParser.logicGates);
            $(this).val("");
        }).trigger('click');
    }

    /**
     * Handles the click event for the Backspace button.
     */
    static onBtnBackspaceClick() {
        // TODO
    }

    /**
     * Handles the click event for the BIN button.
     */
    static onBtnBinClick() {
        $("#lblResultNumSystem").html(NumeralSystems.BIN);

        if (calculatorMode === CalculatorModes.CONVERSION) {
            if ($("#lblDisplay").html().length > 0) {
                $("#lblResult").html(
                    ConversionOperations.convert(
                        $("#lblDisplayNumSystem").html(),
                        $("#lblResultNumSystem").html(),
                        $("#lblDisplay").html()
                    )
                );
                ModeSwitcher.disableNumeralSystems();
            } else {
                ModeSwitcher.numeralSystemConversionConfirmed(NumeralSystems.BIN);
            }
        } else {
            ModeSwitcher.logicGatesConfirmed(NumeralSystems.BIN);
        }
    }

    /**
     * Handles the click event for the OCT button.
     */
    static onBtnOctClick() {
        $("#lblResultNumSystem").html(NumeralSystems.OCT);

        if (calculatorMode === CalculatorModes.CONVERSION) {
            if ($("#lblDisplay").html().length > 0) {
                $("#lblResult").html(
                    ConversionOperations.convert(
                        $("#lblDisplayNumSystem").html(),
                        $("#lblResultNumSystem").html(),
                        $("#lblDisplay").html()
                    )
                );
                ModeSwitcher.disableNumeralSystems();
            } else {
                ModeSwitcher.numeralSystemConversionConfirmed(NumeralSystems.OCT);
            }
        } else {
            ModeSwitcher.logicGatesConfirmed(NumeralSystems.OCT);
        }
    }

    /**
     * Handles the click event for the DEC button.
     */
    static onBtnDecClick() {
        $("#lblResultNumSystem").html(NumeralSystems.DEC);

        if (calculatorMode === CalculatorModes.CONVERSION) {
            if ($("#lblDisplay").html().length > 0) {
                $("#lblResult").html(
                    ConversionOperations.convert(
                        $("#lblDisplayNumSystem").html(),
                        $("#lblResultNumSystem").html(),
                        $("#lblDisplay").html()
                    )
                );
                ModeSwitcher.disableNumeralSystems();
            } else {
                ModeSwitcher.numeralSystemConversionConfirmed(NumeralSystems.DEC);
            }
        } else {
            ModeSwitcher.logicGatesConfirmed(NumeralSystems.DEC);
        }
    }

    /**
     * Handles the click event for the HEX button.
     */
    static onBtnHexClick() {
        $("#lblResultNumSystem").html(NumeralSystems.HEX);

        if (calculatorMode === CalculatorModes.CONVERSION) {
            if ($("#lblDisplay").html().length > 0) {
                $("#lblResult").html(
                    ConversionOperations.convert(
                        $("#lblDisplayNumSystem").html(),
                        $("#lblResultNumSystem").html(),
                        $("#lblDisplay").html()
                    )
                );
                ModeSwitcher.disableNumeralSystems();
            } else {
                ModeSwitcher.numeralSystemConversionConfirmed(NumeralSystems.HEX);
            }
        } else {
            ModeSwitcher.logicGatesConfirmed(NumeralSystems.HEX);
        }
    }

    /**
     * Handles the click event for the '(' button.
     */
    static onBtnOpeningParenthesesClick() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + "(");
    }

    /**
     * Handles the click event for the ')' button.
     */
    static onBtnClosingParenthesesClick() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + ")");
    }

    /**
     * Handles the click event for the Modulus button.
     */
    static onBtnModulusClick() {
        const lblResult = $("#lblResult");
        const lblResultValue = lblResult.html();
        if (lblResult.length > 0 && !isNaN(lblResultValue[lblResultValue.length - 1])) {
            lblResult.html(lblResultValue + " % ");
        }
    }

    /**
     * Handles the click event for the A button.
     */
    static onBtnAClick() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + "A");
    }

    /**
     * Handles the click event for the B button.
     */
    static onBtnBClick() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + "B");
    }

    /**
     * Handles the click event for the C button.
     */
    static onBtnCClick() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + "C");
    }

    /**
     * Handles the click event for the D button.
     */
    static onBtnDClick() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + "D");
    }

    /**
     * Handles the click event for the E button.
     */
    static onBtnEClick() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + "E");
    }

    /**
     * Handles the click event for the F button.
     */
    static onBtnFClick() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + "F");
    }

    /**
     * Handles the click event for the SET button.
     */
    static onBtnSetClick() {
        switch (calculatorMode) {
            case CalculatorModes.ARITHMETIC:

                break;
            case CalculatorModes.CONVERSION:
                if ($("#lblResult").html().length > 0) {
                    $("#lblDisplayNumSystem").html($("#lblResultNumSystem").html());
                    $("#lblDisplay").html($("#lblResult").html());
                    $("#lblResultNumSystem").html("");
                    $("#lblResult").html("");
                    ModeSwitcher.numeralSystemConversionSet();
                }
                break;
            case CalculatorModes.LOGICGATES:

                break;
            default:
                break;
        }
    }

    /**
     * Handles the click event for the 7 button.
     */
    static onBtnNum7Click() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + "7");
    }

    /**
     * Handles the click event for the 8 button.
     */
    static onBtnNum8Click() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + "8");
    }

    /**
     * Handles the click event for the 9 button.
     */
    static onBtnNum9Click() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + "9");
    }

    /**
     * Handles the click event for the Squared button.
     */
    static onBtnSquaredClick() {
        const lblResult = $("#lblResult");
        const lblResultValue = lblResult.html();
        if (lblResult.length > 0 && !isNaN(lblResultValue[lblResultValue.length - 1])) {
            lblResult.html(lblResultValue + "<sup>" + 2 +"</sup>");
        }
    }

    /**
     * Handles the click event for the Square Root button.
     */
    static onBtnSquareRootClick() {
        // TODO
    }

    /**
     * Handles the click event for the AND Gate button.
     */
    static onBtnGateANDClick() {
        // TODO
    }

    /**
     * Handles the click event for the OR Gate button.
     */
    static onBtnGateORClick() {
        // TODO
    }

    /**
     * Handles the click event for the 4 button.
     */
    static onBtnNum4Click() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + "4");
    }

    /**
     * Handles the click event for the 5 button.
     */
    static onBtnNum5Click() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + "5");
    }

    /**
     * Handles the click event for the 6 button.
     */
    static onBtnNum6Click() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + "6");
    }

    /**
     * Handles the click event for the Division button.
     */
    static onBtnDivisionClick() {
        // TODO
    }

    /**
     * Handles the click event for the n-th Root button.
     */
    static onBtnNthRootClick() {
        // TODO
    }

    /**
     * Handles the click event for the NAND Gate button.
     */
    static onBtnGateNANDClick() {
        // TODO
    }

    /**
     * Handles the click event for the NOR Gate button.
     */
    static onBtnGateNORClick() {
        // TODO
    }

    /**
     * Handles the click event for the 1 button.
     */
    static onBtnNum1Click() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + "1");
    }

    /**
     * Handles the click event for the 2 button.
     */
    static onBtnNum2Click() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + "2");
    }

    /**
     * Handles the click event for the 3 button.
     */
    static onBtnNum3Click() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + "3");
    }

    /**
     * Handles the click event for the Multiplication button.
     */
    static onBtnMultiplicationClick() {
        // TODO
    }

    /**
     * Handles the click event for the Exponentiation button.
     */
    static onBtnExponentiationClick() {
        // TODO
    }

    /**
     * Handles the click event for the XOR Gate button.
     */
    static onBtnGateXORClick() {
        // TODO
    }

    /**
     * Handles the click event for the NOT Gate button.
     */
    static onBtnGateNOTClick() {
        // TODO
    }

    /**
     * Handles the click event for the Negative button.
     */
    static onBtnNegativeClick() {
        // TODO
    }

    /**
     * Handles the click event for the 0 button.
     */
    static onBtnNum0Click() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + "0");
    }

    /**
     * Handles the click event for the Comma button.
     */
    static onBtnCommaClick() {
        // TODO
    }

    /**
     * Handles the click event for the Subtraction button.
     */
    static onBtnSubtractionClick() {
        // TODO
    }

    /**
     * Handles the click event for the Addition button.
     */
    static onBtnAdditionClick() {
        // TODO
    }

    /**
     * Handles the click event for the Equals button.
     */
    static onBtnEqualsClick() {
        // TODO
    }
}