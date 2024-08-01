import {
    normalizeClass,
    defineComponent,
    openBlock,
    createBlock,
    createCommentVNode,
    toDisplayString,
    ref,
    createTextVNode,
    watch,
    onMounted,
    shallowRef,
} from 'vue';
import TreeBranch from './branch.tsx';
import type { PropType, VNode } from 'vue';
import type { TreeNodeData } from '../type';
import NibuCheckbox from '../../checkbox/index.tsx';
import { useCheckedChange } from './composables/useCheckedChange.ts';
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
    setup(__props, { attrs, expose, emit }) {
        const isOpen = ref(false);
        const handleToggle = (event: Event) => {
            isOpen.value = (event.target as HTMLDetailsElement).open;
        }

        const { checkedAll, checkIndeterminate } = useCheckedChange(__props.node)
        const indeterminate = shallowRef(false)
        const handleChange = (checked: boolean) => {
            indeterminate.value = checkedAll(checked)
            // 傳給上層的branch，通知檢查indeterminate
            emit('indeterminate', checked)
        }
        // 下層的branch的indeterminate有變化的話，要通知上層的branch
        const branchIndeterminate = (value: boolean) => {
            indeterminate.value = checkIndeterminate(value)
            emit('indeterminate', indeterminate.value)
        }

        // 點擊的節點，其子節點的checked狀態
        watch(() => __props.node.checked, (newVal) => {
            checkedAll(newVal as boolean)
            // 如果是打勾，就把底下indeterminate是true的變回false，如果是取消打勾則不做動作
            if(newVal) indeterminate.value = false
        })      
        // 剛渲染時的節點狀態
        onMounted(() => {
            checkedAll(__props.node.checked as boolean)
        })
        return (_ctx: any,_cache:any): VNode => {
            return openBlock(), createBlock("details", {
                class: normalizeClass(["nibu-tree__node"]),
                open: _cache[0] || (_cache[0] = isOpen.value),
                onToggle: handleToggle,                
            }, [
                (openBlock(), createBlock("summary", {
                    class: normalizeClass([_ctx.node.children.length ? "nibu-tree__node__name" : "nibu-tree__node__name--empty"])
                },
                    [
                        (openBlock(), createBlock(NibuCheckbox, {
                            modelValue: _ctx.node.checked,
                            "onUpdate:modelValue": handleChange,
                            indeterminate: indeterminate.value,
                        }, null, 16 /* PROPS */, ["modelValue", "onUpdate:modelValue", "indeterminate"])),
                        createTextVNode(toDisplayString(_ctx.node.name), 1 /* TEXT */)
                    ]
                    , 512 /* NEED_PATCH */)),
                (_ctx.node.children.length && isOpen.value || _cache[0]) ?
                    (openBlock(), createBlock(TreeBranch, {
                        ...attrs,
                        node: _ctx.node,                       
                        onIndeterminate: branchIndeterminate,
                        vertical:_ctx.vertical
                    }, null, 16 /* PROPS */, ["node", "indeterminate", "onIndeterminate"]))
                    :
                    (createCommentVNode("v-if", true))
            ])
        }
    }
})