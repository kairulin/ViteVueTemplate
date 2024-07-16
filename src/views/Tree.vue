<template>
    <CustomTree :data="localData"/>
</template>
<script setup lang="ts">
interface Node {
    id: number;
    name: string;
    children?: Node[];
    checked?: boolean;
    indeterminate?: boolean;
}
import CustomTree from '@/components/CustomTree.vue'
// 遞迴生成數據
const generateData = (id: number, depth: number): Node => {
    if (depth <= 0) {
        return { id, name: `Child ${id}`,children:[] };
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
const localData: Node[] = [generateData(1, 5)];

</script>