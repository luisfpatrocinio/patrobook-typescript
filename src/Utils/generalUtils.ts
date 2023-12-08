export async function sleep(time = 100) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(void 0);
        }, time);
    });
}

export function extrairHashtags(texto: string): Array<string> {
    // Use uma expressão regular para encontrar todas as hashtags na string
    const hashtags = texto.match(/#\w+/g);

    // Verifique se foram encontradas hashtags
    if (hashtags) {
        // Remova o caractere '#' de cada hashtag
        const hashtagsLimpa = hashtags.map(tag => tag.slice(1));
        return hashtagsLimpa;
    } else {
        return [];
    }
}