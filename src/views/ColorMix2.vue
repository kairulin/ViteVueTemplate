<template>
    <div ref="root" class="root" style="height: 700px; overflow: auto" @scroll="handleScroll">
        <div class="spacer" :style="spacerStyle">
            <div v-for="(item, index) in visibleItems" :key="index" class="item" :style="{ height: `${rowHeight}px` }">
                <div>
                    <div :style="{background: item.originalColor}">{{ item.originalColor }}</div>
                    <div :style="{background: item.mixColor}">{{ item.mixColor }}</div>
                    <div :style="{background: item.text}">{{ item.text }}</div>
                </div>
            </div>
        </div>
    </div>

</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import colorsJson from '../utils/color/color.ts'
import UseVirtualHook from '../components/UseVirtualHook.vue';
import useVirtualScroll from '@/hooks/useVirtualScroll';

const colorTypes = [
    'lch',
    'lab',
    'hsl shorter hue',
    'hsl longer hue',
]
const numbers = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]
const mixData = (type: string, color: string, mixColor: string, percentage?: number) => {
    return `color-mix(in ${type}, ${color}, ${mixColor} ${percentage ? `${percentage}%` : ''})`
}
const result = reactive({
    colors:[{text:123}]
})
const mixColorTypes = () => {
    Object.keys(colorsJson).forEach(originalColor => {
        Object.keys(colorsJson).forEach(mixColor => {
            colorTypes.forEach(type => {                
                result.colors.push({
                    text:mixData(type, originalColor, mixColor),
                    originalColor:originalColor,
                    mixColor:mixColor,
                    type: type
                })
            })
            numbers.forEach(number => {
                result.colors.push({
                    text:mixData('srgb', originalColor, mixColor, number),
                    originalColor:originalColor,
                    mixColor:mixColor,
                    type: 'in srgb'
                })
            })    
        })
    })
}
const root: Ref<HTMLElement | null> = ref(null);
console.log('result.colors', result.colors)
const { spacerStyle, handleScroll, visibleItems, rowHeight } = useVirtualScroll(root, result.colors)
onMounted(() => {
    mixColorTypes()
    result.colors.splice(0,1)
    
})
</script>
<style scoped lang="scss">
.spacer {
    position: relative;
}

.item {
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    line-height: 30px;
    padding-left: 10px;
    >div {
        display: flex;
        height: 29px;
        line-height: 30px;
        >div {
            flex:1;
        }
    }
}

</style>