export interface TransformObject {
    translate?: string[];
    translate3d?: string[];
    translateX?: string;
    translateY?: string;
    translateZ?: string;

    rotate?: string;
    rotate3d?: string[];
    rotateX?: string;
    rotateY?: string;
    rotateZ?: string;

    scale?: string[];
    scale3d?: string[];
    scaleX?: string;
    scaleY?: string;
    scaleZ?: string;

    skew?: string[];
    skewX?: string;
    skewY?: string;

    perspective?: string[];
    matrix?: string[];
    matrix3d?: string[];
}

/**
 * Complex function which returns an object representing each transform property applied to object
 * @param transformString The string from element.style.transform
 * @returns A TransformObject whose keys are transform properties and values are property values
 * @example INITIAL: transform: scale(1.5) rotate(30deg) translate(10px, -10px) RETURNS: {scale: "1.5", rotate: "30deg", translate: "10px, -10px"}
 */
export function getTransformValuesOfElement(
    transformString: string
): TransformObject | null {
    transformString = transformString.toLowerCase();
    let startIndex = 0,
        openBracketIndices: number[] = [],
        closedBracketIndices: number[] = [],
        index: number,
        arrayOfValues: string[] = [],
        arrayOfKeys: string[] = [],
        obj: TransformObject = {};

    //getting indices of all occurences of open bracket "("
    while ((index = transformString.indexOf("(", startIndex)) > -1) {
        openBracketIndices.push(index);
        startIndex = index + 1;
    }

    //getting indices of all occurences of closed bracket ")"
    index = 0;
    startIndex = 0;
    while ((index = transformString.indexOf(")", startIndex)) > -1) {
        closedBracketIndices.push(index);
        startIndex = index + 1;
    }

    //creating array of values by getting all letters between opening and closing brackets
    for (let i = 0; i < openBracketIndices.length; i++) {
        arrayOfValues.push(
            transformString.substring(
                // + 1 in order to skip the opening bracket
                openBracketIndices[i] + 1,
                closedBracketIndices[i]
            )
        );
    }

    //first key will always start at the begining of the string and end at the first open bracket
    arrayOfKeys.push(
        transformString.substring(0, openBracketIndices[0]).trim()
    );
    //creating array of keys by getting all letters between closing bracket and next opening bracket
    for (let i = 0; i < openBracketIndices.length - 1; i++) {
        arrayOfKeys.push(
            transformString
                .substring(
                    // + 1 in order to skip the closing bracket
                    closedBracketIndices[i] + 1,
                    openBracketIndices[i + 1]
                )
                .trim()
        );
    }

    if (arrayOfKeys.length === 0 || arrayOfValues.length === 0) {
        return null;
    }

    //creating final object
    for (let i = 0; i < arrayOfKeys.length; i++) {
        let commaSeparatedArray = arrayOfValues[i].split(",");
        if (commaSeparatedArray.length > 1) {
            let arrayOfStringValues: string[] = [];
            for (let j = 0; j < commaSeparatedArray.length; j++) {
                arrayOfStringValues.push(commaSeparatedArray[j]);
                Object.defineProperty(obj, arrayOfKeys[i], {
                    value: arrayOfStringValues,
                    writable: false,
                    configurable: true
                });
            }
        } else {
            Object.defineProperty(obj, arrayOfKeys[i], {
                value: commaSeparatedArray[0],
                writable: false,
                configurable: true
            });
        }
    }
    return obj;
}

/**
 * Returns the functions applied to the CSS transform property of an element
 * @param transformString The string from element.style.transform
 * @returns An array of strings which represent all transform properties applied to an object (scale, translate) or an empty array if no properties exist
 */
export function getTransformProperties(transformString: string): string[] {
    let object = getTransformValuesOfElement(transformString);
    if (object !== null) {
        return Object.keys(object);
    } else {
        return [];
    }
}

interface KeyValuePair {
    key: string;
    value: string;
}

export function convertTransformObjectToString(
    transformObject: TransformObject | null,
    excludedProperties?: string[]
) {
    if (transformObject === null) {
        return;
    }

    let transformString = "",
        transformProperties = Object.getOwnPropertyNames(transformObject),
        keyValuePairs: KeyValuePair[] = [];

    for (let i = 0; i < transformProperties.length; i++) {
        //if shouldContinue is false, we go to next iteration because this property will be undefined
        let shouldContinue = true;
        if (excludedProperties !== undefined) {
            for (let j = 0; j < excludedProperties.length; j++) {
                if (transformProperties[i] === excludedProperties[j]) {
                    transformProperties.splice(i, 0); //remove the property
                    shouldContinue = false;
                }
            }
        }
        if (!shouldContinue) {
            continue;
        }

        // transformString += transformProperties[i] + "(";
        let value = Object.getOwnPropertyDescriptor(
            transformObject,
            transformProperties[i]
        )?.value;

        let localTransformString = "(";

        if (Array.isArray(value)) {
            value.forEach((val, index) => {
                localTransformString += val;
                if (index !== value.length - 1) {
                    localTransformString += ",";
                }
            });
        } else {
            localTransformString += value;
        }
        localTransformString += ")";

        keyValuePairs.push({
            key: transformProperties[i],
            value: localTransformString
        });

        // transformString += ")";
    }

    //order transform properties in the following order: perspective translate translate3d translateX translateY translateZ rotate rotate3d rotateX rotate rotateZ scale scale3d scaleX scaleY scaleZ skew skewX skewY matrix matrix3d
    const priorityOrder = {
        perspective: 0,
        translate: 1,
        translate3d: 2,
        translateX: 3,
        translateY: 4,
        translateZ: 5,
        rotate: 6,
        rotate3d: 7,
        rotateX: 8,
        rotateY: 9,
        rotateZ: 10,
        scale: 11,
        scale3d: 12,
        scaleX: 13,
        scaleY: 14,
        scaleZ: 15,
        skew: 16,
        skewX: 17,
        skewY: 18,
        matrix: 19,
        matrix3d: 20
    };

    let outputArray: KeyValuePair[] = [];

    const input: KeyValuePair[] = [];

    keyValuePairs.forEach((item) => {
        input.push(item);
    });

    const prioritized: KeyValuePair[] = [];
    const extra: KeyValuePair[] = [];

    input.forEach((value) => {
        if (priorityOrder[value.key] !== undefined) {
            prioritized.push(value);
        } else {
            extra.push(value);
        }
    });

    prioritized.sort((a, b) => priorityOrder[a.key] - priorityOrder[b.key]);
    extra.sort();

    const output = outputArray.concat(prioritized, extra);

    output.forEach((item) => {
        transformString += item.key + item.value;
    });

    return transformString;
}
