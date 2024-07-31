<template>
    <div>
        <NibuButton>
            預設背景
        </NibuButton>
        <NibuButton bg="red">
            紅色背景
        </NibuButton>
        <NibuButton bg="blue">
            藍色背景
        </NibuButton>
        <NibuButton bg="green">
            綠色背景
        </NibuButton>
        <NibuButton text>
            預設背景
        </NibuButton>
        <NibuButton bg="red" text>
            紅色背景
        </NibuButton>
        <NibuButton bg="blue" text>
            藍色背景
        </NibuButton>
        <NibuButton bg="green" text>
            綠色背景
        </NibuButton>
    </div>
    <div>
        <NibuButton>
            <template #leftIcon>
                <EnvelopeIcon />
            </template>
            預設背景
        </NibuButton>
        <NibuButton>
            <template #rightIcon>
                <EnvelopeIcon />
            </template>
            預設背景
        </NibuButton>
        <NibuButton text>
            <template #leftIcon>
                <EnvelopeIcon />
            </template>
            純文字
        </NibuButton>
        <NibuButton text>
            <template #rightIcon>
                <EnvelopeIcon />
            </template>
            純文字
        </NibuButton>
    </div>
    <div>
        <NibuButton loading loading-align="left">
            載入狀態
        </NibuButton>
        <NibuButton loading loading-align="right">
            載入狀態
        </NibuButton>
        <NibuButton loading text loading-align="left">
            純文字
        </NibuButton>
        <NibuButton loading text loading-align="right">
            純文字
        </NibuButton>
    </div>
    <div>
        <NibuButton :loading="loading[0]" loading-align="left" @click="enterLoading(0)">
            點擊載入(左)
        </NibuButton>
        <NibuButton :loading="loading[1]" loading-align="left" @click="enterLoading(1)">
            <template #leftIcon>
                <EnvelopeIcon />
            </template>
            點擊載入(左)
        </NibuButton>
        <NibuButton :loading="loading[2]" loading-align="right" @click="enterLoading(2)">
            點擊載入(右)
        </NibuButton>
        <NibuButton :loading="loading[3]" loading-align="right" @click="enterLoading(3)">
            <template #rightIcon>
                <EnvelopeIcon />
            </template>
            點擊載入(右)
        </NibuButton>
    </div>
    <div>
        <NibuButton disabled>
            禁用狀態
        </NibuButton>
        <NibuButton disabled>
            <template #leftIcon>
                <EnvelopeIcon />
            </template>
            禁用狀態
        </NibuButton>
        <NibuButton disabled>
            <template #rightIcon>
                <EnvelopeIcon />
            </template>
            禁用狀態
        </NibuButton>
        <NibuButton disabled text>
            禁用狀態
        </NibuButton>
        <NibuButton disabled text>
            <template #leftIcon>
                <EnvelopeIcon />
            </template>
            禁用狀態
        </NibuButton>
        <NibuButton disabled text>
            <template #rightIcon>
                <EnvelopeIcon />
            </template>
            禁用狀態
        </NibuButton>
    </div>
</template>
<script setup lang="ts">
import NibuButton from '@/components/button';
import { ref } from 'vue';
import { BaseLoading } from '@/components/icons/loading'
import { EnvelopeIcon } from '@heroicons/vue/20/solid';
const loading = ref([false, false, false, false])
const enterLoading = (idx: number) => {
    loading.value[idx] = true
    setTimeout(() => {
        loading.value[idx] = false
    }, 2000)
}

</script>
<style scoped>
.test {
    /* --tw-text-opacity: 1; */
    color: var(--nibu-button-text-color);
    background-color: red;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding-top: 0.125rem;
    padding-bottom: 0.125rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border-width: 1px;
    border-radius: var(--nibu-button-border-radius);
    justify-content: center;
    align-items: center;
    min-height: 2rem;
    display: inline-flex;
    background-color: var(--nibu-button-color);
    position: relative;
    gap: 0.125rem;
    box-sizing: border-box;
    vertical-align: middle;
    /* width: var(--nibu-button-width);
    height: var(--nibu-button-height); */
}
</style>