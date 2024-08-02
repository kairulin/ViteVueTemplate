<template>
    <h1>預設</h1>
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
    </div>
    <div>
        <NibuButton loading loading-align="left">
            載入狀態
        </NibuButton>
        <NibuButton loading loading-align="right">
            載入狀態
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
    </div>
    <div>
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
        <NibuButton :loading="loading[8]" loading-align="left" @click="enterLoading(8)">
            <template #leftIcon>
                <EnvelopeIcon />
            </template>
            <template #rightIcon>
                <EnvelopeIcon />
            </template>
            點擊載入(左)
        </NibuButton>
        <NibuButton :loading="loading[9]" loading-align="right" @click="enterLoading(9)">
            <template #leftIcon>
                <EnvelopeIcon />
            </template>
            <template #rightIcon>
                <EnvelopeIcon />
            </template>
            點擊載入(右)
        </NibuButton>
    </div>
    <h1>純文字</h1>
    <div>
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
        <NibuButton text>
            <template #leftIcon>
                <EnvelopeIcon />
            </template>
            預設背景
        </NibuButton>
        <NibuButton text>
            <template #rightIcon>
                <EnvelopeIcon />
            </template>
            預設背景
        </NibuButton>
    </div>

    <div>
        <NibuButton loading text loading-align="left">
            載入狀態
        </NibuButton>
        <NibuButton loading text loading-align="right">
            載入狀態
        </NibuButton>
    </div>
    <div>
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
    <div>
        <NibuButton :loading="loading[6]" loading-align="right" @click="enterLoading(6)" text>
            點擊載入(右)
        </NibuButton>
        <NibuButton :loading="loading[7]" loading-align="right" @click="enterLoading(7)" text>
            <template #rightIcon>
                <EnvelopeIcon />
            </template>
            點擊載入(右)
        </NibuButton>
    </div>
    <div>
        <NibuButton :loading="loading[10]" loading-align="left" @click="enterLoading(10)" text>
            <template #leftIcon>
                <EnvelopeIcon />
            </template>
            <template #rightIcon>
                <EnvelopeIcon />
            </template>
            點擊載入(左)
        </NibuButton>
        <NibuButton :loading="loading[11]" loading-align="right" @click="enterLoading(11)" text>
            <template #leftIcon>
                <EnvelopeIcon />
            </template>
            <template #rightIcon>
                <EnvelopeIcon />
            </template>
            點擊載入(右)
        </NibuButton>
    </div>
    <h1>群組</h1>
    <div>
        <NibuButtonGroup large>
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
        </NibuButtonGroup>
    </div>
    <div>
        <NibuButtonGroup>
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
        </NibuButtonGroup>
    </div>
    <div>
        <NibuButtonGroup small>
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
        </NibuButtonGroup>
    </div>
    <div class="group">
        <div>
            <NibuButtonGroup large vertical>
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
            </NibuButtonGroup>
        </div>
        <div>
            <NibuButtonGroup vertical>
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
            </NibuButtonGroup>
        </div>
        <div>
            <NibuButtonGroup small vertical>
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
            </NibuButtonGroup>
        </div>
    </div>
    <NibuButton>
        <template #leftIcon>
            <EnvelopeIcon />
        </template>
        Primary
    </NibuButton>
    <NibuButton>
        <template #rightIcon>
            <EnvelopeIcon />
        </template>
        Primary
    </NibuButton>
</template>
<script setup lang="ts">
import NibuButton from '@/components/button';
import { NibuButtonGroup } from '@/components/button';
import { ref } from 'vue';
import { BaseLoading } from '@/components/icons/loading'
import { EnvelopeIcon } from '@heroicons/vue/20/solid';
const loading = ref([false, false, false, false, false, false, false, false, false, false, false, false])
const enterLoading = (idx: number) => {
    loading.value[idx] = true
    setTimeout(() => {
        loading.value[idx] = false
    }, 2000)
}

</script>
<style scoped>
.group {
    display: flex;
}
</style>