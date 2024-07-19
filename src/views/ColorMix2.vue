<template>
    123
    <UseVirtualHook :data="result.colors" />
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import colorsJson from '../utils/color/color.ts'
import UseVirtualHook from '../components/UseVirtualHook.vue';
const colorTypes = [
    'lch',
    'lab',
    'hsl shorter hue',
    'hsl longer hue',
]
const numbers = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]
const mixData = (type: string, color: string, mixColor: string) => {
    return `color-mix(in ${type}, ${color}, ${mixColor})`
}
const result = reactive({
    colors:[]
})
const mixColorTypes = () => {
    Object.keys(colorsJson).forEach(originalColor => {
        Object.keys(colorsJson).forEach(mixColor => {
            colorTypes.forEach(type => {                
                result.colors.push({text:mixData(type, originalColor, mixColor)})
            })        
        })
    })
}
onMounted(() => {
    mixColorTypes()
})
</script>