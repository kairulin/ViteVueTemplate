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
    Fragment,
    normalizeClass
} from "vue";
import type { VNode, PropType } from "vue";
import '../style/button.scss';
import { BaseLoading } from '../../icons/loading';
import useButtonStyle from "./composables/useButtonStyle";
/**
 * @description 按鈕元件
 * type: 按鈕類型
 * bg: 按鈕背景顏色
 * loading: 是否顯示loading
 * loadingAlign: loading位置
 * loadingSpin: loading是否旋轉
 * loadingIcon: loading圖示
 * border: 是否有邊框
 * disabled: 是否禁用
 * textColor: 文字顏色
 * text: 是否為純文字按鈕
 * round: 是否為圓角按鈕
 * circle: 是否為圓形按鈕
 * 
 */
export default defineComponent({
    name: "NibuButton",
    props: {
        type: {
            type: String,
            default: "button"
        },
        bg: {
            type: String,
            default: "#FFACBB"
        },
        loading: {
            type: Boolean,
            default: false
        },
        loadingAlign: {
            type: String as PropType<"left" | "right">,
            default: "left"
        },
        loadingSpin: {
            type: Boolean,
            default: true
        },
        loadingIcon: {
            type: Object,
            default: () => BaseLoading
        },
        border: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        textColor: {
            type: String,
            default: "#fff"
        },
        text: {
            type:Boolean,
            default: false
        },
        round: {
            type: Boolean,
            default: false
        },
        circle: {
            type: Boolean,
            default: false
        }
    },
    setup(__props, { attrs, expose, emit }) {
        return (_ctx: any): VNode => {
            const buttonStyle = useButtonStyle(__props);
        
            // 使用resolveDynamicComponent可幫解析router-link
            return (openBlock(), createBlock(resolveDynamicComponent(_ctx.type), {
                ...attrs,
                class: normalizeClass([
                    'nibu-button',
                    _ctx.border ? 'border' : 'no-border',
                ]),
                disabled: _ctx.disabled,
                style:buttonStyle
            },
                {
                    default: withCtx(() => [
                        _ctx.loading ?
                            (openBlock(), createElementBlock(
                                "i",
                                {
                                    style: { order: _ctx.loadingAlign === 'left' ? 0 : 1 },
                                    class: normalizeClass(['nibu-button__loading', _ctx.loadingSpin ? 'spin' : ''])
                                },
                                [
                                    _ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading") :
                                        (openBlock(), createBlock(resolveDynamicComponent(_ctx.loadingIcon), null))
                                ],
                                64 /* STABLE_FRAGMENT */))
                            : createCommentVNode("v-if", true),
                        (!_ctx.loading) && _ctx.$slots.leftIcon ? renderSlot(_ctx.$slots, "leftIcon") : createCommentVNode("left-icon", true),                        
                        _ctx.$slots.default ? (openBlock(), createElementBlock(
                            Fragment,
                            {},
                            [
                                renderSlot(_ctx.$slots, "default", {}, () => [createBlock("span", null, "預設按鈕")])
                            ]
                            , 64 /* STABLE_FRAGMENT */
                        ))
                            : createCommentVNode("v-if", true),
                        (!_ctx.loading) && _ctx.$slots.rightIcon ? renderSlot(_ctx.$slots, "rightIcon") : createCommentVNode("right-icon", true),                        

                    ]
                    )
                }
            ))
        }
    }
})