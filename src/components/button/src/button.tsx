import { defineComponent,openBlock,createElementBlock, toDisplayString } from "vue";
import type { VNode } from "vue";
export default defineComponent({
    name: "NibuButton",
    setup(__props, {attrs,emit}) {
        return (_ctx:any):VNode => {
            return openBlock(), createElementBlock("button", {
                ...attrs
            },'123', 512 )
        }
    }
})