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
    normalizeClass,
    Transition,
    createVNode,
    nextTick,
    inject,
    computed
} from "vue";
import type { VNode, PropType } from "vue";
import '../style/button.scss';
import useButtonStyle from "./composables/useButtonStyle";
import useButtonSize from "./composables/useButtonSize";
import { buttonProps } from './buttonProps'

const getCollapsedWidth = (el: HTMLElement) => {
    if (el) {
        el.style.width = '0px';
        el.style.opacity = '0';
        el.style.transform = 'scale(0)';
    }
};
const getRealWidth = (el: HTMLElement) => {
    nextTick(() => {
        if (el) {
            el.style.width = `${el.scrollWidth}px`;
            el.style.opacity = '1';
            el.style.transform = 'scale(1)';
        }
    });
};
const resetStyle = (el: HTMLElement) => {
    if (el && el.style) {
        el.style.width = '0px';
        el.style.opacity = '0';
        el.style.transform = 'scale(0)';
        setTimeout(() => {
            el.style.display = 'none';
        }, 200);
    }
};
const resetStyle2 = (el: HTMLElement) => {
    if (el && el.style) {
        el.style.width = '0px';
        el.style.opacity = '0';
        el.style.transform = 'scale(0)';
        el.style.display = 'none';
    }
}
export default defineComponent({
    name: "NibuButton",
    props: buttonProps(),
    setup(__props, { attrs, expose, emit }) {
        return (_ctx: any): VNode => {
            const buttonStyle = useButtonStyle(__props);
            const size = computed(() => __props.large ? "large" : __props.small ? "small" : __props.middle ? "middle" : null);
            const { _size } = useButtonSize(size.value);
            const onClick = (e: MouseEvent) => {

            }
            // 使用resolveDynamicComponent可幫解析router-link
            return (openBlock(), createBlock(resolveDynamicComponent(_ctx.type), {
                ...attrs,
                class: normalizeClass([
                    'nibu-button',
                    _ctx.border ? 'border' : 'no-border',
                    _size,
                ]),
                id: "nibu-button",
                disabled: _ctx.disabled,
                style: buttonStyle,
                onClick: onClick
            },
                {
                    default: withCtx(() => [
                        (
                            createVNode(Transition,
                                {
                                    name: "nibu-transition",
                                    "onBeforeEnter": (!_ctx.$slots.leftIcon && !_ctx.$slots.rightIcon) ? getCollapsedWidth : () => { },
                                    "onEnter": getRealWidth,
                                    "onBeforeLeave": (!_ctx.$slots.leftIcon && !_ctx.$slots.rightIcon) ? resetStyle : resetStyle2,
                                },
                                {
                                    default: () => [
                                        _ctx.loading ? createVNode("i",
                                            {
                                                style: { order: _ctx.loadingAlign === 'left' ? 0 : 1 },
                                                class: normalizeClass(['nibu-button__loading', _ctx.loadingSpin ? 'spin' : ''])
                                            },
                                            [
                                                (openBlock(), createBlock(resolveDynamicComponent(_ctx.loadingIcon), null))
                                            ]) : null
                                    ]
                                }
                            )
                        ),
                        // _ctx.loading ?
                        //     (openBlock(), createElementBlock(
                        //         "i",
                        //         {
                        //             style: { order: _ctx.loadingAlign === 'left' ? 0 : 1 },
                        //             class: normalizeClass(['nibu-button__loading', _ctx.loadingSpin ? 'spin' : ''])
                        //         },
                        //         [
                        //             _ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading") :
                        //                 (openBlock(), createBlock(resolveDynamicComponent(_ctx.loadingIcon), null))
                        //         ],
                        //         64 /* STABLE_FRAGMENT */))
                        //     : createCommentVNode("v-if", true),
                        (!_ctx.loading || _ctx.loadingAlign !== 'left') && _ctx.$slots.leftIcon ? renderSlot(_ctx.$slots, "leftIcon") : createCommentVNode("left-icon", true),
                        _ctx.$slots.default ? (openBlock(), createElementBlock(
                            Fragment,
                            {},
                            [
                                renderSlot(_ctx.$slots, "default", {}, () => [createBlock("span", null, "預設按鈕")])
                            ]
                            , 64 /* STABLE_FRAGMENT */
                        ))
                            : createCommentVNode("v-if", true),
                        (!_ctx.loading || _ctx.loadingAlign !== 'right') && _ctx.$slots.rightIcon ? renderSlot(_ctx.$slots, "rightIcon") : createCommentVNode("right-icon", true),
                    ]
                    )
                }
            ))
        }
    }
})