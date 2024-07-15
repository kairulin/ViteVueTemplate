import {
    normalizeClass,
    defineComponent,
    openBlock,
    createElementBlock,
    createVNode,
    createCommentVNode,
    toDisplayString,
    VNode,
    ref,
    createTextVNode,
    watch,
    onMounted,
    shallowRef,
    nextTick
} from 'vue';
import TreeBranch from './branch.tsx';
import type { PropType } from 'vue';
import type { TreeNodeData } from '../type';
import NibuCheckbox from '../../checkbox/index.tsx';
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
    setup(__props, { attrs, expose, emit }) {
        const isOpen = ref(false);

        const handleToggle = (event: Event) => {
            isOpen.value = (event.target as HTMLDetailsElement).open;
        }

        const { checkedAll, checkIndeterminate } = useCheckedChange(__props.node)
        const indeterminate = shallowRef(__props.indeterminate)
        const handleChange = (checked: boolean) => {
            checkedAll(checked)
            // 傳給上層的branch，通知檢查indeterminate
            emit('indeterminate')
        }
        // 下層的branch的indeterminate有變化的話，要通知上層的branch
        const branchIndeterminate = (value: boolean) => {
            indeterminate.value = checkIndeterminate(value)
            emit('indeterminate', indeterminate.value)
        }

        // 點擊的節點，其子節點的checked狀態
        watch(() => __props.node.checked, (newVal) => {
            checkedAll(newVal as boolean)
        })
        watch(() => __props.indeterminate, (newVal) => {
            // indeterminate.value = checkIndeterminate(newVal)
            //     console.log('newVal', newVal)
        //     if(!newVal) {
        //         indeterminate.value = newVal
        //     }
        })
        // 剛渲染時的節點狀態
        onMounted(() => {
            checkedAll(__props.node.checked as boolean)
        })
        return (_ctx: any): VNode => {
            console.log(_ctx.indeterminate)
            return openBlock(), createElementBlock("details", {
                ...attrs,
                class: normalizeClass(["nibu-tree__node", attrs.class]),
                open: isOpen.value,
                onToggle: handleToggle
            }, [
                createVNode("summary", {
                    class: normalizeClass([_ctx.node.children.length ? "nibu-tree__node__name" : "nibu-tree__node__name--empty"])
                },
                    [
                        createVNode(NibuCheckbox, {
                            modelValue: _ctx.node.checked,
                            "onUpdate:modelValue": handleChange,
                            indeterminate: indeterminate.value,
                        }, null, 16 /* PROPS */, ["modelValue", "onUpdate:modelValue", "indeterminate"]),
                        createTextVNode(toDisplayString(_ctx.node.name), 1 /* TEXT */)
                    ]
                    , 512 /* NEED_PATCH */),
                (_ctx.node.children.length && isOpen.value) ?
                    (createVNode(TreeBranch, {
                        node: _ctx.node,
                        indeterminate: _ctx.indeterminate,
                        onIndeterminate: branchIndeterminate
                    }, null, 16 /* PROPS */, ["node", "indeterminate", "onIndeterminate"]))
                    :
                    (createCommentVNode("v-if", true))
            ])
        }
    }
})