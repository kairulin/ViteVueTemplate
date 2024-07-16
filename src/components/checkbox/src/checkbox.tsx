import { createElementBlock, defineComponent, onMounted, openBlock, shallowRef, watch } from "vue";

export default defineComponent({
    name: 'Checkbox',
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        indeterminate: {
            type: Boolean,
            default: false
        }
    },
    setup(__props, {emit}) {
        const checkboxRef = shallowRef();

        const updateIndeterminate = () => {
            const checkbox = checkboxRef.value as HTMLInputElement;
            checkbox.indeterminate = __props.indeterminate;
        }
        onMounted(() => {
            const checkbox = checkboxRef.value as HTMLInputElement;
            checkbox.checked = __props.modelValue;
            // updateIndeterminate();
        })
        watch(() => __props.indeterminate, updateIndeterminate)

        watch(() => __props.modelValue, (newVal) => {
            const checkbox = checkboxRef.value as HTMLInputElement;
            checkbox.checked = newVal;
        })

        const handleChange = (event: Event) => {
            const isChecked =  (event.target as HTMLInputElement).checked
            emit('update:modelValue', isChecked)
        }
        return (_ctx:any) => {
            return openBlock(), createElementBlock("input", {
                ref: checkboxRef,
                type: "checkbox",
                checked: _ctx.modelValue,
                onChange: handleChange,                
            },
                null,
                16 /* FULL_PROPS */, ["checked"]
            )
        }
    },
})