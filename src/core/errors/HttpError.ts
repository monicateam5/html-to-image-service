import JSONObject from "../interfaces/JSONObject";

/**
 * HttpError - class for HTTP exchange error.
 * @class
 * @author Danil Andreev
 */
class HttpError extends Error {
    /**
     * code - HTTP response code.
     * @default 500
     */
    public readonly code: number;
    /**
     * data - JSON response data.
     */
    protected data: JSONObject;

    /**
     * Creates an instance of HttpError.
     * @constructor
     * @param message - HTTP response message.
     * @author Danil Andreev
     */
    constructor(message: string);
    /**
     * Creates an instance of HttpError.
     * @constructor
     * @param code - HTTP response code.
     * @author Danil Andreev
     */
    constructor(code: number);
    /**
     * Creates an instance of HttpError.
     * @constructor
     * @param message - HTTP response message.
     * @param code - HTTP response code.
     * @author Danil Andreev
     */
    constructor(message: string | number, code: number);
    constructor(message: string | number, code: number = 500) {
        if (typeof message === "number") {
            code = message;
            message = "";
        }
        super(message);
        this.code = code;
    }

    /**
     * setData - sets error data. Once data set - getResponseMessage() will return an JSON object.
     * @method
     * @param data - JSON data.
     * @author Danil Andreev
     */
    public setData(data: JSONObject): HttpError {
        this.data = data;
        return this;
    }

    /**
     * getResponseMessage - returns response message for HTTP exchange.
     * @method
     * @author Danil Andreev
     */
    public getResponseMessage(): string | JSONObject {
        if (this.data)
            return {message: this.message, code: this.code, ...this.data};
        return `Error: ${this.code}. ${this.message}`;
    }
}

export default HttpError;
