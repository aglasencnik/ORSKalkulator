// Main Entry Point

// Global Variables
calculatorMode = CalculatorModes.ARITHMETIC;

$(document).ready(() => {
    // Set arithmetic as default mode
    ModeSwitcher.arithmetic();

    // Apply event handlers
    $("#btnArithmetic").on("click", EventHandlers.onBtnArithmeticClick);
    $("#btnConvert").on("click", EventHandlers.onBtnConvertClick);
    $("#btnLogicGates").on("click", EventHandlers.onBtnLogicGatesClick);
    $("#btnClear").on("click", EventHandlers.onBtnClearClick);
    $("#btnArithmeticFile").on("click", EventHandlers.onBtnArithmeticFileClick);
    $("#btnConvertFile").on("click", EventHandlers.onBtnConvertFileClick);
    $("#btnLogicGatesFile").on("click", EventHandlers.onBtnLogicGatesFileClick);
    $("#btnBackspace").on("click", EventHandlers.onBtnBackspaceClick);
    $("#btnBin").on("click", EventHandlers.onBtnBinClick);
    $("#btnOct").on("click", EventHandlers.onBtnOctClick);
    $("#btnDec").on("click", EventHandlers.onBtnDecClick);
    $("#btnHex").on("click", EventHandlers.onBtnHexClick);
    $("#btnOpeningParentheses").on("click", EventHandlers.onBtnOpeningParenthesesClick);
    $("#btnClosingParentheses").on("click", EventHandlers.onBtnClosingParenthesesClick);
    $("#btnModulus").on("click", EventHandlers.onBtnModulusClick);
    $("#btnA").on("click", EventHandlers.onBtnAClick);
    $("#btnB").on("click", EventHandlers.onBtnBClick);
    $("#btnC").on("click", EventHandlers.onBtnCClick);
    $("#btnD").on("click", EventHandlers.onBtnDClick);
    $("#btnE").on("click", EventHandlers.onBtnEClick);
    $("#btnF").on("click", EventHandlers.onBtnFClick);
    $("#btnSet").on("click", EventHandlers.onBtnSetClick);
    $("#btnNum7").on("click", EventHandlers.onBtnNum7Click);
    $("#btnNum8").on("click", EventHandlers.onBtnNum8Click);
    $("#btnNum9").on("click", EventHandlers.onBtnNum9Click);
    $("#btnSquared").on("click", EventHandlers.onBtnSquaredClick);
    $("#btnSquareRoot").on("click", EventHandlers.onBtnSquareRootClick);
    $("#btnGateAND").on("click", EventHandlers.onBtnGateANDClick);
    $("#btnGateOR").on("click", EventHandlers.onBtnGateORClick);
    $("#btnNum4").on("click", EventHandlers.onBtnNum4Click);
    $("#btnNum5").on("click", EventHandlers.onBtnNum5Click);
    $("#btnNum6").on("click", EventHandlers.onBtnNum6Click);
    $("#btnDivision").on("click", EventHandlers.onBtnDivisionClick);
    $("#btnNthRoot").on("click", EventHandlers.onBtnNthRootClick);
    $("#btnGateNAND").on("click", EventHandlers.onBtnGateNANDClick);
    $("#btnGateNOR").on("click", EventHandlers.onBtnGateNORClick);
    $("#btnNum1").on("click", EventHandlers.onBtnNum1Click);
    $("#btnNum2").on("click", EventHandlers.onBtnNum2Click);
    $("#btnNum3").on("click", EventHandlers.onBtnNum3Click);
    $("#btnMultiplication").on("click", EventHandlers.onBtnMultiplicationClick);
    $("#btnExponentiation").on("click", EventHandlers.onBtnExponentiationClick);
    $("#btnGateXOR").on("click", EventHandlers.onBtnGateXORClick);
    $("#btnGateNOT").on("click", EventHandlers.onBtnGateNOTClick);
    $("#btnNegative").on("click", EventHandlers.onBtnNegativeClick);
    $("#btnNum0").on("click", EventHandlers.onBtnNum0Click);
    $("#btnComma").on("click", EventHandlers.onBtnCommaClick);
    $("#btnSubtraction").on("click", EventHandlers.onBtnSubtractionClick);
    $("#btnAddition").on("click", EventHandlers.onBtnAdditionClick);
    $("#btnEquals").on("click", EventHandlers.onBtnEqualsClick);
});
