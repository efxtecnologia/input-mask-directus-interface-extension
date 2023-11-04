<template>
    <section>
        <v-input
            :model-value = "value"
            @update:model-value="handleChange($event)"
            @blur="onBlur"
        />
        <v-notice v-if="error" type="danger">{{ errorMessage }}</v-notice>

        <v-overlay :active="waiting">
            <div id="loader"/>
        </v-overlay>

        <component :is="'style'">
            .v-overlay {
                --v-overlay-color: rgba(0, 0, 0, 0.1);;
            }
            #loader {
                position: absolute;
                left: 50%;
                top: 50%;
                z-index: 1;
                width: 20px;
                height: 20px;
                margin: -76px 0 0 -76px;
                border: 5px solid #f3f3f3;
                border-radius: 50%;
                border-top: 5px solid #555;
                    -webkit-animation: spin 1s linear infinite;
                animation: spin 1s linear infinite;
            }
            @-webkit-keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </component>
    </section>
</template>

<script>
    import { nextTick, ref, inject } from "vue";
    import { useApi } from '@directus/extensions-sdk';
    import maskEditFn from "./logic/index";
    import validate, { setAdditionalFields } from "./controller";
    export default {
	      props: {
	          mask: {
		            type: String,
		            required: true,
	          },
            softLength: {
                type: Number,
                required: false,
            },
            requestPayloadRules: {
                type: Object,
                required: false,
            },
            responsePayloadRules: {
                type: Object,
                required: false,
            },
            validationRequestMethod: {
                type: String,
                required: false,
            },
            validationURL: {
                type: String,
                required: false,
            },
		        value: {
			          type: [String, Number],
			          default: null,
		        },
            error: {
                type: Boolean,
                default: false,
            },
            waiting: {
                type: Boolean,
                default: false,
            },
            errorMessage: {
                type: String,
                default: null,
            },
	      },
	      emits: ["input", "validation-effect"],
        inject: ["values"],
	      setup(props, context) {
            const api = useApi();
            const { emit } = context;
            const errorMessage = ref(null);
            const error = ref(false);
            const waiting = ref(false);
            const values = inject("values", ref({}));
            let priorValue = props.value;

		        async function handleChange(_value) {
                const value = _value === null ? "" : _value;
                const newValue = maskEditFn(props, value);
			          emit('input', value);
                await nextTick();
			          emit('input', newValue);
		        }

            async function doValidate() {
                waiting.value = true;
                try {
                    const validation = await validate(api, props);
                    return validation;
                } finally {
                    waiting.value = false;
                }
                return { valid: false, result: { message: "Error", payload: {} }};
            }

            async function onBlur(e) {
                const valueChanged = priorValue !== props.value;
                if (valueChanged) {
                    priorValue = props.value;
                    const validation = await doValidate();
                    setAdditionalFields(values, props, context, validation);
                    error.value = ! validation.valid;
                    errorMessage.value = validation.result.message;
                }
            };

		        return {
                handleChange,
                onBlur,
                error,
                errorMessage,
                waiting,
            };
	      },
    };
</script>
