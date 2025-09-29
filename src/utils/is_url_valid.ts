export function isURLvalid(url: string) {
    try {
        const urlObj = new URL(url);
        return true;
    } catch (err) {
        return false
    }
}