<template>
{{data}}
    <NibuTree v-model="data"/>
    <!-- <div class="tree" v-for="node in data" :key="node.id">
        <details class="tree__node" v-if="node.children" @click.stop="handleToggle">
            <summary class="tree__node__marker">
                <input type="checkbox" v-model="node.checked" @change="changeAll(node)"
                    :indeterminate="node.indeterminate" />
                {{ node.name }}
            </summary>
            <div class="tree__node__children" v-if="isOpen">
                <CustomTree :data="node.children" @node-checked="nodeChecked(node)" />
            </div>
        </details>
        <details class="tree__node" v-else>
            <summary class="tree__node__none-marker">
                <input type="checkbox" v-model="node.checked" @change="changeNode(node)" />
                {{ node.name }}
            </summary>
        </details>
    </div> -->
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
// 遞迴生成數據
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
// 迴圈生成數據
// 迴圈方法
const generateDataIterative = (id: number, depth: number): Node => {
    const root: Node = { id, name: `Parent ${id}` };
    const stack: { node: Node; currentDepth: number }[] = [{ node: root, currentDepth: depth }];

    while (stack.length > 0) {
        const { node, currentDepth } = stack.pop()!;

        if (currentDepth > 0) {
            node.children = [];
            for (let i = 1; i <= 2; i++) { // 修改這裡以增加每個節點的子節點數量
                const childId = node.id * 10 + i;
                const childNode: Node = { id: childId, name: `Child ${childId}` };
                node.children.push(childNode);
                stack.push({ node: childNode, currentDepth: currentDepth - 1 });
            }
        }
    }

    return root;
};
// Generate data with depth of 100
// const localData: Node[] = [generateDataIterative(1, 8)];
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