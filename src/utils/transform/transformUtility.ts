/**
 * Complex function which returns an object representing each transform property applied to object
 * @param transformString The string from element.style.transform
 * @returns The object
 * @example INITIAL: transform: scale(1.5) rotate(30deg) translate(10px, -10px) RETURNS: {scale: "1.5", rotate: "30deg", translate: "10px, -10px"}
 */
export function getTransformValuesOfElement(transformString: string): object {
    transformString = transformString.toLowerCase();
    let startIndex = 0,
        openBracketIndices: number[] = [],
        closedBracketIndices: number[] = [],
        index: number,
        arrayOfValues: string[] = [],
        arrayOfKeys: string[] = [],
        obj = {};

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

    //creating final object
    for (let i = 0; i < arrayOfKeys.length; i++) {
        Object.defineProperty(obj, arrayOfKeys[i], {
            value: arrayOfValues[i],
            writable: false,
        });
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
