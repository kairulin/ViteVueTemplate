import {
    normalizeClass,
    defineComponent,
    openBlock,
    createElementBlock,
    createVNode,
    renderList,
    createElementVNode,
    unref,
    ref,
    shallowRef
} from 'vue';
import type {PropType} from 'vue';
import { computed, onMounted } from 'vue';

export default defineComponent({
    name: 'NibuInput',
    props: {  
        modelValue: {
            type: String,
            default: ''
        }
    },
    emits:["update:modelValue"],
    setup(__props, { attrs, expose, emit }) {
        const props = __props
        const inputValue = (e) => {
            emit("update:modelValue", e.target.value)
        }
        const nativeInputValue = computed(() => String(props.modelValue));
        const input = shallowRef();
        // 這個相當於<div ref='inputRef' />
        const _ref = computed(() => input.value || textarea.value);
        const setNativeInputValue = () => {
            _ref.value.value = 123
            // console.log('_ref', _ref.value)
            // const input2 = _ref.value;
            // console.log('input2', input2)
            // const formatterValue = props.formatter ? props.formatter(nativeInputValue.value) : nativeInputValue.value;
            // if (!input2 || input2.value === formatterValue)
            //   return;
            // input2.value = 'test';
            // console.log('123', input2.value)
          };
        expose({
            input,
            ref:_ref
        })
        onMounted(() => {
            setNativeInputValue()
        })
        return (_ctx) => {
            return openBlock(), createElementBlock("div", {
                ...attrs,
                class: normalizeClass(["nibu-input__wrapper", attrs.class]),
            }, 
            [
                createVNode("input", {
                    class: "nibu-input",
                   ref: input
                },null,16 /*PROPS*/, ["modelValue","onInput"])   
            ]
            , 2 /* CLASS */)

            
        }
    }
})
