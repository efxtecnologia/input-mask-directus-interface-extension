import { nextTick } from "vue";
import { withPayloadRules } from "./logic/common";

async function validate(api, props) {
    if (! props.validationURL || ! props.validationRequestMethod) {
        return { valid: true, result: { message: "Valid without calling the API", payload: {} } };
    }

    const apiMethod = api[props.validationRequestMethod.toLowerCase()];
    const response = await apiMethod(props.validationURL, { type: props.mask, value: props.value });
    return response.data;
}

async function setAdditionalFields(values, { responsePayloadRules }, { emit, attrs }, { result }) {
    const { payload } = result;
    if (! payload || Object.keys(payload).length === 0) {
        return;
    }
    const translatedPayload = withPayloadRules(payload, responsePayloadRules);

    for await (const k of Object.keys(translatedPayload)) {
        if (attrs.field !== k && values.value[k] !== undefined) {
            await nextTick();
            emit("setFieldValue", { field: k, value: translatedPayload[k] });
        }
    }
}

export default validate;
export { setAdditionalFields };
