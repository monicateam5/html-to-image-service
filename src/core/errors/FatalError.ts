/**
 * FatalError - class for fatal errors.
 * @class
 * @author Danil Andreev
 */
export default class FatalError extends Error {
    /**
     * FatalError - creates an instance of FatalError.
     * @constructor
     * @param args - arguments as in console error.
     * @author Danil Andreev
     */
    constructor(...args: any[]) {
        const message: string = args
            .map(item => (typeof item === "object" ? JSON.stringify(item) : String(item)))
            .join(" ");
        super(message);
    }
}
