<template>
    <div class="ml-5 mt-5 space-y-5">
        <div class="flex gap-5 flex-wrap">
            <Button as="a" href="/button-page" intent="primary">Primary</Button>
            <Button as="a" href="/button-page">Secondary</Button>
            <Button as="a" href="/button-page" intent="danger">Danger</Button>
            <Button as="a" href="/button-page" intent="text">PrimaTextry</Button>
        </div>
        <div class="flex gap-5 flex-wrap">
            <Button as="a" href="/button-page" loading intent="primary"
                :left-icon="EnvelopeIcon">Primary</Button>
            <Button as="a" href="/button-page" loading :left-icon="EnvelopeIcon">Secondary</Button>
            <Button as="a" href="/button-page" loading intent="danger"
                :left-icon="EnvelopeIcon">Danger</Button>
            <Button as="a" href="/button-page" loading intent="text"
                :left-icon="EnvelopeIcon">PrimaTextry</Button>
        </div>
        <div class="flex gap-5 flex-wrap">
            <Button as="a" href="/button-page" intent="primary" :left-icon="EnvelopeIcon">Primary</Button>
            <Button as="a" href="/button-page" :left-icon="EnvelopeIcon">Secondary</Button>
            <Button as="a" href="/button-page" intent="danger" :left-icon="EnvelopeIcon">Danger</Button>
            <Button as="a" href="/button-page" intent="text" :left-icon="EnvelopeIcon">PrimaTextry</Button>
        </div>
        <div class="flex gap-5 flex-wrap">
            <Button intent="primary" :right-icon="EnvelopeIcon">Primary</Button>
            <Button :right-icon="EnvelopeIcon">Secondary</Button>
            <Button intent="danger" :right-icon="EnvelopeIcon">Danger</Button>
            <Button intent="text" :right-icon="EnvelopeIcon">PrimaTextry</Button>
        </div>
        <div class="flex gap-5 flex-wrap">
            <Button as="a" href="/button-page" disabled intent="primary"
                :left-icon="EnvelopeIcon">Primary</Button>
            <Button as="a" href="/button-page" disabled :left-icon="EnvelopeIcon">Secondary</Button>
            <Button as="a" href="/button-page" disabled intent="danger"
                :left-icon="EnvelopeIcon">Danger</Button>
            <Button as="a" href="/button-page" disabled intent="text"
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
