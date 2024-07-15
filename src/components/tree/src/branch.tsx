import {
    defineComponent,
    openBlock,
    createElementBlock,
    createVNode,
    Fragment,
    createCommentVNode,
    renderList,
    normalizeClass,
    shallowRef,
    watch
} from 'vue';
import TreeNode from './node';
import type { PropType, VNode } from 'vue';
import type { TreeNodeData } from '../type';
import { useCheckedChange } from './composables/useCheckedChange.ts';

export default defineComponent({
    props: {      
        node: {
            type: Object as PropType<TreeNodeData>,
            default: () => ({} as TreeNodeData)
        }
    },
    setup(__props,{emit}) {   
        // 收到節點的變化，檢查indeterminate
        const nodeIndeterminate = (value:boolean) => {
            // 告訴上層的node，現在的indeterminate狀態
            emit('indeterminate', value)
        }
        return (_ctx:any):VNode => {
            return (
                openBlock(),
                createElementBlock("div", {
                    class: normalizeClass(["nibu-tree__branch"])
                }, 
                    _ctx.node.children.length ? 
                    (renderList(_ctx.node.children, (node, index) => 
                        (createVNode(TreeNode, {
                            key: index, 
                            node,
                            onIndeterminate: nodeIndeterminate
                        },null, 8 /* PROPS */, ["node","onIndeterminate"]))
                    ))
                    :
                     createCommentVNode("v-if", true)
                , 16 /* FULL_PROPS */)
            );
        };
    }
});