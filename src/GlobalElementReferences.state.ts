export interface DOMReference {
    key: string;
    reference: HTMLElement;
}

export class State {
    public static references: DOMReference[] = [];

    public static addReference(
        referenceKey: string,
        referenceElement: HTMLElement
    ) {
        let object: DOMReference;

        object = { key: referenceKey, reference: referenceElement };
        State.references?.push(object);
    }

    public static getReference(key: string): HTMLElement | null {
        for (let i = 0; i < this.references.length; i++) {
            if (this.references[i].key === key) {
                return this.references[i].reference;
            } else {
                return null;
            }
        }
        return null;
    }
}
