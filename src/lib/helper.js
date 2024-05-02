export const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const now = new Date();

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

export function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = {month: 'short', day: '2-digit', year: 'numeric'};
    return date.toLocaleDateString('en-US', options);
}

export const getDates = () => {
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const date = now.toISOString().split('T')[0];
    const lastMonthDate = lastMonth.toISOString().split('T')[0];
    return `${lastMonthDate},${date}`
}

export const getMonthDates = (params) => {
    const startMonth = new Date(now.getFullYear(), months.indexOf(params.month), 1);
    const startDate = startMonth.toISOString().split('T')[0];
    const endMonth = new Date(now.getFullYear(), months.indexOf(params.month), 30);
    const endDate = endMonth.toISOString().split('T')[0];
    return `${startDate},${endDate}`
}

export const currentYear = new Date().getFullYear();
const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
const currentDay = String(new Date().getDate()).padStart(2, '0');

export const bestOfFrom = (currentYear - 1).toString() + '-' + currentMonth + '-' + currentDay;
export const bestOfTo = (currentYear).toString() + '-' + currentMonth + '-' + currentDay;

export const lastYearFrom = (currentYear - 1).toString() + '-01-01';
export const lastYearTo = (currentYear - 1).toString() + '-12-31';
