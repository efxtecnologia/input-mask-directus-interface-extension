async function validate(api, props) {
    if (! props.validationURL || ! props.validationRequestMethod) {
        return { valid: true, success: { message: "Valid without calling the API" } };
    }

    const apiMethod = api[props.validationRequestMethod.toLowerCase()];
    const response = await apiMethod(props.validationURL, { type: props.mask, value: props.value });
    return response.data;
}

export default validate;
