<template>
    <v-input
        :model-value = "value"
        @update:model-value="handleChange($event)"
    />
</template>

<script>
    import maskEditFn from "./logic/index";
    import { nextTick } from "vue";
    export default {
	      props: {
	          mask: {
		            type: String,
		            required: true,
	          },
		        value: {
			          type: [String, Number],
			          default: null,
		        },
	      },
	      emits: ['input'],
	      setup(props, context) {
            const { emit } = context;

		        async function handleChange(_value) {
                const value = _value === null ? "" : _value;
                const newValue = maskEditFn(props.mask, value);
			          emit('input', value);
                await nextTick();
			          emit('input', newValue);
		        }

		        return { handleChange };
	      },
    };
</script>
