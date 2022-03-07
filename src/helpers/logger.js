export default function Logger(label) {
    return function(...args) {
        args.forEach(arg => Array.isArray(arg) ? console.table(arg) : console.log(arg))
    }
}
