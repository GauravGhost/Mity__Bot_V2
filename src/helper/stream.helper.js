const { Readable } = require('stream');

class WordStream extends Readable {
    constructor(inputString) {
        super();
        this.inputString = inputString;
        // Split the String into words.
        this.words = this.inputString.split(/\s+/);
        this.index = 0;
    }

    _read(size) {
        // It will run until words are remaining in the array.
        while (this.index < this.words.length) {
            // It will store the limited words.
            let chunk = '';

            // Accumulate words until reaching the character limit (255 characters)
            while (chunk.length <= 255 && this.index < this.words.length) {
                const currentWord = this.words[this.index];
                if (chunk.length + currentWord.length + 1 <= 255) { // +1 for the space
                    chunk += currentWord + ' ';
                } else {
                    break;
                }
                this.index++;
            }

            // Push the chunk into the stream, removing trailing space
            this.push(chunk.trim());

            // If we've accumulated enough characters, stop further processing for now
            if (chunk.length > 255) {
                break;
            }
        }

        // If all words have been processed, signal the end of the stream
        if (this.index >= this.words.length) {
            this.push(null);
        }
    }
}

module.exports = WordStream;
