/*---------------------------------------------------------------------------------------------
 * Here we store any kind of object that is not serializable because Redux highly discourages
 * storing non-serializable objects in a store. An example of non-serializable objects include
 * references to DOM objects (returned from document.getElementById() or useRef()).
 *--------------------------------------------------------------------------------------------*/

export interface DOMReference {
    key: string;
    reference: any;
}

export class State {
    public static references: DOMReference[] = [];

    public static addReference(referenceKey: string, referenceElement: any) {
        let object: DOMReference;

        object = { key: referenceKey, reference: referenceElement };
        State.references.push(object);
    }

    public static getReference(key: string): any | null {
        for (let i = 0; i < this.references.length; i++) {
            if (this.references[i].key === key) {
                return this.references[i].reference;
            }
        }
        return null;
    }
}
