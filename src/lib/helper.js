export const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/

export const showCustomToast = (severity, summary, detail, content, toastRef, life) => {
    const options = {
        severity: severity, summary: summary, detail: detail, content: content
    }

    options.life = life

    toastRef.current.show(options)
}

export function splitTextIntoSentences(text, maxCharacters = 20) {
    const sentences = [];
    let startIndex = 0;

    while (startIndex < text.length) {
        let endOfSentence = -1;

        for (let i = startIndex + maxCharacters; i < text.length; i++) {
            if (text[i] === '.' || text[i] === '!') {
                endOfSentence = i;
                break;
            }
        }

        if (endOfSentence === -1) {
            break;
        }

        const sentence = text.substring(startIndex, endOfSentence + 1).trim();
        sentences.push(sentence + " ");

        startIndex = endOfSentence + 1;
    }

    if (startIndex < text.length) {
        const remainingSentence = text.substring(startIndex).trim();
        sentences.push(remainingSentence);
    }

    return sentences;
}

export function removeSpecialCharacters(inputString) {

    if (typeof inputString !== 'string') {
        return '';
    }

    const withoutTags = inputString.replace(/<\/?[^>]+(>|$)/g, '');

    const cleanedString = withoutTags.replace(/[^\w\s.]/gi, '');

    const maxLength = 150;

    if (cleanedString.length <= maxLength) {
        return cleanedString;
    }

    let truncatedText = cleanedString.substring(0, maxLength);
    const sentenceEndIndex = truncatedText.lastIndexOf('.');

    if (sentenceEndIndex !== -1 && sentenceEndIndex >= maxLength - 1) {

        truncatedText = truncatedText.substring(0, sentenceEndIndex + 1);

    } else {
        const nextSentenceBreak = cleanedString.indexOf('.', maxLength);

        if (nextSentenceBreak !== -1) {
            truncatedText = cleanedString.substring(0, nextSentenceBreak + 1);
        } else {
            truncatedText = cleanedString.substring(0, maxLength);
        }

    }

    return truncatedText.trim();
}



