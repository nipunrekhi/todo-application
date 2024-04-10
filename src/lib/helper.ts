import { BAD_WORDS } from "@/data";

    const checkBadWords = async (value: string): Promise<string> => {
        const badWordsSet = new Set(BAD_WORDS);
        const valueWithoutBadWords = value.split(' ').filter(word => !badWordsSet.has(word.trim()));
        return valueWithoutBadWords.join(' ');
    }

    export {
        checkBadWords
    }