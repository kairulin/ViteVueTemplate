<template>
    <div class="ml-5 mt-5 space-y-5">
        <div class="flex gap-5 flex-wrap">
            <Button intent="primary">Primary</Button>
            <Button>Secondary</Button>
            <Button intent="danger">Danger</Button>
            <Button intent="text">PrimaTextry</Button>
        </div>
        <div class="flex gap-5 flex-wrap">
            <Button loading intent="primary"
                :left-icon="EnvelopeIcon">Primary</Button>
            <Button loading :left-icon="EnvelopeIcon">Secondary</Button>
            <Button loading intent="danger"
                :left-icon="EnvelopeIcon">Danger</Button>
            <Button loading intent="text"
                :left-icon="EnvelopeIcon">PrimaTextry</Button>
        </div>
        <div class="flex gap-5 flex-wrap">
            <Button intent="primary" :left-icon="EnvelopeIcon">Primary</Button>
            <Button :left-icon="EnvelopeIcon">Secondary</Button>
            <Button intent="danger" :left-icon="EnvelopeIcon">Danger</Button>
            <Button intent="text" :left-icon="EnvelopeIcon">PrimaTextry</Button>
        </div>
        <div class="flex gap-5 flex-wrap">
            <Button intent="primary" :right-icon="EnvelopeIcon">Primary</Button>
            <Button :right-icon="EnvelopeIcon">Secondary</Button>
            <Button intent="danger" :right-icon="EnvelopeIcon">Danger</Button>
            <Button intent="text" :right-icon="EnvelopeIcon">PrimaTextry</Button>
        </div>
        <div class="flex gap-5 flex-wrap">
            <Button disabled intent="primary"
                :left-icon="EnvelopeIcon">Primary</Button>
            <Button disabled :left-icon="EnvelopeIcon">Secondary</Button>
            <Button disabled intent="danger"
                :left-icon="EnvelopeIcon">Danger</Button>
            <Button disabled intent="text"
                :left-icon="EnvelopeIcon">PrimaTextry</Button>
        </div>
        <!-- <div class="flex gap-5 flex-wrap">
            <Button as="router-link" intent="primary"
                :left-icon="EnvelopeIcon">Router Link</Button>            
        </div> -->
    </div>
</template>
<script setup lang="ts">
import { EnvelopeIcon } from '@heroicons/vue/20/solid';
import Button from '@/components/Button.vue'
</script>
