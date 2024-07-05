<template>
    <div ref="root" class="root" style="height: 400px; overflow: auto" @scroll="handleScroll">
        <div class="spacer" :style="spacerStyle">
            <div class="item" :style="{ height: `${rowHeight}px` }">
                <slot :data="visibleItems" :offsetY="offsetY"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import useVirtualScroll from '@/hooks/useVirtualScroll';
import type { Item } from '../type.d.ts'
const props = withDefaults(defineProps<{
    data: Item[]
}>(), {
    data: []
})


// Ref for the root element
const root: Ref<HTMLElement | null> = ref(null);
const items: Ref<Item[]> = ref(new Array(10000)
    .fill(null)
    .map((_, index) => ({ text: `Item ${index + 1}` }))
);
const { spacerStyle, handleScroll, visibleItems, rowHeight, offsetY } = useVirtualScroll(root, props.data);

</script>

<style scoped>
.spacer {
    position: relative;
}

.item {
    box-sizing: border-box;
    /* border-bottom: 1px solid #ccc; */
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