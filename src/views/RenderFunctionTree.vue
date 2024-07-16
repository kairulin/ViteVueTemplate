<template>
        <NibuTree v-model="data"/>

</template>
<script setup lang="ts">
import NibuTree from '@/components/tree/index.tsx'
import type { Ref } from 'vue';
import { ref } from 'vue';
interface Node {
    id: number;
    name: string;
    children?: Node[];
    checked?: boolean;
    indeterminate?: boolean;
}
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
const localData: Node[] = [generateData(1, 15)];
const data: Ref<Node[]> = ref(localData)

</script>