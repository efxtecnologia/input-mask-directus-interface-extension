<template>
	  <input :value="value" @input="handleChange($event.target.value)" />
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

		        async function handleChange(value) {
			          emit('input', value);
                const newValue = maskEditFn(props.mask, value);
                await nextTick();
			          emit('input', newValue);
		        }

		        return { handleChange };
	      },
    };
</script>
