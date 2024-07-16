import {
    normalizeClass,
    defineComponent,
    openBlock,
    createElementBlock,
    createVNode,
    unref,
    renderList
} from 'vue';
import TreeNode from './node';
import '../style/node.scss';
import type {PropType} from 'vue';
import type { TreeNodeData } from '../type';

export default defineComponent({
    name: 'NibuTree',
    props: {
        modelValue: {
            type: Array as PropType<TreeNodeData[]>,
            default: () => []
        },
        vertical: {
            type: Boolean as PropType<boolean>,
            default: false
        }
    },
    setup(props, { attrs, expose, emit }) {
        return (_ctx:any) => {
            return openBlock(), createElementBlock("div", {                
                class: normalizeClass(["nibu-tree", _ctx.vertical ? 'vertical' : '']),
            }, 
            renderList(_ctx.modelValue,(node, index) => 
                (createVNode(TreeNode, { 
                    // ...attrs,
                    key:index, 
                    node,
                    vertical:_ctx.vertical
                }, null, 8 /* PROPS */, ["node"]))
            )
            , 2 /* CLASS */)

            
        }
    }
})
