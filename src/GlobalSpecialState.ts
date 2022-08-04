/*---------------------------------------------------------------------------------------------
 * Here we store any kind of object that is not serializable because Redux highly discourages
 * storing non-serializable objects in a store. An example of non-serializable objects include
 * references to DOM objects (returned from document.getElementById() or useRef()).
 *--------------------------------------------------------------------------------------------*/

interface StateObject {
    key: string;
    element: any;
}

export class State {
    public static store: StateObject[] = [];

    /**
     * Adds an object or a value to the global state
     * @param key The identifier for the stored element
     * @param element The stored element
     */
    public static addObject(key: string, element: any) {
        let object: StateObject;

        object = { key: key, element: element };
        State.store.push(object);
    }

    /**
     * Gets an object or a value from the global state
     * @param key The identifier for the stored element
     */
    public static getObject(key: string): any | null {
        for (let i = 0; i < this.store.length; i++) {
            if (this.store[i].key === key) {
                return this.store[i].element;
            }
        }
        return null;
    }

    /**
     * Deletes an object or a value from the global state
     * @param key The identifier for the stored element
     */
    public static deleteObject(key: string): boolean {
        for (let i = 0; i < this.store.length; i++) {
            if (this.store[i].key === key) {
                this.store.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}
