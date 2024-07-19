<template>   
    <div v-for="color in Object.keys(colorsJson)" :key="color">
        <h1>{{ color }}</h1>
        <div v-for="i in numbers" :key="`srgb-${i}`" class="flex">
            <div :style="{ background: `color-mix(in srgb, ${color}, black ${i}%)`,color:`color-mix(in srgb, black, white ${i}%)`}">SRGB BLACK</div>
            <div :style="{background: color,color:`color-mix(in srgb, red, orange ${i}%)`}">{{color}} {{ i }}</div>
            <div :style="{ background: `color-mix(in srgb, ${color}, white ${i}%)`,color:`color-mix(in srgb, black, black ${i}%)`}">SRGB WHITE</div>
        </div>
        <div v-for="type in colorTypes" :key="type" class="flex">
            <div :style="{ background: `color-mix(in ${type}, ${color}, black)`,color:`color-mix(in ${type}, red, original` }">{{ type.toUpperCase() }} BLACK
            </div>
            <div :style="{background: color,color:`color-mix(in ${type}, red, orange` }">{{color}}</div>
            <div :style="{ background: `color-mix(in ${type}, ${color}, white)`,color:`color-mix(in ${type}, black, black` }">{{ type.toUpperCase() }} WHITE
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import colorsJson from '../utils/color/color.ts'
const colorTypes = [
    'lch',
    'lab',
    'hsl shorter hue',
    'hsl longer hue',
]
const numbers = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]
</script>
<style scoped lang="scss">
div {
    font: bold 150% monospace;
    width: 100%;
    color: black;
    flex: 1;
}
h1{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 200%;
}
.flex {
    display: flex;
    >div {
        height: 100px;
    }
}
</style>