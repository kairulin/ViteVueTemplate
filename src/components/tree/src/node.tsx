import {
    normalizeClass,
    defineComponent,
    openBlock,
    createElementBlock,
    createVNode,
    createCommentVNode,
    ref,
    computed
} from 'vue';
import TreeChildNode from './branch.tsx';
import type { PropType, VNode } from 'vue';

export default defineComponent({
    props: {
        node: {
            type: Object as PropType<TreeNodeData>,
            default: () => ({} as TreeNodeData)
        }
    },
    setup(__props, { attrs, expose, emit }) {
        const isOpen = ref(false);
        
        const handleToggle = (event: Event) => {
            isOpen.value = (event.target as HTMLDetailsElement).open;
        }
        const hasChildren = computed(() => Array.isArray(__props.node.children) && __props.node.children.length > 0)
        return (_ctx:any): VNode => {
            return openBlock(), createElementBlock("details", {
                ...attrs,
                class: normalizeClass(["nibu-tree__node", attrs.class]),
                open: isOpen.value,
                onToggle: handleToggle
            }, [
                createVNode("summary", {
                    class: normalizeClass([hasChildren.value ? "nibu-tree__node__name" : "nibu-tree__node__name--empty"])
                }, _ctx.node.name, 1 /* TEXT */),
                (hasChildren.value && isOpen.value) ?
                    (createVNode(TreeChildNode, {
                        nodes: _ctx.node.children
                    }, null, 8 /* PROPS */, ["nodes"]))
                    :
                    (createCommentVNode("v-if", true))
            ])
        }
    }
})