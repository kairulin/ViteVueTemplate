<template>
    <NibuButton class="inline-flex items-center justify-center text-sm rounded min-h-[32px] px-3 py-0.5 font-semibold bg-red-600 text-white hover:bg-red-500">
        slot button
    </NibuButton>
</template>
<script setup lang="ts">
import NibuButton from '@/components/button';
import { ref } from 'vue';

</script>