/**
 * The FileParser class is responsible for parsing and reading files.
 */
class FileParser {
    /**
     * Perform arithmetic operations on the given file content.
     *
     * @param {string} fileContent - The content of the file.
     */
    static arithmetic(fileContent) {
        let resultsContent = "";

        for (const line of fileContent.split(/\r?\n/)) {
            if (FileParser.isNullOrWhitespace(line)) {
                resultsContent += line + "\n";
                continue;
            }

            resultsContent += line;

            const elements = line.split(' ').filter(element => element);

            if (elements.length >= 2 &&
                elements[elements.length - 1] === "=" &&
                /^[0-9+\-*/%(),.^ \s]*(\b(root)\b[0-9+\-*/%(),.^ \s]*)*=$/.test(line)) {
                if (resultsContent[resultsContent.length - 1] === "=") {
                    resultsContent += " ";
                }

                elements.pop();
                const result = Parser.evaluateArithmeticFromFile(elements.join(''));

                if (result !== null) {
                    if (result.Success) {
                        resultsContent += result.Result;
                    } else {
                        resultsContent += result.Error;
                    }
                } else {
                    resultsContent += "Aritmetični izračun NI postavljen pravilno, zato se je zgodila napaka!";
                }
            } else {
                resultsContent += " Izraz je sestavljen NAROBE!";
            }

            resultsContent += "\n";
        }

        FileParser.downloadFile("rezultati-aritmetika.txt", resultsContent);
    }

    /**
     * Converts the given file content to numeral system.
     *
     * @param {string} fileContent - The content of the file to be converted.
     */
    static numeralSystemConversion(fileContent) {
        let resultsContent = "";

        for (const line of fileContent.split(/\r?\n/)) {
            if (FileParser.isNullOrWhitespace(line)) {
                resultsContent += line + "\n";
                continue;
            }

            resultsContent += line;

            const numSystems = [NumeralSystems.BIN, NumeralSystems.OCT, NumeralSystems.DEC, NumeralSystems.HEX];
            const elements = line.split(' ').filter(element => element);

            if (elements.length === 4 &&
                numSystems.includes(elements[0]) &&
                    ((elements[0] === NumeralSystems.BIN && /^[01]+$/.test(elements[1])) ||
                    (elements[0] === NumeralSystems.OCT && /^[0-7]+$/.test(elements[1])) ||
                    (elements[0] === NumeralSystems.DEC && /^[0-9]+$/.test(elements[1])) ||
                    (elements[0] === NumeralSystems.HEX && /^[0-9A-F]+$/.test(elements[1]))) &&
                numSystems.includes(elements[2]) &&
                elements[0] !== elements[2] &&
                elements[3] === "=") {
                if (resultsContent[resultsContent.length - 1] === "=") {
                    resultsContent += " ";
                }

                resultsContent += ConversionOperations.convert(elements[0], elements[2], elements[1])
            } else {
                resultsContent += " Izraz je sestavljen NAROBE!";
            }

            resultsContent += "\n";
        }

        FileParser.downloadFile("rezultati-pretvorb.txt", resultsContent);
    }

    /**
     * Perform logic gate operations on given file content.
     *
     * @param {string} fileContent - The content of the file.
     */
    static logicGates(fileContent) {
        let resultsContent = "";

        for (const line of fileContent.split(/\r?\n/)) {
            if (FileParser.isNullOrWhitespace(line)) {
                resultsContent += line + "\n";
                continue;
            }

            resultsContent += line;

            const numSystems = [NumeralSystems.BIN, NumeralSystems.OCT, NumeralSystems.DEC, NumeralSystems.HEX];
            const elements = line.split(' ').filter(element => element);

            if (elements.length >= 4 &&
                numSystems.includes(elements[0]) &&
                numSystems.includes(elements[elements.length - 2]) &&
                elements[elements.length - 1] === "=") {
                if (resultsContent[resultsContent.length - 1] === "=") {
                    resultsContent += " ";
                }

                const result = Parser.solveLogicGates(
                    elements[0],
                    elements[elements.length - 2],
                    elements.slice(1, elements.length - 2).join(' ')
                );

                if (result !== null) {
                    resultsContent += result;
                } else {
                    resultsContent += "Logični izračun NI postavljen pravilno, zato se je zgodila napaka!";
                }
            } else {
                resultsContent += " Izraz je sestavljen NAROBE!";
            }

            resultsContent += "\n";
        }

        FileParser.downloadFile("rezultati-logičnih-vrat.txt", resultsContent);
    }

    /**
     * Reads the contents of a file using FileParser API.
     * @param {File} file - The file to read.
     * @return {Promise} - A promise that resolves with the content of the file as a string, or rejects with an error.
     */
    static readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    /**
     * Handles file selection event and processes the selected file.
     *
     * @param {Event} event - The file selection event.
     * @param {Function} fileProcessingFunction - The function to process the content of the selected file.
     */
    static handleFileSelection(event, fileProcessingFunction) {
        const inputFile = event.target;
        if (inputFile.files.length === 0) {
            return;
        }
        const file = inputFile.files[0];
        this.readFile(file)
            .then(fileContent => fileProcessingFunction(fileContent))
            .catch(error => {
                alert("Napaka pri procesiranju datoteke!");
                console.error("Napaka pri procesiranju datoteke:", error);
            });
    }

    /**
     * Downloads a file with the given filename and text content.
     *
     * @param {string} filename - The name of the file to be downloaded.
     * @param {string} text - The text content of the file.
     */
    static downloadFile(filename, text) {
        let blob = new Blob([text], {type: "text/plain"});
        let element = document.createElement("a");
        element.setAttribute("href", URL.createObjectURL(blob));
        element.setAttribute("download", filename);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    /**
     * Checks if a string is null or consists of only whitespace characters.
     * @param {string} str - The string to be checked.
     * @return {boolean} - Returns true if the string is null or consists of only whitespace characters, otherwise returns false.
     */
    static isNullOrWhitespace(str) {
        return str == null || str.match(/^ *$/) !== null;
    }
}