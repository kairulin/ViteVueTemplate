import {
    defineComponent,
    openBlock,
    createElementBlock,
    createVNode,
    Fragment,
    createCommentVNode,
    VNode,
    renderList,
    normalizeClass,
    shallowRef,
    watch
} from 'vue';
import TreeNode from './node';
import type { PropType } from 'vue';
import type { TreeNodeData } from '../type';
import { useCheckedChange } from './composables/useCheckedChange.ts';

export default defineComponent({
    props: {      
        node: {
            type: Object as PropType<TreeNodeData>,
            default: () => ({} as TreeNodeData)
        },
        indeterminate: {
            type: Boolean,
            default: false
        }
    },
    setup(__props,{emit}) {   
        const { checkIndeterminate } = useCheckedChange(__props.node)
        const indeterminate = shallowRef(false)
        // 收到節點的變化，檢查indeterminate
        const nodeIndeterminate = (value:boolean) => {
            indeterminate.value = checkIndeterminate(value)
            console.log('node', __props.node)
            // 告訴上層的node，現在的indeterminate狀態
            emit('indeterminate',indeterminate.value)
        }
        watch(() => __props.indeterminate, (newVal) => {
            console.log('子曾', __props.node)
            indeterminate.value = checkIndeterminate(newVal)
        })
        return (_ctx:any):VNode => {
            console.log('_ctx.indeterminate', _ctx.indeterminate)
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
                            indeterminate: indeterminate.value,
                            onIndeterminate: nodeIndeterminate
                        },null, 8 /* PROPS */, ["node","indeterminate","onIndeterminate"]))
                    ))
                    :
                     createCommentVNode("v-if", true)
                , 16 /* FULL_PROPS */)
            );
        };
    }
});