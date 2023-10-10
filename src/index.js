import InterfaceWebMRPMaskEdit from './interface.vue';

console.log("Loading extension InterfaceWebMRPMaskEdit");
export default {
	  id: 'webmrp-maskedit',
	  name: 'Mask Edit Field',
	  icon: "box",
	  description: 'Masked edit field',
	  component: InterfaceWebMRPMaskEdit,
	  types: ['string', 'integer', 'bigInteger'],
    localTypes: ["standard"],
    group: "standard",
	  options: ({ relations }) => {
        return [
            {
                field: "mask",
                type: "string",
                name: "Mask",
                meta: {
                    interface: "input",
                    width: "half",
                    options: {
                        placeholder: "Enter a valid mask",
                    },
                },
            },
        ];
    },
};
