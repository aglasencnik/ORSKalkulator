/**
 * Represents event handlers.
 */
class EventHandlers {
    static operatorStack = [];

    static onBtnNumClick(number) {
        const lblResult = $("#lblResult");
        switch (calculatorMode) {
            case CalculatorModes.ARITHMETIC:
                let currentElement = lblResult;
                if (EventHandlers.operatorStack.length > 0) {
                    let stackElement = EventHandlers.operatorStack[EventHandlers.operatorStack.length - 1];
                    currentElement = stackElement.element.children().eq(stackElement.childNum - 1);
                }

                let lastChild = currentElement;
                if (currentElement.children().length > 0) {
                    lastChild = currentElement.children().last();
                }

                if (lastChild.data("type") === "number") {
                    if (number === "." && !lastChild.html().includes(".")) {
                        lastChild.html((lastChild.html() === "" ? "0" : lastChild.html()) + number);
                        lastChild.attr("data-value", lastChild.html());
                    } else if (number !== "." && !(number === "0" && lastChild.html() === "0")) {
                        lastChild.html(lastChild.html() + number.toString());
                        lastChild.attr("data-value", lastChild.html());
                    }
                } else {
                    if (number === ".") {
                        const newElement = $("<span>")
                            .attr("data-type", "number")
                            .attr("data-value", "0.")
                            .html("0.");
                        currentElement.append(newElement);
                    } else {
                        const newElement = $("<span>")
                            .attr("data-type", "number")
                            .attr("data-value", number.toString())
                            .html(number.toString());
                        currentElement.append(newElement);
                    }
                }
                break;
            default:
                lblResult.html(lblResult.html() + number);
                break;
        }
    }

    static onBasicOperatorClick(opValue, opHtml, allowOtherModes = false) {
        const lblResult = $("#lblResult");
        switch (calculatorMode) {
            case CalculatorModes.ARITHMETIC:
                if (EventHandlers.operatorStack.length === 0) {
                    lblResult.append($("<span>").attr("data-type", "operator").attr("data-value", opValue).html(opHtml));
                } else {
                    let currentElement = lblResult;
                    if (EventHandlers.operatorStack.length > 0) {
                        let stackElement = EventHandlers.operatorStack[EventHandlers.operatorStack.length - 1];
                        currentElement = stackElement.element.children().eq(stackElement.childNum - 1);
                    }

                    currentElement.append(
                        $("<span>").attr("data-type", "operator").attr("data-value", opValue).html(opHtml)
                    );
                }
                break;
            default:
                lblResult.html(lblResult.html() + opHtml);
                break;
        }
    }

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
                EventHandlers.operatorStack = [];
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
        $("#btnArithmeticFile").next('.inputFile').off("change").on("change", function (e) {
            FileParser.handleFileSelection(e, FileParser.arithmetic);
            $(this).val("");
        }).trigger('click');
    }

    /**
     * Handles the click event for the Convert File button.
     */
    static onBtnConvertFileClick() {
        $("#btnConvertFile").next('.inputFile').off("change").on("change", function (e) {
            FileParser.handleFileSelection(e, FileParser.numeralSystemConversion);
            $(this).val("");
        }).trigger('click');
    }

    /**
     * Handles the click event for the Logic Gates File button.
     */
    static onBtnLogicGatesFileClick() {
        $("#btnLogicGatesFile").next('.inputFile').off("change").on("change", function (e) {
            FileParser.handleFileSelection(e, FileParser.logicGates);
            $(this).val("");
        }).trigger('click');
    }

    /**
     * Handles the click event for the Backspace button.
     */
    static onBtnBackspaceClick() {
        const lblResult = $("#lblResult");
        let str = lblResult.html();

        switch (calculatorMode) {
            case CalculatorModes.ARITHMETIC:
                if (EventHandlers.operatorStack.length > 0) {
                    let stackElement = EventHandlers.operatorStack[EventHandlers.operatorStack.length - 1];
                    let currentElement = stackElement.element.children().eq(stackElement.childNum - 1);
                    let lastChild = currentElement.children().last();

                    if (lastChild.length) {
                        if (lastChild.data("type") === "number") {
                            let text = lastChild.text();
                            if (text.length > 1) {
                                lastChild.text(text.slice(0, -1));
                                lastChild.attr("data-value", lastChild.text());
                            } else {
                                lastChild.remove();
                            }
                        } else {
                            lastChild.remove();
                        }
                    } else {
                        const stackElement = EventHandlers.operatorStack.find(el => el.element.is(currentElement.parent()));
                        if (stackElement) {
                            EventHandlers.operatorStack = EventHandlers.operatorStack.filter(el => el !== stackElement);

                            if (EventHandlers.operatorStack.length === 0) {
                                $("#btnSet").prop("disabled", true);
                            }
                        }
                        currentElement.parent().remove();
                    }
                } else {
                    const lastChild = lblResult.children().last();
                    if (lastChild.length) {
                        if (lastChild.data("type") === "number") {
                            let text = lastChild.text();
                            if (text.length > 1) {
                                lastChild.text(text.slice(0, -1));
                                lastChild.attr("data-value", lastChild.text());
                            } else {
                                lastChild.remove();
                            }
                        } else {
                            lastChild.remove();
                        }
                    }
                }
                break;
            case CalculatorModes.CONVERSION:
                str = str.slice(0, -1);
                lblResult.html(str);
                break;
            case CalculatorModes.LOGICGATES:
                if (str.endsWith(' ') && str.length > 0) {
                    str = str.slice(0, -1);
                    const lastSpace = str.lastIndexOf(' ');
                    if (lastSpace !== -1) {
                        str = str.slice(0, lastSpace);
                    }
                } else {
                    str = str.slice(0, -1);
                }
                lblResult.html(str);
                break;
            default:
                break;
        }
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
            if ($("#lblDisplay").html().length > 0) {
                $("#btnBin").prop("disabled", true);
                $("#btnOct").prop("disabled", false);
                $("#btnDec").prop("disabled", false);
                $("#btnHex").prop("disabled", false);
                $("#btnEquals").prop("disabled", false);
                $("#lblResultNumSystem").html(NumeralSystems.BIN);
            } else {
                ModeSwitcher.logicGatesConfirmed(NumeralSystems.BIN);
            }
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
            if ($("#lblDisplay").html().length > 0) {
                $("#btnBin").prop("disabled", false);
                $("#btnOct").prop("disabled", true);
                $("#btnDec").prop("disabled", false);
                $("#btnHex").prop("disabled", false);
                $("#btnEquals").prop("disabled", false);
                $("#lblResultNumSystem").html(NumeralSystems.OCT);
            } else {
                ModeSwitcher.logicGatesConfirmed(NumeralSystems.OCT);
            }
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
            if ($("#lblDisplay").html().length > 0) {
                $("#btnBin").prop("disabled", false);
                $("#btnOct").prop("disabled", false);
                $("#btnDec").prop("disabled", true);
                $("#btnHex").prop("disabled", false);
                $("#btnEquals").prop("disabled", false);
                $("#lblResultNumSystem").html(NumeralSystems.DEC);
            } else {
                ModeSwitcher.logicGatesConfirmed(NumeralSystems.DEC);
            }
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
            if ($("#lblDisplay").html().length > 0) {
                $("#btnBin").prop("disabled", false);
                $("#btnOct").prop("disabled", false);
                $("#btnDec").prop("disabled", false);
                $("#btnHex").prop("disabled", true);
                $("#btnEquals").prop("disabled", false);
                $("#lblResultNumSystem").html(NumeralSystems.HEX);
            } else {
                ModeSwitcher.logicGatesConfirmed(NumeralSystems.HEX);
            }
        }
    }

    /**
     * Handles the click event for the '(' button.
     */
    static onBtnOpeningParenthesesClick() {
        EventHandlers.onBasicOperatorClick("(", " ( ", true);
    }

    /**
     * Handles the click event for the ')' button.
     */
    static onBtnClosingParenthesesClick() {
        EventHandlers.onBasicOperatorClick(")", " ) ", true);
    }

    /**
     * Handles the click event for the Modulus button.
     */
    static onBtnModulusClick() {
        EventHandlers.onBasicOperatorClick("%", " % ");
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
                EventHandlers.operatorStack.pop();
                if (EventHandlers.operatorStack.length === 0) {
                    $("#btnSet").prop("disabled", true);
                }
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
                if ($("#lblResult").html().length > 0) {
                    $("#lblDisplayNumSystem").html($("#lblResultNumSystem").html());
                    $("#lblDisplay").html($("#lblResult").html());
                    $("#lblResultNumSystem").html("");
                    $("#lblResult").html("");
                    ModeSwitcher.logicGatesSet();
                }
                break;
            default:
                break;
        }
    }

    /**
     * Handles the click event for the 7 button.
     */
    static onBtnNum7Click() {
        EventHandlers.onBtnNumClick("7");
    }

    /**
     * Handles the click event for the 8 button.
     */
    static onBtnNum8Click() {
        EventHandlers.onBtnNumClick("8");
    }

    /**
     * Handles the click event for the 9 button.
     */
    static onBtnNum9Click() {
        EventHandlers.onBtnNumClick("9");
    }

    /**
     * Handles the click event for the Squared button.
     */
    static onBtnSquaredClick() {
        const lblResult = $("#lblResult");
        const powElement = $("<span>").attr("data-type", "advanced-operator").attr("data-value", "pow");
        const exponent = $("<sup>").attr("data-type", "exponent").attr("data-value", "2");
        exponent.append($("<span>").attr("data-type", "number").attr("data-value", "2").html("2"));
        powElement.append(exponent);

        let currentElement = lblResult;
        if (EventHandlers.operatorStack.length > 0) {
            let stackElement = EventHandlers.operatorStack[EventHandlers.operatorStack.length - 1];
            currentElement = stackElement.element.children().eq(stackElement.childNum - 1);
        }

        const lastChild = currentElement.children().last();
        if (lastChild.data("type") === "number" || lastChild.data("value") === ")") {
            currentElement.append(powElement);
        } else if (lastChild.data("value") === "pow") {
            const allChildren = currentElement.children();
            for (let i = allChildren.length - 1; i >= 0; i--) {
                if (allChildren.eq(i).data("type") === "number") {
                    allChildren.eq(i).before($("<span>").attr("data-type", "operator").attr("data-value", "(").html(" ( "));
                    break;
                }
            }
            currentElement.append($("<span>").attr("data-type", "operator").attr("data-value", ")").html(" ) "));
            currentElement.append(powElement);
        }
    }

    /**
     * Handles the click event for the Square Root button.
     */
    static onBtnSquareRootClick() {
        const lblResult = $("#lblResult");
        const sqrtElement = $("<span>").addClass("root").attr("data-type", "advanced-operator").attr("data-value", "nth-root");
        const indexElement = $("<span>").attr("data-type", "index").attr("data-value", "2");
        const contentElement = $("<span>").attr("data-type", "content");
        indexElement.append($("<span>").attr("data-type", "number").attr("data-value", "2").html(""));
        sqrtElement.append(indexElement);
        sqrtElement.append("&radic;");
        sqrtElement.append(contentElement);

        if (EventHandlers.operatorStack.length === 0) {
            lblResult.append(sqrtElement);
        } else {
            let stackElement = EventHandlers.operatorStack[EventHandlers.operatorStack.length - 1];
            stackElement.element.children().eq(stackElement.childNum - 1).append(sqrtElement);
        }

        EventHandlers.operatorStack.push({element: sqrtElement, childNum: 2});
        $("#btnSet").prop("disabled", false);
    }

    /**
     * Handles the click event for the AND Gate button.
     */
    static onBtnGateANDClick() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + " AND ");
    }

    /**
     * Handles the click event for the OR Gate button.
     */
    static onBtnGateORClick() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + " OR ");
    }

    /**
     * Handles the click event for the 4 button.
     */
    static onBtnNum4Click() {
        EventHandlers.onBtnNumClick("4");
    }

    /**
     * Handles the click event for the 5 button.
     */
    static onBtnNum5Click() {
        EventHandlers.onBtnNumClick("5");
    }

    /**
     * Handles the click event for the 6 button.
     */
    static onBtnNum6Click() {
        EventHandlers.onBtnNumClick("6");
    }

    /**
     * Handles the click event for the Division button.
     */
    static onBtnDivisionClick() {
        EventHandlers.onBasicOperatorClick("/", " ÷ ");
    }

    /**
     * Handles the click event for the n-th Root button.
     */
    static onBtnNthRootClick() {
        const lblResult = $("#lblResult");
        const rootElement = $("<span>").addClass("root").attr("data-type", "advanced-operator").attr("data-value", "nth-root");
        const indexElement = $("<sup>").attr("data-type", "index");
        const contentElement = $("<span>").attr("data-type", "content");
        rootElement.append(indexElement);
        rootElement.append("&radic;");
        rootElement.append(contentElement);

        if (EventHandlers.operatorStack.length === 0) {
            lblResult.append(rootElement);
        } else {
            let stackElement = EventHandlers.operatorStack[EventHandlers.operatorStack.length - 1];
            stackElement.element.children().eq(stackElement.childNum - 1).append(rootElement);
        }

        EventHandlers.operatorStack.push({element: rootElement, childNum: 2});
        EventHandlers.operatorStack.push({element: rootElement, childNum: 1});
        $("#btnSet").prop("disabled", false);
    }

    /**
     * Handles the click event for the NAND Gate button.
     */
    static onBtnGateNANDClick() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + " NAND ");
    }

    /**
     * Handles the click event for the NOR Gate button.
     */
    static onBtnGateNORClick() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + " NOR ");
    }

    /**
     * Handles the click event for the 1 button.
     */
    static onBtnNum1Click() {
        EventHandlers.onBtnNumClick("1");
    }

    /**
     * Handles the click event for the 2 button.
     */
    static onBtnNum2Click() {
        EventHandlers.onBtnNumClick("2");
    }

    /**
     * Handles the click event for the 3 button.
     */
    static onBtnNum3Click() {
        EventHandlers.onBtnNumClick("3");
    }

    /**
     * Handles the click event for the Multiplication button.
     */
    static onBtnMultiplicationClick() {
        EventHandlers.onBasicOperatorClick("*", " × ");
    }

    /**
     * Handles the click event for the Exponentiation button.
     */
    static onBtnExponentiationClick() {
        const lblResult = $("#lblResult");
        const powElement = $("<span>").attr("data-type", "advanced-operator").attr("data-value", "pow");
        const exponent = $("<sup>").attr("data-type", "exponent");
        powElement.append(exponent);

        let currentElement = lblResult;
        if (EventHandlers.operatorStack.length > 0) {
            let stackElement = EventHandlers.operatorStack[EventHandlers.operatorStack.length - 1];
            currentElement = stackElement.element.children().eq(stackElement.childNum - 1);
        }

        const lastChild = currentElement.children().last();
        let opCreated = false;

        if (lastChild.data("type") === "number" || lastChild.data("value") === ")") {
            currentElement.append(powElement);
            opCreated = true;
        } else if (lastChild.data("value") === "pow") {
            const allChildren = currentElement.children();
            for (let i = allChildren.length - 1; i >= 0; i--) {
                if (allChildren.eq(i).data("type") === "number") {
                    allChildren.eq(i).before($("<span>").attr("data-type", "operator").attr("data-value", "(").html(" ( "));
                    break;
                }
            }
            currentElement.append($("<span>").attr("data-type", "operator").attr("data-value", ")").html(" ) "));
            currentElement.append(powElement);
            opCreated = true;
        }

        if (opCreated) {
            EventHandlers.operatorStack.push({element: powElement, childNum: 1});
            $("#btnSet").prop("disabled", false);
        }
    }

    /**
     * Handles the click event for the XOR Gate button.
     */
    static onBtnGateXORClick() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + " XOR ");
    }

    /**
     * Handles the click event for the NOT Gate button.
     */
    static onBtnGateNOTClick() {
        const lblResult = $("#lblResult");
        lblResult.html(lblResult.html() + " NOT ");
    }

    /**
     * Handles the click event for the Negative button.
     */
    static onBtnNegativeClick() {
        const lblResult = $("#lblResult");
        const lastChild = lblResult.children().last();

        if (lastChild.data("type") === "number") {
            let currentValue = lastChild.html();
            if (currentValue.startsWith("(") && currentValue.endsWith(")")) {
                currentValue = currentValue.substring(2, currentValue.length - 1);
            } else {
                currentValue = "(-" + currentValue + ")";
            }

            lastChild.html(currentValue);
            lastChild.attr("data-value", currentValue);
        }
    }

    /**
     * Handles the click event for the 0 button.
     */
    static onBtnNum0Click() {
        EventHandlers.onBtnNumClick("0");
    }

    /**
     * Handles the click event for the Comma button.
     */
    static onBtnCommaClick() {
        EventHandlers.onBtnNumClick(".");
    }

    /**
     * Handles the click event for the Subtraction button.
     */
    static onBtnSubtractionClick() {
        EventHandlers.onBasicOperatorClick("-", " – ");
    }

    /**
     * Handles the click event for the Addition button.
     */
    static onBtnAdditionClick() {
        EventHandlers.onBasicOperatorClick("+", " + ");
    }

    /**
     * Handles the click event for the Equals button.
     */
    static onBtnEqualsClick() {
        const lblDisplayNumSystem = $("#lblDisplayNumSystem");
        const lblResultNumSystem = $("#lblResultNumSystem");
        const lblDisplay = $("#lblDisplay");
        const lblResult = $("#lblResult");

        switch (calculatorMode) {
            case CalculatorModes.ARITHMETIC:
                const result = Parser.evaluateArithmeticFromCalc(lblResult.html());
                if (result !== null) {
                    if (result.Success) {
                        lblDisplay.html(lblResult.html());
                        lblResult.html(result.Result);
                        ModeSwitcher.disableArithmetic();
                    } else {
                        alert(result.Error);
                    }
                } else {
                    alert("Račun NI postavljen pravilno, zato ga ni mogoče izračunati!");
                }
                break;
            case CalculatorModes.LOGICGATES:
                const evalResult = Parser.solveLogicGates(lblDisplayNumSystem.html(), lblResultNumSystem.html(), lblDisplay.html());
                if (evalResult !== null) {
                    lblResult.html(evalResult);
                } else {
                    lblResultNumSystem.html(lblDisplayNumSystem.html());
                    lblResult.html(lblDisplay.html());
                    lblDisplayNumSystem.html("")
                    lblDisplay.html("");
                    ModeSwitcher.logicGatesConfirmed(lblResultNumSystem.html());
                    alert("Logični izračun NI postavljen pravilno, zato se je zgodila napaka!");
                }
                break;
            default:
                break;
        }
    }
}