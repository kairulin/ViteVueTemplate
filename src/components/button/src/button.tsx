import {
    defineComponent,
    openBlock,
    createBlock,
    createElementBlock,
    toDisplayString,
    renderSlot,
    withCtx,
    resolveDynamicComponent,
    createCommentVNode,
    Fragment
} from "vue";
import type { VNode } from "vue";
import '../style/button.scss';
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
    setup(__props, { attrs, expose, emit }) {
        return (_ctx: any): VNode => {
            console.log(_ctx.loading)
            // 使用resolveDynamicComponent可幫我解析router-link
            return (openBlock(), createBlock(resolveDynamicComponent(_ctx.type), {
                ...attrs,
                class:[
                    _ctx.border ? 'border' : 'no-border',
                    _ctx.disabled ? 'disabled' : '',
                ],
                disabled : _ctx.disabled,
            },
                {
                    default: withCtx(() => [
                        
                            _ctx.loading ? 
                            (openBlock(), createElementBlock(
                                "div",
                                {},
                                [
                                    _ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading") :
                                    (openBlock(), createBlock("span", null, "loading..."))
                                    // {
                                    //     default: withCtx(() => [
                                    //         (openBlock(), createBlock(resolveDynamicComponent(_ctx.loadingIcon)))
                                    //     ])
                                    // }
                                ], 
                                64 /* STABLE_FRAGMENT */))
                            : createCommentVNode("v-if", true),
                            _ctx.$slots.default ? (openBlock(), createElementBlock(
                                Fragment,
                                {},
                                    [
                                        renderSlot(_ctx.$slots, "default", {}, () => [createBlock("span", null, "預設按鈕")])
                                    ]
                                , 64 /* STABLE_FRAGMENT */
                            ))
                            : createCommentVNode("v-if", true)
                        ]                                       
                    )
                }
            ))
        }
    }
})