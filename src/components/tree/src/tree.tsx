import {
    normalizeClass,
    defineComponent,
    openBlock,
    createElementBlock,
    createVNode,
    renderList
} from 'vue';
import TreeNode from './node.tsx';
import '../style/node.scss';
import type {PropType} from 'vue';

export default defineComponent({
    name: 'NibuTree',
    props: {
        modelValue: {
            type: Array as PropType<TreeNodeData[]>,
            default: () => []
        }
    },
    setup(__props, { attrs, expose, emit }) {
        return (_ctx:any) => {
            return openBlock(), createElementBlock("div", {
                ...attrs,
                class: normalizeClass(["nibu-tree", attrs.class]),
            }, 
            renderList(_ctx.modelValue,(node, index) => 
                (createVNode(TreeNode, { key:index, node}, null, 8 /* PROPS */, ["node"]))
            )
            , 2 /* CLASS */)

            
        }
    }
})
