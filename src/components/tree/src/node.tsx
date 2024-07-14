import {
    normalizeClass,
    defineComponent,
    openBlock,
    createElementBlock,
    createVNode,
    createCommentVNode,
    ref,
    computed,
    createTextVNode,
    toDisplayString,
    createElementVNode,
    unref,
    isRef
} from 'vue';
import TreeChildNode from './branch.tsx';
import type { PropType, VNode } from 'vue';
import { useCheckedChange } from './composables/useCheckedChange.ts'
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

        const { checkedAll } = useCheckedChange(__props.node)

        const hasChildren = computed(() => Array.isArray(__props.node.children) && __props.node.children.length > 0)
        const test = () => {
            console.log('123', check.value)
        }
        const check = ref(false)
        return (_ctx:any,_cache:any): VNode => {
            console.log(_cache)
            return openBlock(), createElementBlock("details", {
                ...attrs,
                class: normalizeClass(["nibu-tree__node", attrs.class]),
                open: isOpen.value,
                onToggle: handleToggle
            }, [
                createVNode("summary", {
                    class: normalizeClass([hasChildren.value ? "nibu-tree__node__name" : "nibu-tree__node__name--empty"])
                },
                [   
                    createVNode("input",{
                        type: "checkbox",
                        modelValue: check,
                        "onUpdate:modelValue": _cache[0]  || (_cache[0] =($event:HTMLInputElement) =>  console.log($event)),
                        onChange: unref(test)
                    }, null, 8 /*PROPS*/,["modelValue", "onUpdate:modelValue", "onChange"]),
                    createTextVNode(toDisplayString(_ctx.node.name), 1 /* TEXT */)
                ]
                //  _ctx.node.name
                , 512 /* NEED PATCH */),
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