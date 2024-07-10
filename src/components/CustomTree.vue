<template>
    <div class="tree" v-for="node in data" :key="node.id">
        <details class="tree__node" v-if="node.children">
            <summary class="tree__node__marker">
                <input type="checkbox" v-model="node.checked" @change="changeAll(node)"
                    :indeterminate="node.indeterminate" />
                {{ node.name }}
            </summary>
            <div class="tree__node__children">
                <CustomTree :data="node.children" @node-checked="nodeChecked(node)" />
            </div>
        </details>
        <details class="tree__node" v-else>
            <summary class="tree__node__none-marker">
                <input type="checkbox" v-model="node.checked" @change="changeNode(node)" />
                {{ node.name }}
            </summary>
        </details>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CustomTree from './CustomTree.vue';
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
const generateData = (id: number, depth: number): Node => {
    if (depth <= 0) {
        return { id, name: `Child ${id}` };
    } else {
        return {
            id,
            name: `Parent ${id}`,
            children: [
                generateData(id * 10 + 1, depth - 1),
                generateData(id * 10 + 2, depth - 1),
                // generateData(id * 10 + 3, depth - 1),
                // generateData(id * 10 + 4, depth - 1),
                // generateData(id * 10 + 5, depth - 1)
                // Add more as needed to increase the number of children per node
            ]
        };
    }
};
// Generate data with depth of 100
const localData: Node[] = [generateData(1, 3)];
// const localData: Node[] = [
//     {
//         id: 1,
//         name: 'Parent 1',
//         children: [
//             {
//                 id: 2,
//                 name: 'Child 1',
//                 children: [
//                     {
//                         id: 7,
//                         name: 'Child 5'
//                     }
//                 ]
//             },
//             {
//                 id: 3,
//                 name: 'Child 2'
//             }
//         ]
//     },
//     {
//         id: 4,
//         name: 'Parent 2',
//         children: [
//             {
//                 id: 5,
//                 name: 'Child 3'
//             },
//             {
//                 id: 6,
//                 name: 'Child 4'
//             }
//         ]
//     }
// ]
const data: Ref<Node[]> = ref(props.data.length > 0 ? props.data : localData)

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