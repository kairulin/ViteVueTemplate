<template>
    <div class="tree" v-for="node in data" :key="node.id">
        <details class="tree__node" v-if="node.children && node.children.length" @click.stop="handleToggle">
            <summary class="tree__node__marker">
                <input type="checkbox" v-model="node.checked" @change.stop="changeAll(node)"
                    :indeterminate="node.indeterminate" />
                {{ node.name }}
            </summary>
            <div class="tree__node__children" >
                <CustomTree :data="node.children" @node-checked="nodeChecked(node)" />
            </div>
        </details>
        <details class="tree__node" v-else>
            <summary class="tree__node__none-marker">
                <input type="checkbox" v-model="node.checked" @change.stop="changeNode(node)" />
                {{ node.name }}
            </summary>
        </details>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CustomTree from './CustomTree.vue';
import NibuTree from './tree/index.tsx'
import type { Ref } from 'vue';
interface Node {
    id: number;
    name: string;
    children?: Node[];
    checked?: boolean;
    indeterminate?: boolean;
}
const props = withDefaults(defineProps<{
    data: Node[]
}>(), {
    data: () => []
})
const emit = defineEmits(['nodeChecked'])
// const localData: Node[] = [generateData(1, 15)];
const data: Ref<Node[]> = ref(props.data.length > 0 ? props.data : [])

// 勾選所有子節點
const changeAll = (node: Node) => {
    if (node.children) {
        node.children.forEach(child => {
            child.checked = node.checked;
            changeAll(child);
        })
    }
    emit('nodeChecked', node.checked)
}
// 沒有children的節點，勾選時觸發
const changeNode = (node: Node) => {
    emit('nodeChecked', node.checked)
}
// 檢查子節點是否都有勾選
const nodeChecked = (node: Node) => {
    const checkedLen = node.children?.filter(child => child.checked || child.indeterminate).length ?? 0;
    // 如果子節點都有勾選，則父節點也要勾選
    if (checkedLen === node.children?.length) {
        node.checked = true;
        node.indeterminate = false;
    } else if (checkedLen > 0) {
        node.checked = false;
        node.indeterminate = true;
    } else {
        node.checked = false;
        node.indeterminate = false;
    }
    emit('nodeChecked', node.checked)
}
const isOpen = ref(false)
const handleToggle = (event: Event) => {
    isOpen.value = !isOpen.value
}
onMounted(() => {
    data.value.forEach(node => {
        node.checked = false;
        node.indeterminate = false;
    })
})
</script>
<style scoped lang="scss">
details {
    user-select: none;
    width: max-content
}

.tree {
    .tree__node {
        display: flex;
        flex-direction: column;

        .tree__node__children {
            padding-left: 20px;
        }

        .tree__node__marker {
            cursor: pointer;
            // list-style: none;
            // padding: 5px;
            // background-color: #f0f0f0;
            // border: 1px solid #ccc;
            // border-radius: 5px;
            // margin: 5px 0;
        }

        .tree__node__none-marker::marker {
            color: transparent
        }

    }
}
</style>