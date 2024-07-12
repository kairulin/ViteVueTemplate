<template>
    <div class="table-wrapper">
        {{width}}
        {{ height }}
        <SlotVirtualScroll v-slot="{ data, offsetY }" :data="items">
            <table class="table">
                <thead class="table__thead" :style="{ position: 'sticky', top: `-${offsetY}px` }">
                    <tr>
                        <th>位置</th>
                        <th>標題</th>
                    </tr>
                </thead>
                <tbody class="table__body spacer">
                    <tr v-for="(item, index) in (data as ItemWithNumber[])" :key="index">
                        <td>{{ item.number }}</td>
                        <td>{{ item.text }}</td>
                    </tr>
                </tbody>
            </table>
        </SlotVirtualScroll>
    </div>
</template>
<script setup lang="ts">
import SlotVirtualScroll from './SlotVirtualScroll.vue';
import { ref } from 'vue';
import type { Ref } from 'vue';
import useWindowSize from '@/hooks/useWindowSize.ts';
const { width, height } = useWindowSize();
// Reactive variables
const items: Ref<ItemWithNumber[]> = ref(new Array(10000)
    .fill(null)
    .map((_, index) => ({ number: index, text: `Item ${index + 1}` }))
);
</script>
<style scoped lang="scss">
.table-wrapper {
    width: 500px;
    border: 1px solid #ccc;

}
.table {
    width: 100%;
    &__thead {
        background-color: var(--background);
        //     position: sticky; top: 0;
    }

    &__body {
        text-align: center;
    }
}
tr {
    display: flex;
    th,td {
        flex:1
    }
}
</style>