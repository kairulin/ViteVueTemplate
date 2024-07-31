import {
    defineComponent,
    openBlock,
    createBlock,
    createElementBlock,
    renderSlot,
    withCtx,
    resolveDynamicComponent,
    createCommentVNode,
    Fragment,
    normalizeClass
} from "vue";
import type { VNode, PropType } from "vue";
import '../style/button.scss';
import useButtonStyle from "./composables/useButtonStyle";
import {buttonProps} from './buttonProps'
export default defineComponent({
    name: "NibuButton",
    props: buttonProps(),
    setup(__props, { attrs, expose, emit }) {
        return (_ctx: any): VNode => {
            const buttonStyle = useButtonStyle(__props);
        
            const onClick = (e: MouseEvent) => {
               
            }
            // 使用resolveDynamicComponent可幫解析router-link
            return (openBlock(), createBlock(resolveDynamicComponent(_ctx.type), {
                ...attrs,
                class: normalizeClass([
                    'nibu-button',
                    _ctx.border ? 'border' : 'no-border',
                ]),
                id: "nibu-button",
                disabled: _ctx.disabled,
                style:buttonStyle,
                onClick: onClick
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