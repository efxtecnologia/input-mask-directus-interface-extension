const stripped = s => s.replace(/\D/g, '');

function withSeparator(s, { separator, value }) {
    if (value === "") {
        return s;
    }
    return s + (s === "" ? "" : separator) + value;
}

function groupPart(separators, prior, group, index) {
    const start = prior.finish ? prior.finish : 0;
    const finish = (prior.finish ? prior.finish : 0) + group.length;
    const slicer = s => s.slice(start, finish);
    const separator = index > 0 ? separators[index-1] : "";
    return { group, slicer, separator, finish };
}

const handleFirstSeparatorException = parsedMap => {
    if (parsedMap.length <= 1 || parsedMap[0].value !== "") {
        return parsedMap;
    }
    return [
        { ...parsedMap[0], value: parsedMap[1].separator },
        { ...parsedMap[1], separator: "" },
        ...parsedMap.slice(2),
    ];
};


const parsedMask = mask => {
    const groups = mask.split(/[^0-9]/g);
    const separators = Array.from(mask.replace(/\d/g, ''));
    const maskMap = groups.reduce(
        (prior, group, index) => [
            ...prior, groupPart(separators, index > 0 ? prior[index-1] : {}, group, index)
        ],
        [],
    );
    return value => {
        return handleFirstSeparatorException(
            maskMap.map(groupPart => {
                return {
                    value: groupPart.slicer(value),
                    separator: groupPart.separator,
                };
            })
        );
    };
};

function commonMasker(mask, _value) {
    const value = stripped(_value);
    if ( value === "" ) {
        return "";
    }
    return parsedMask(mask)(value).reduce(withSeparator, "");
}

function masksCompare(m1, m2) {
    const l1 = stripped(m1).length;
    const l2 = stripped(m2).length;
    return l1 < l2 ? -1 : (l1 === l2 ? 0 : 1);
}

function multiFormatter(_masks, _value) {
    const masks = _masks.sort(masksCompare);
    const value = stripped(_value);
    const filteredMasks = masks.filter(m => value.length <= stripped(m).length);
    const selectedMask = filteredMasks.length === 0 ? masks.slice(-1)[0] : filteredMasks[0];
    return commonMasker(selectedMask, value);
}

export {
    stripped,
    withSeparator,
    parsedMask,
    commonMasker,
    multiFormatter,
};
