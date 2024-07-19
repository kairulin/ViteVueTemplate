<template>
    <div ref="root" class="root" style="height: 400px; overflow: auto" @scroll="handleScroll">
        <div class="spacer" :style="spacerStyle">
            <div v-for="(item, index) in visibleItems" :key="index" class="item" :style="{ height: `${rowHeight}px` }">
                {{ item.text }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import useVirtualScroll from '@/hooks/useVirtualScroll';
interface Item {
    text: string;
}

const props = withDefaults(defineProps<{
    data: Item[]
}>(),{
    data: () => []
})
console.log(props.data)
const items: Ref<Item[]> = ref(props.data);
// Reactive variables
// const items: Ref<Item[]> = ref(new Array(100000)
//     .fill(null)
//     .map((_, index) => ({ text: `Item ${index + 1}` }))
// )

// Ref for the root element
const root: Ref<HTMLElement | null> = ref(null);

const { spacerStyle, handleScroll, visibleItems, rowHeight } = useVirtualScroll(root, props.data)
console.log('visibleItems', visibleItems)
</script>

<style scoped>
.spacer {
    position: relative;
}

.item {
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    line-height: 30px;
    padding-left: 10px;
}

/* width */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>