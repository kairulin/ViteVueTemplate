import {
    defineComponent,
    openBlock,
    createBlock,
    createElementBlock,
    toDisplayString,
    renderSlot,
    withCtx,
    createVNode,
    resolveDynamicComponent,
    createCommentVNode
} from "vue";
import type { VNode } from "vue";
export default defineComponent({
    name: "NibuButton",
    props: {
        type: {
            type: String,
            default: "button"
        },
        bg: {
            type: String,
            default: "pink"
        },
        loading: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },
    setup(__props, { attrs, emit }) {
        return (_ctx: any): VNode => {
            // 使用resolveDynamicComponent可幫我解析router-link
            return (openBlock(), createBlock(resolveDynamicComponent(_ctx.type), {
                ...attrs
            },
                {
                    default: withCtx(() => [
                        (
                            _ctx.$slots.default ? (openBlock(), createElementBlock(
                                "span",
                                {},
                                [
                                    renderSlot(_ctx.$slots, "default", {}, () => [createVNode("span", null, "預設按鈕")])
                                ]
                            ))
                            : createCommentVNode("v-if", true)
                        )]                                       
                    )
                }
            ))
        }
    }
})