<template>
    <div class="ml-5 mt-5 space-y-5">
        <div class="flex gap-5 flex-wrap">
            <Button as="a" href="http://localhost:5174/" intent="primary">Primary</Button>
            <Button as="a" href="http://localhost:5174/">Secondary</Button>
            <Button as="a" href="http://localhost:5174/" intent="danger">Danger</Button>
            <Button as="a" href="http://localhost:5174/" intent="text">PrimaTextry</Button>
        </div>
        <div class="flex gap-5 flex-wrap">
            <Button as="a" href="http://localhost:5174/" loading intent="primary"
                :left-icon="EnvelopeIcon">Primary</Button>
            <Button as="a" href="http://localhost:5174/" loading :left-icon="EnvelopeIcon">Secondary</Button>
            <Button as="a" href="http://localhost:5174/" loading intent="danger"
                :left-icon="EnvelopeIcon">Danger</Button>
            <Button as="a" href="http://localhost:5174/" loading intent="text"
                :left-icon="EnvelopeIcon">PrimaTextry</Button>
        </div>
        <div class="flex gap-5 flex-wrap">
            <Button as="a" href="http://localhost:5174/" intent="primary" :left-icon="EnvelopeIcon">Primary</Button>
            <Button as="a" href="http://localhost:5174/" :left-icon="EnvelopeIcon">Secondary</Button>
            <Button as="a" href="http://localhost:5174/" intent="danger" :left-icon="EnvelopeIcon">Danger</Button>
            <Button as="a" href="http://localhost:5174/" intent="text" :left-icon="EnvelopeIcon">PrimaTextry</Button>
        </div>
        <div class="flex gap-5 flex-wrap">
            <Button as="a" href="http://localhost:5174/" intent="primary" :right-icon="EnvelopeIcon">Primary</Button>
            <Button as="a" href="http://localhost:5174/" :right-icon="EnvelopeIcon">Secondary</Button>
            <Button as="a" href="http://localhost:5174/" intent="danger" :right-icon="EnvelopeIcon">Danger</Button>
            <Button as="a" href="http://localhost:5174/" intent="text" :right-icon="EnvelopeIcon">PrimaTextry</Button>
        </div>
        <div class="flex gap-5 flex-wrap">
            <Button as="a" href="http://localhost:5174/" disabled intent="primary"
                :left-icon="EnvelopeIcon">Primary</Button>
            <Button as="a" href="http://localhost:5174/" disabled :left-icon="EnvelopeIcon">Secondary</Button>
            <Button as="a" href="http://localhost:5174/" disabled intent="danger"
                :left-icon="EnvelopeIcon">Danger</Button>
            <Button as="a" href="http://localhost:5174/" disabled intent="text"
                :left-icon="EnvelopeIcon">PrimaTextry</Button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { EnvelopeIcon } from '@heroicons/vue/20/solid';
import Button from '@/components/Button.vue'
</script>
