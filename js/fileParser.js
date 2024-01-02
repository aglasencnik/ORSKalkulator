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
        console.log("Aritmetika: " + fileContent);
        // Handle file content here
        let resultsContent = "";

        for (const line of fileContent.split(/\r?\n/)) {

        }

        this.downloadFile("rezultati-aritmetike.txt", resultsContent);
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
            let elements = line.split(' ');

            const binRegex = new RegExp("^[01]+$");
            const octRegex = new RegExp("^[0-7]+$");
            const decRegex = new RegExp("^[0-9]+$");
            const hexRegex = new RegExp("^[0-9A-F]+$");

            if (elements.length === 4 &&
                numSystems.includes(elements[0]) &&
                    ((elements[0] === NumeralSystems.BIN && binRegex.test(elements[1])) ||
                    (elements[0] === NumeralSystems.OCT && octRegex.test(elements[1])) ||
                    (elements[0] === NumeralSystems.DEC && decRegex.test(elements[1])) ||
                    (elements[0] === NumeralSystems.HEX && hexRegex.test(elements[1]))) &&
                numSystems.includes(elements[2]) &&
                elements[0] !== elements[2] &&
                elements[3] === "=") {
                if (resultsContent[resultsContent.length - 1] === "=") {
                    resultsContent += " ";
                }

                resultsContent += ConversionOperations.convert(elements[0], elements[2], elements[1])
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
        console.log("Logična vrata: " + fileContent);
        // Handle file content here
        let resultsContent = "";

        for (const line of fileContent.split(/\r?\n/)) {

        }

        this.downloadFile("rezultati-logičnih-vrat.txt", resultsContent);
    }

    /**
     * Reads the contents of a file using FileReader API.
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