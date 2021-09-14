/**
 * Destructable - interface for classes that have to be destructed.
 * @interface
 * @author Danil Andreev
 */
export default interface Destructable {
    /**
     * Destructor.
     * @method
     * @author Danil Andreev
     */
    destruct(): void | Promise<void>;
}