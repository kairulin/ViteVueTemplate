import {
    defineComponent,
    openBlock,
    createBlock,
    createCommentVNode,
    renderList,
    normalizeClass,
} from 'vue';
import TreeNode from './node';
import type { PropType, VNode } from 'vue';
import type { TreeNodeData } from '../type';

export default defineComponent({
    props: {      
        node: {
            type: Object as PropType<TreeNodeData>,
            default: () => ({} as TreeNodeData)
        },
        vertical: {
            type: Boolean as PropType<boolean>,
            default: false
        }
    },
    setup(__props,{attrs, emit}) {   
        // 收到節點的變化，檢查indeterminate
        const nodeIndeterminate = (value:boolean) => {
            // 告訴上層的node，現在的indeterminate狀態
            emit('indeterminate', value)
        }
        return (_ctx:any):VNode => {
            return (
                openBlock(),
                createBlock("div", {                    
                    class: normalizeClass([_ctx.vertical ? 'vertical' : ''])
                }, 
                    _ctx.node.children.length ? 
                    (renderList(_ctx.node.children, (node, index) => 
                        (createBlock(TreeNode, {
                            key: index, 
                            node,
                            onIndeterminate: nodeIndeterminate,
                            class: normalizeClass([_ctx.vertical ? 'nibu-tree__vertical' : 'nibu-tree__branch']),
                            vertical:_ctx.vertical
                        },null, 8 /* PROPS */, ["node","onIndeterminate"]))
                    ))
                    :
                     createCommentVNode("v-if", true)
                , 16 /* FULL_PROPS */)
            );
        };
    }
});