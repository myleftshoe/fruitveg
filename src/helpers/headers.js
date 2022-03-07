export default function headers(array, exclude = []) {
    if (!Array.isArray(array)) {
        return []
    }
    return Object.keys(array[0]).map(key => ({ key, value: key.toUpperCase() })).filter(({ key }) => !exclude.includes(key));
}