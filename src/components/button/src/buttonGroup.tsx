import { computed, createBlock, defineComponent, openBlock, provide, renderSlot } from "vue";
import { buttonGroupdProps } from "./buttonGroupProps";
import '../style/buttonGroup.scss';
import useButtonSize from "./composables/useButtonSize";
export default defineComponent({
    name: "NibuButtonGroup",
    props: buttonGroupdProps(),
    setup(__props, { attrs, expose, emit }) {
        const size = computed(() => __props.large ? "large" : __props.small ? "small" : __props.middle ? "middle" : null);
        const { _size } = useButtonSize(size.value);
        provide("size", _size);
        return (_ctx: any) => {
            return openBlock(), createBlock("div",
                {
                    class: ["nibu-button-group", _ctx.vertical ? "nibu-button-group__vertical" : ""]
                },
                [
                    renderSlot(_ctx.$slots, "default")
                ],
                2 /* CLASS */  // 2 is CLASS
            )
        }
    }
})