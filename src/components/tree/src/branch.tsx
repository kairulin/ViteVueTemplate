import {
    defineComponent,
    openBlock,
    createElementBlock,
    createVNode,
    Fragment,
    createCommentVNode,
    renderList
} from 'vue';
import TreeNode from './node';
import type { PropType, VNode } from 'vue';

export default defineComponent({
    props: {      
        nodes: {
            type: Array as PropType<TreeNodeData[]>,
            default: () => ([] as TreeNodeData[])
        }
    },
    setup(__props) {       
        return (_ctx:any):VNode => {
            return (
                openBlock(),
                createElementBlock(Fragment, null, 
                    _ctx.nodes.length ? 
                    (renderList(_ctx.nodes, (node, index) => 
                        (createVNode(TreeNode, {key: index, node},null, 8 /* PROPS */, ["node"]))
                    ))
                    :
                     createCommentVNode("v-if", true)
                , 512 /* NEED_PATCH */)
            );
        };
    }
});