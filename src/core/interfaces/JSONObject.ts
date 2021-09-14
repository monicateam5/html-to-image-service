/**
 * JSONObject - interface for key-pair object.
 * @author Danil Andreev
 */
export default interface JSONObject<T = any> {
    [key: string]: T;
}